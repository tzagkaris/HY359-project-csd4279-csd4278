/**
 * TO DO
 */
const utils = require('./../../utils/index').util_functions;
const store = require('./patient.store').patientStore;

const patientLogic = {

    /* add bloodtest */
    checkNotFutureDate: (req, res, next) => {
        
        if(!req.body.date) {
            next({status: 'error', desc: 'date parameter not in request', code: 400, refCode: 1})
            return;
        }

        if(utils.isFutureDate(req.body.date)) {
            next({status: 'error', desc: 'Future date', code: 400, refCode: 2})
            return;
        }

        next()
    },

    addRatingIfNotExists: (req, res, next) => {

        if(req.body.iron && !req.body.iron_lvl) {
            req.body.iron_lvl = patientLogic.rateReading(60, 170, req.body.iron)
        }

        if(req.body.blood_sugar && !req.body.blood_sugar_lvl) {
            req.body.blood_sugar_lvl = patientLogic.rateReading(140, 200, req.body.blood_sugar)
        }

        if(req.body.vitamin_b12 && !req.body.vitamin_b12_lvl) {
            req.body.vitamin_b12_lvl = patientLogic.rateReading(160, 950, req.body.vitamin_b12)
        }

        if(req.body.vitamin_d3 && !req.body.vitamin_d3_lvl) {
            req.body.vitamin_d3_lvl = patientLogic.rateReading(20, 40, req.body.vitamin_d3)
        }

        next()
    },

    rateReading(low, max, toCheck) {

        if(toCheck < low) return 'low';
        if(toCheck > max) return 'high';

        return 'normal';

    },

    addBloodTest: (req, res, next) => {
        
        let bloodTest = {
            patient_id: req.body.pers.id,
            date: req.body.date,
            iron: req.body.iron,
            iron_lvl: req.body.iron_lvl,
            blood_sugar: req.body.blood_sugar,
            blood_sugar_lvl: req.body.blood_sugar_lvl,
            vitamin_b12: req.body.vitamin_b12,
            vitamin_b12_lvl: req.body.vitamin_b12_lvl,
            vitamin_d3: req.body.vitamin_d3,
            vitamin_d3_lvl: req.body.vitamin_d3_lvl,
        }

        store.addNewBloodTest(bloodTest)
        .then(r => res.status(200).send({status: 'ok'}))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },

    /* get bloodtests */
    getBloodTests: (req, res, next) => {

        store.fetchBloodTests(req.body.pers.id)
        .then(r => res.status(200).send(r))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))
    },

    getDoctorList: (req, res, next) => {

        let p_id = req.body.pers.id;
        
        if(req.body.d_ids) {
            next({status: 'error', desc: 'Nice try', code: 400, refCode: 1})
            return;
        }

        let doctor_ids = [];
        store.fecthConnectedDoctors(p_id)
        .then(rows => {
            
            rows.forEach(row => {
                let d_id = row.doctor_id;
                doctor_ids.push(d_id);
            })

            req.body.d_ids = doctor_ids;
            next();
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2}))
    },

    getDoctorInfoFromList: (req, res, next) => {

        let d_ids = req.body.d_ids;

        store.fetchDoctorInfoList(d_ids)
        .then(r => {
            
            r.forEach(elem => {
                delete elem.password
                delete elem.email
            })
            
            res.status(200).send(r)
        
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))

    },

    getPatientAppointments: (req, res, next) => {

        let p_id = req.body.pers.id;
        store.fetchPatientAppointments(p_id)
        .then(r => {
            res.status(200).send(r);            
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))

    },

    getPatientTreatments: (req, res, next) => {

        let p_id = req.body.pers.id;
        store.fetchTreatments(p_id)
        .then(r => {
            res.status(200).send(r);            
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))

    },
    getAppointments: (req, res, next) => {

        let d_id = req.params.doctor_id;

        if(req.body.ap) {
            next({status: 'error', desc: 'Nice try', code: 400, refCode: 1})
            return;
        }

        store.fetchDoctorAppointments(d_id)
        .then(r => { req.body.ap = r; next()})
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2}))

    },

    filterAppoinmtnetsByDate: (req, res, next) => {
        
        let appointments = req.body.ap;
        let filtered = []

        appointments.forEach(ap => {
            /* return only future appointments */
            if(utils.isFutureDate(utils.unbundleUTCdate(ap.date))) filtered.push(ap)
        })

        res.status(200).send(filtered)
    },

    checkIfAppointmentIsFree: (req, res, next) => {

        let d_id = req.params.doctor_id;
        let ap_id = req.params.appointment_id;


        store.fetchSpecificAppointment(d_id, ap_id)
        .then(ap => {
            if(ap[0].state != "free") {
                next({status: 'error', desc: 'Appointment is not free', code: 400, refCode: 1})
                return;    
            }

            next()
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2}))
    },

    bookAppointment: (req, res, next) => {

        let ap_id = req.params.appointment_id;
        let p_id = req.body.pers.id;

        store.updateAppointmentStateToBooked(ap_id, p_id)
        .then(r => {
            // add patient to doctor patients
            res.status(200).send({status: 'ok'})
            patientLogic.addToDoctorPatients(req);
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },
 
    addToDoctorPatients: (req) => {
        try{
            let ap_id = req.params.appointment_id;
            let p_id = req.body.pers.id;
            
            // get appointment doctor_id
            store.getAppointmentDoctor(ap_id)
            .then(r => {
                let d_id = r[0].doctor_id;

                store.addPatientDoctor(d_id, p_id)
                .then(r => {})
                .catch(er => console.log(er))
            })
            .catch(er => console.log(er))

        }catch(er) {
            console.log(er)
        }
    },

    isDoctorPatient: (req, res, next) => {
        
        let p_id = req.body.pers.id;
        let d_id = req.params.doctor_id;

        store.isDoctorPatientPair(p_id, d_id)
        .then(r => {
            if(!r.length) {
                next({status: 'error', desc: 'Patient not linked with doctor', code: 400, refCode: 1})
                return;     
            }

            next();
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2})
            return;
        })

    },

    getUnreadPat: (req, res, next) => {

        let p_id = req.body.pers.id;

        store.getAllUnreadPat(p_id)
        .then(r => {
            res.status(200).send(r)

        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },

    addNewMessage: (req, res, next) => {

        if(!req.body.date) {
            next({status: 'error', desc: 'Date is missing from body', code: 400, refCode: 3})
            return;  
        }

        let message = {
            patient_id: req.body.pers.id,
            doctor_id: req.params.doctor_id,
            date: req.body.date,
            content: req.body.content,
            from: "patient"
        }

        store.addNewMessage(message)
        .then(r => res.status(200).send({status: 'ok'}))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 4}))
    },

    getChatLog: (req, res, next) => {

        let d_id = req.params.doctor_id;
        let p_id = req.body.pers.id;

        store.fetchChatLogs(p_id, d_id)
        .then(r => res.status(200).send(r))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },

    markAllRead: (req, res, next) => {

        let p_id = req.body.pers.id;
        let d_id = req.params.doctor_id;

        store.markAllReadPat(d_id, p_id)
        .then(r => res.status(200).send({status: 'ok'}))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },

    getMyInfo: (req, res, next) => {

        let p_id = req.body.pers.id;

        store.getMyInfo(p_id)
        .then(r => {
            delete r[0].password
            delete r[0].email
            res.status(200).send(r[0])
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))

    }
}

module.exports = { patientLogic }