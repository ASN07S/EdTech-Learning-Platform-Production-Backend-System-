const { createQuestion } = require('./questions.service')

const addQuestion = async (req, res) => {
  try {
    const question = await createQuestion(req.body)

    res.status(201).json({
      message: 'Question added successfully',
      question
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { addQuestion }