/**
 * Service like authentication system. 
 * Used as express middleware.
 */
const jwt = require('jsonwebtoken')
const secret = 'csd4279'

const auth = {

    authenticate: (req, res, next) => {
        next(); //TO DO
    },

    newToken: (accountType, username) => {
        return jwt.sign({accType: accountType, username: username}, secret);
    }
}

module.exports = { auth };