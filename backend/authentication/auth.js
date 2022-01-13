/**
 * Service like authentication system. 
 * Used as express middleware.
 */
const jwt = require('jsonwebtoken')
const logger = require('./../utils/logger/logger').logger;
const secret = 'csd4279'

class Authenticator {

    constructor(valid) {
        this.valid = valid;
    }

    authenticate = (req, res, next) => {

        if(!req.headers.authentication) {
            next({status: 'error', desc: 'Unauthorized || Request not signed', code: 401, refCode: -1})
            logger.logUnauthrized('Request not signed.');
            return;
        } 

        try {
            let token = jwt.verify(req.headers.authentication, secret);
            if(!token) throw {reason: 'Invalid Token.'}
            if(token.accType != this.valid) throw {reason: 'Account Type Missmatch.'}
            /* all good, save id and acctype in request in order to be propagated to the rest of the chain */
            req.body.pers = {accType: token.accType, id: token.id}            
        }
        catch(ex) {
            if(!ex.reason) ex.reason = 'Invalid Token';
            next({status: 'error', desc: 'Unauthorized || ' + ex.reason, code: 401, refCode: 0})
            logger.logUnauthrized(ex.reason);
            return;
        }

        next(); //TO DO
    }
}

const auth = {

    newToken: (accountType, id) => {
        return jwt.sign({accType: accountType, id: id}, secret);
    }
}

module.exports = { auth, Authenticator };