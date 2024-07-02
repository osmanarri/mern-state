const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')

mongoose
    .connect(process.env.URI_MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('DB connection error:', err))

const app = express()

// middlewares
// parse json data into JS object
app.use(express.json())

// routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.listen(3000, () => {
    console.log(`Server is running on Port 3000!!`)
})