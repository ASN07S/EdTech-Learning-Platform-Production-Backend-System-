require('dotenv').config()
require('./config/database')

const express = require('express')
const cors = require('cors')

const authRoutes = require('./modules/auth/auth.routes')
const questionRoutes = require('./modules/questions/questions.routes')
const testRoutes = require('./modules/tests/tests.routes')
const verifyToken = require('./middleware/auth.middleware')

const app = express()   // 👈 Define app FIRST

// Middlewares
app.use(cors())
app.use(express.json())


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/tests', testRoutes)

// 🔐 Protected test route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You accessed protected route!',
    user: req.user
  })
})

// Root route
app.get('/', (req, res) => {
  res.send('SSC Mock Backend Running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})