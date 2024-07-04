const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')

mongoose
    .connect(process.env.URI_MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('DB connection error:', err))

const app = express()

// middlewares
// parse json data into JS object
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error.'

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,

    })
})


app.listen(3000, () => {
    console.log(`Server is running on Port 3000!!`)
})