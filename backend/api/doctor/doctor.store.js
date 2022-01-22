/**
 * TO DO
 */

const db = require('./../../database/database').getDb();

const doctorStore = {

    newAppointment: (appointment) => {

        return new Promise((resolve, reject) => {

            db('appointment').insert(appointment)
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchAppointments: (doc_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').where({doctor_id: doc_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    updateAppointmentState: (doc_id, ap_id, newState) => {

        return new Promise((resolve, reject) => {
            
            db('appointment').where({doctor_id: doc_id, _id: ap_id})
            .update({state: newState})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    getPatientFromAppointment: (ap_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').where({_id: ap_id})
            .select('patient_id')
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    newDocPatientPair: (pat_id, doc_id) => {

        return new Promise((resolve, reject) => {
            
            db('isPatient').insert({patient_id: pat_id, doctor_id: doc_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    checkDocPatientPair: (pat_id, doc_id) => {

        return new Promise((resolve, reject) => {

            db('isPatient').where({patient_id: pat_id, doctor_id: doc_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    getPatientBloodtests: (pat_id) => {

        return new Promise((resolve, reject) =>{

            db('bloodtest').where({patient_id: pat_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    getSpecificExam: (pat_id, exam_id) => {
        
        return new Promise((resolve, reject) => {
            db('bloodtest').where({patient_id: pat_id, _id: exam_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        }) 
    },

    newTreatment: (treatment) => {

        return new Promise((resolve, reject) => {
            db('treatment').insert(treatment)
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    getDocPatientPairs: (doc_id) => {

        return new Promise((resolve, reject) => {

            db('isPatient').where({doctor_id: doc_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchPatientsList: (patient_id_list) => {

        return new Promise((resolve, reject) => {
            
            db('patient').whereIn('_id', patient_id_list)
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    /* chat */
    fetchChatLogs: (p_id, d_id) => {

        return new Promise((resolve, reject) => {

            db('message').where({doctor_id: d_id, patient_id: p_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    addNewMessage: (message) => {

        return new Promise((resolve, reject) => {

            db('message').insert(message)
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    getAllUnreadDoc: (d_id) => {
        return new Promise((resolve, reject) => {

            db('message').where({doctor_id: d_id, isRead: 0})
            .select('patient_id')
            .then(r => resolve(r))
            .catch(er => reject(er))    
        } )
    },

    markAllReadDoc: (d_id, p_id) => {
        return new Promise((resolve, reject) => {
            
            db('message').where({doctor_id: d_id, patient_id: p_id, isRead: 0})
            .update({isRead: 1})
            .then(r => resolve(r))
            .catch(er => reject(er))    
        })
    }

    
}

module.exports = { doctorStore }