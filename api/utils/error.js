// Error handler for 

const errorHandler = (statusCode, message) => {
    const error = new Error
    error.statCode = statusCode
    error.message = message
    return error
}

module.exports = errorHandler