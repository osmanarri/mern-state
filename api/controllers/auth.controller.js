const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        // accept username, email, and password from the user
        const { username, email, password } = req.body
        // hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10)
        // create the user
        const newUser = new User({ username, email, password: hashedPassword })
        // save it in the DB
        await newUser.save()
        res.status(200).json({ message: 'User created successfully!'})
    } catch (error) {
        next(error)
    }    
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });

        // if the user does not exist
        if (!validUser) {
            // pass the custom error
            return next(errorHandler(404, 'User Not Found!'));
        }

        // compare the entered password with the one in the DB
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        // if the password is not correct
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid credentials!'));
        }

        // create a token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // exclude the password
        const { password: pwd, ...rest } = validUser._doc;

        // save the token in the cookie
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ message: 'Login successful', user: rest });
        
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login }