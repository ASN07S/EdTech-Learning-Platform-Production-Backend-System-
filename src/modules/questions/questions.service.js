const pool = require('../../config/database')

const createQuestion = async (data) => {
  const {
    subject,
    topic,
    difficulty,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    explanation
  } = data

  const result = await pool.query(
    `INSERT INTO questions
     (subject, topic, difficulty, question_text,
      option_a, option_b, option_c, option_d,
      correct_option, explanation)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      subject,
      topic,
      difficulty,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      explanation
    ]
  )

  return result.rows[0]
}

module.exports = { createQuestion }