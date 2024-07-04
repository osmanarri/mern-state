const errorHandler = require('./error')
const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    // get the the token from the cookie 
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(401, 'Unauthorized'))
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(403, 'Forbidden'))
        }
        req.user = user;
        // go to the next (updateUser)
        next()
    })

}

module.exports = verifyUser;
