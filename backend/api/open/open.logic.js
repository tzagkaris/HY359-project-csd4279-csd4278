/**
 * Logic / functions required for open routes.
 * Bundled together in an service like js object.
 */
const store = require('./open.store').openStore;
const util = require('./../../utils/index').util_functions;
const auth = require('./../../authentication/auth').auth;

const checkDbLoginInfo = (type, username, password) => {

    return new Promise((resolve, reject) => {
        store.getLogin(type, username, password)
        .then(res => {
            if(!res) resolve(0)
            else resolve({type: type, id: res[0]._id})
        })
        .catch(error => {
            reject(error)
        })
    })
}

const openLogic = {

    /* register */
    
    checkBirthDate: (req, res, next) => {

        let birthdate = req.body.birthdate;

        birthdate = birthdate.split("-");
        /* day month  year */
        let bday = birthdate[2].substring(0,2);
        let bmonth = birthdate[1]
        let byear = birthdate[0]

        if(util.isFutureDate({day: bday, month: bmonth, year: byear})) {
            next({status: 'error', desc: 'future birthdate', code: 400, refCode: 4 })
            return;
        }
        
        next();
    },

    checkAmkaValidity: (req, res, next) => {

        if(!req.body.amka) {
            next({status: 'error', desc: 'amka field missing', code: 400, refCode: 1 })
            return;
        }
        let amka = req.body.amka;

        if(!req.body.birthdate) {
            next({status: 'error', desc: 'birthdate field missing', code: 400, refCode: 2 })
            return;
        }
        let birthdate = req.body.birthdate;

        birthdate = birthdate.split("-");
        /* day month  year */
        let day = birthdate[2].substring(0,2);
        let month = birthdate[1]
        let year = birthdate[0].substring(2,4)

        let amka_day = amka.substring(0,2);
        let amka_month = amka.substring(2, 4)
        let amka_year = amka.substring(4, 6)
        
        if(day != amka_day || month != amka_month || year != amka_year) {
            next({status: 'error', desc: 'invalid birthdate based on amka provided', code: 400, refCode: 3 })
            return;
        }

        next();
    },

    register: (req, res, next) => {

        store.newUser(req.body)
        .then(ret => {
            res.status(200).send({status: 'ok'})
        })
        .catch(error => {
            /* duplicate amka, email, username error */
            console.log(error)
            
            if(error.errno == 19) {
                msg_tokens = error.message.split("-");  
                next({status: 'error', desc: msg_tokens[msg_tokens.length - 1], code: 400, refCode: 5}) 
            }
            else {
                next({status: 'error', desc: 'Internal error', code: 500, refCode: 6})
            }
        
        
        })
    },

    /* login */
    checkLoginInfo: (req, res, next) => {

        if(!req.body.username || !req.body.password) {
            next({status: 'error', desc: 'missing username or password', code: 400, refCode: 1})
            return;
        } 

        if(req.body.at) {
            next({status: 'error', desc: 'nice try', code: 400, refCode: 123})
            return;
        }

        Promise.all([
            checkDbLoginInfo('patient', req.body.username, req.body.password),
            checkDbLoginInfo('doctor', req.body.username, req.body.password),
            checkDbLoginInfo('admin', req.body.username, req.body.password)
        ])
        .then((values) => {
            let accType = undefined;
            let id = undefined;
            values.forEach(val => {
                if(val && val.type) {
                    accType = val.type; 
                    id = val.id;
                }
                })

            /* account found, cont here */
            if(accType) {
                req.body.at = accType;
                req.body.id = id;
                next()
                return;
            
            /* creds do not match, sad */
            } else {
                next({status: 'error', desc: 'Invalid creds', code: 400, refCode: 2})
                return;
            }
            
        }).catch(er => {
            next({status: 'error', desc: 'Internal error', code: 500, refCode: 3})
            return;
        })
    },

    generateToken: (req, res, next) => {
        let tok = auth.newToken(req.body.at, req.body.id)
        res.status(200).send({status: 'ok', accountType: req.body.at ,token: tok});
    },

    getCertified: (req, res, next) => {

        store.getCert()
        .then(rows => {
            /* delete private information */
            rows.forEach(row => {delete row.password; delete row.email })
            res.status(200).send(rows)
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal error', code: 500, refCode: 1})
        })
    },


    onError: (error, req, res, next) => {
        res.status(error.code).send({error: error});
        return;
    }
}

module.exports = { openLogic }