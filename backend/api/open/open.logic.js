/**
 * Logic / functions required for open routes.
 * Bundled together in an service like js object.
 */
const store = require('./open.store').openStore;
const util = require('./../../utils/index').util_functions;

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
            
            if(error.errno == 19) {
                msg_tokens = error.message.split("-");  
                next({status: 'error', desc: msg_tokens[msg_tokens.length - 1], code: 400, refCode: 5}) 
            }
            else {
                next({status: 'error', desc: 'Internal error', code: 500})
            }
        
        
        })
    },

    onError: (error, req, res, next) => {
        
        res.status(error.code).send({error: error});
        return;
    }
}

module.exports = { openLogic }