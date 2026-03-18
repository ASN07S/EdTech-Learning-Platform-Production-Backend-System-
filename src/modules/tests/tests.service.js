const pool = require('../../config/database')

const createTest = async (data) => {
  const { title, duration_minutes, total_marks, negative_marking } = data

  const result = await pool.query(
    `INSERT INTO tests 
     (title, duration_minutes, total_marks, negative_marking)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [title, duration_minutes, total_marks, negative_marking]
  )

  return result.rows[0]
}

const addQuestionsToTest = async (test_id, question_ids) => {
  for (let question_id of question_ids) {
    await pool.query(
      `INSERT INTO test_questions (test_id, question_id)
       VALUES ($1,$2)`,
      [test_id, question_id]
    )
  }

  return { message: 'Questions attached successfully' }
}

const getAllTests = async () => {
  const result = await pool.query(
    `SELECT id, title, duration_minutes, total_marks 
     FROM tests`
  )
  return result.rows
}

const startTest = async (user_id, test_id) => {

  const attempt = await pool.query(
    `INSERT INTO test_attempts (user_id, test_id)
     VALUES ($1,$2)
     RETURNING *`,
    [user_id, test_id]
  )

  const questions = await pool.query(
    `SELECT q.id, q.question_text,
            q.option_a, q.option_b,
            q.option_c, q.option_d
     FROM questions q
     JOIN test_questions tq
       ON q.id = tq.question_id
     WHERE tq.test_id = $1`,
    [test_id]
  )

  return {
    attempt: attempt.rows[0],
    questions: questions.rows
  }
}

const submitTest = async (attempt_id, answers) => {

  const attemptResult = await pool.query(
    `SELECT * FROM test_attempts WHERE id = $1`,
    [attempt_id]
  )

  if (attemptResult.rows.length === 0) {
    throw new Error('Invalid attempt ID')
  }

  const attempt = attemptResult.rows[0]

  if (attempt.status === 'submitted') {
    throw new Error('Test already submitted')
  }

  const testResult = await pool.query(
    `SELECT negative_marking FROM tests WHERE id = $1`,
    [attempt.test_id]
  )

  const negative_marking = testResult.rows[0].negative_marking

  let score = 0
  let correct = 0
  let wrong = 0
  let attempted = 0

  for (let answer of answers) {
    const { question_id, selected_option } = answer

    const questionResult = await pool.query(
      `SELECT correct_option FROM questions WHERE id = $1`,
      [question_id]
    )

    const correct_option = questionResult.rows[0].correct_option

    let is_correct = false

    if (selected_option) {
      attempted++
    }

    if (selected_option === correct_option) {
      score += 1
      correct++
      is_correct = true
    } else if (selected_option) {
      score -= negative_marking
      wrong++
    }

    await pool.query(
      `INSERT INTO user_answers 
       (attempt_id, question_id, selected_option, is_correct)
       VALUES ($1,$2,$3,$4)`,
      [attempt_id, question_id, selected_option, is_correct]
    )
  }

  const total_questions = answers.length
  const accuracy = attempted > 0
    ? ((correct / attempted) * 100).toFixed(2)
    : 0

  await pool.query(
    `UPDATE test_attempts
     SET score = $1,
         status = 'submitted',
         end_time = NOW()
     WHERE id = $2`,
    [score, attempt_id]
  )

  return {
    total_questions,
    attempted,
    correct,
    wrong,
    score,
    accuracy
  }
}

module.exports = {
  createTest,
  addQuestionsToTest,
  getAllTests,
  startTest,
  submitTest
}