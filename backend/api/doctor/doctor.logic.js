/**
 * TO DO
 */
const utils = require('./../../utils/index').util_functions;
const store = require('./doctor.store').doctorStore;

const doctorLogic = {

    /* new appointment */
    checkValidDate: (req, res, next) => {

        if(!req.body.date) {
            next({status: 'error', desc: 'date missing from request', code: 400, refCode: 2})
            return;
        }

        let date = req.body.date;

        /* check if date is passed */
        if(!utils.isFutureDate(utils.unbundleUTCdate(date))) {
            next({status: 'error', desc: 'date provided has passed', code: 400, refCode: 3})
            return;
        }

        next()
    },

    checkValidDuration: (req, res, next) => {
        let dateStr = req.body.date;
        let duration = req.body.duration;

        if(duration < 30) {
            next({status: 'error', desc: 'appointment duration is less than 30 mins', code: 400, refCode: 4})
            return;
        } 
        
        let dateTime = utils.unbundleUTCTime(dateStr)

        if(dateTime.hour < 8 || dateTime.hour > 21 || (dateTime.hour > 20 && dateTime.min >= 30)) {
            next({status: 'error', desc: 'appointment time is out of bounds', code: 400, refCode: 4})
            return;
        } 

        next()
    },

    checkValidPrice: (req, res, next) => {

        if(!req.body.price) {
            next({status: 'error', desc: 'price missing in request', code: 400, refCode: 5})
            return;  
        }

        if(req.body.price < 10 || req.body.price > 80) {
            next({status: 'error', desc: 'price out of bounds', code: 400, refCode: 6})
            return;  
        }

        next()
    },

    addNewAppointment: (req, res, next) => {
        let appointment = {
            doctor_id: req.body.pers.id,
            date: req.body.date,
            duration: req.body.duration,
            price: req.body.price,
            state: 'free'
        }

        store.newAppointment(appointment)
        .then(r => {
            res.status(200).send({status: 'ok', appointmentId: r[0]});
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal Error', code: 500, refCode: 7})
        })
    },

    /* get appointments */
    getAppointments: (req, res, next) => {
        let doc_id = req.body.pers.id;

        store.fetchAppointments(doc_id)
        .then(r => res.status(200).send(r))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))
    },

    
}

module.exports = { doctorLogic }