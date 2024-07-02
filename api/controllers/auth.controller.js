const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(200).json({ message: 'User created successfully!'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
    
}

module.exports = { register }