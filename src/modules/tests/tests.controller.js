const {
  createTest,
  addQuestionsToTest,
  getAllTests,
  startTest,
  submitTest
} = require('./tests.service')

const createTestHandler = async (req, res) => {
  try {
    const test = await createTest(req.body)
    res.status(201).json({ message: 'Test created successfully', test })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const attachQuestionsHandler = async (req, res) => {
  try {
    const { test_id, question_ids } = req.body
    const result = await addQuestionsToTest(test_id, question_ids)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAllTestsHandler = async (req, res) => {
  try {
    const tests = await getAllTests()
    res.json(tests)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const startTestHandler = async (req, res) => {
  try {
    const { test_id } = req.body
    const user_id = req.user.id

    const data = await startTest(user_id, test_id)
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const submitTestHandler = async (req, res) => {
  try {
    const { attempt_id, answers } = req.body
    const result = await submitTest(attempt_id, answers)

    res.json({
      message: 'Test submitted successfully',
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  createTestHandler,
  attachQuestionsHandler,
  getAllTestsHandler,
  startTestHandler,
  submitTestHandler
}