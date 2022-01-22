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

    /* post appointment */
    changeAppointmentState: (req, res, next) => {
        let newState = req.body.newState;
        let ap_id = req.body.appointment_id;

        if(!newState || !ap_id) {
            next({status: 'error', desc: 'Missing arguments in request body', code: 400, refCode: 1})
            return;
        }

        if(newState != "free" && newState != "selected" 
            && newState != "cancelled" && newState !="done") {
                next({status: 'error', desc: 'newState invalid value', code: 400, refCode: 2})
                return;
        }

        let d_id = req.body.pers.id; 

        store.updateAppointmentState(d_id, ap_id, newState)
        .then(rows => {
            res.status(200).send({status: 'ok'})
            
            /* add the patient on the doctor's patient list */
            try {
            //if(newState == "done") doctorLogic.registerPatientOnDoctor(ap_id, d_id);
            return;
            }
            catch(er) {}
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },

    registerPatientOnDoctor: (ap_id, doc_id) => {
        store.getPatientFromAppointment(ap_id)
        .then(r => {
            if(r == []) return;    /* appointment not booked by patient, wrong use so return */
            let p_id = r[0].patient_id;

            store.newDocPatientPair(p_id, doc_id)
            .catch(er => {})
        })
        .catch(er => {})
    },

    /* get appointments */
    getAppointments: (req, res, next) => {
        let doc_id = req.body.pers.id;

        store.fetchAppointments(doc_id)
        .then(r => res.status(200).send(r))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))
    },

    /* get patient's blood exams */
    isPatientDoctor: (req, res, next) => {

        let p_id = req.params.patient_id;
        let d_id = req.body.pers.id;

        store.checkDocPatientPair(p_id, d_id)
        .then(r => {
            if(!r.length) {
                next({status: 'error', desc: 'Patient not registered with doctor', code: 401, refCode: 1})
                return;
            }

            next();
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2})
            return;
        })
    },

    getPatientBloodtests: (req, res, next) => {
        
        let p_id = req.params.patient_id;

        store.getPatientBloodtests(p_id)
        .then(rows => res.status(200).send(rows))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },
    
    /* add treatment */
    checkExamExists: (req, res, next) => {

        let p_id = req.params.patient_id;
        let e_id = req.params.bloodtest_id;

        store.getSpecificExam(p_id, e_id)
        .then(rows => {
            if(!rows.length) {
                next({status: 'error', 
                desc: 'Bloodtest id does not belong or is not registered to said patient', 
                code: 400, refCode: 2})
                return;
            }

            next();
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3})
            return;
        })
        
    },

    addNewTreatment: (req, res ,next) => {

        if(!req.body.date_start || !req.body.date_end) {
            next({status: 'error', desc: 'Dates are missing', code: 400, refCode: 4})
            return;
        }

        let treatment = {
            bloodtest_id: req.params.bloodtest_id,
            patient_id: req.params.patient_id,
            doctor_id: req.body.pers.id,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            medications: req.body.medications,
            examinations: req.body.examinations
        }

        store.newTreatment(treatment)
        .then(r => res.status(200).send({status: 'ok'}))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 5}))
    },

    /* get all doctor patients */
    getDocPatients: (req, res, next) => {

        if(req.body.p_ids) {
            next({status: 'error', desc: 'nice try', code: 400, refCode: 1})
            return;
        }

        let doc_id = req.body.pers.id;
        let patients_ids = [];
        /* compile returned rows into 1d patient_id array */
        store.getDocPatientPairs(doc_id)
        .then(rows => {
            rows.forEach(row => {
                let p_id = row.patient_id;
                patients_ids.push(p_id);
            })

            req.body.p_ids = patients_ids;
            next()
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2})
            return;
        })
    },

    getDocPatientInfo: (req, res, next) => {

        let id_list = req.body.p_ids;
        store.fetchPatientsList(id_list)
        .then(r => {
            
            r.forEach(elem => {
                delete elem.password
                delete elem.email
            })
            
            res.status(200).send(r)
        
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    },

    /* chat */
    getUnreadDoc: (req, res, next) => {

        let d_id = req.body.pers.id;

        store.getAllUnreadDoc(d_id)
        .then(r => {
            res.status(200).send(r)
        })
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))
    },

    markAllReadDoc: (req, res, next) => {

        let d_id = req.body.pers.id;
        let p_id = req.params.patient_id;

        store.markAllReadDoc(d_id, p_id)
        .then(r => res.status(200).send({status: 'ok'}))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 1}))
    },

    getChatLog: (req, res, next) => {

        let p_id = req.params.patient_id;
        let d_id = req.body.pers.id;

        store.fetchChatLogs(p_id, d_id)
        .then(r => res.status(200).send(r))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 2}))
    },

    addNewMessage: (req, res, next) => {

        if(!req.body.date) {
            next({status: 'error', desc: 'Date is missing from body', code: 400, refCode: 2})
            return;  
        }

        let message = {
            doctor_id: req.body.pers.id,
            patient_id: req.params.patient_id,
            date: req.body.date,
            content: req.body.content
        }

        store.addNewMessage(message)
        .then(r => res.status(200).send({status: 'ok'}))
        .catch(er => next({status: 'error', desc: 'Internal Error', code: 500, refCode: 3}))
    }


}

module.exports = { doctorLogic }