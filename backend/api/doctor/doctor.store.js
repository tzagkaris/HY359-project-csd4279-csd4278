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
    }

    
}

module.exports = { doctorStore }