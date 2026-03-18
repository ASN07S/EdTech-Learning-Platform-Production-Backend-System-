const express = require('express')
const router = express.Router()

const verifyToken = require('../../middleware/auth.middleware')
const adminOnly = require('../../middleware/admin.middleware')

const { addQuestion } = require('./questions.controller')

router.post('/', verifyToken, adminOnly, addQuestion)

module.exports = router