const express = require('express')
const router = express.Router()

const verifyToken = require('../../middleware/auth.middleware')
const adminOnly = require('../../middleware/admin.middleware')

const {
  createTestHandler,
  attachQuestionsHandler,
  getAllTestsHandler,
  startTestHandler,
  submitTestHandler
} = require('./tests.controller')

// Admin routes
router.post('/', verifyToken, adminOnly, createTestHandler)
router.post('/attach', verifyToken, adminOnly, attachQuestionsHandler)

// Student routes
router.get('/', verifyToken, getAllTestsHandler)
router.post('/start', verifyToken, startTestHandler)
router.post('/submit', verifyToken, submitTestHandler)

module.exports = router