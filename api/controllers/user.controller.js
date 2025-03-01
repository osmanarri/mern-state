const errorHandler = require("../utils/error")
const bcryptjs = require('bcryptjs')
const User = require('../models/user.model')

const test = (req, res) => {
    res.send('Hello Osman')
}

const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'Your can only update your own account.'))
    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)

        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json({message: 'User updated', rest})
    } catch (error) {
        next(error)
    }
}

module.exports = { test, updateUser }