const { registerUser, loginUser } = require('./auth.service')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const user = await registerUser(name, email, password)

    res.status(201).json({
      message: 'User registered successfully',
      user
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const data = await loginUser(email, password)

    res.status(200).json({
      message: 'Login successful',
      ...data
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  register,
  login
}