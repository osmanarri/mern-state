const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const { errorHandler } = require('../utils/error')

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(200).json({ message: 'User created successfully!'})
    } catch (error) {
        next(error)
    }
    
}

module.exports = { register }