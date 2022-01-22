/**
 * TO DO
 */
const db = require('./../../database/database').getDb()

const patientStore = {

    addNewBloodTest: (bloodtest) => {

        return new Promise((resolve, reject) => {

            db('bloodtest').insert(bloodtest)
            .then(r => resolve(r))
            .catch(er => reject(er))

        })
    },

    fetchBloodTests: (p_id) => {

        return new Promise((resolve, reject) => {

            db('bloodtest').where({patient_id: p_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fecthConnectedDoctors: (p_id) => {

        return new Promise((resolve, reject) => {

            db('isPatient').where({patient_id: p_id})
            .select('doctor_id')
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchDoctorInfoList: (doctor_id_list) => {

        return new Promise((resolve, reject) => {

            db('doctor').whereIn('_id', doctor_id_list)
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchDoctorAppointments: (d_id) => {
        
        return new Promise((resolve, reject) => {

            db('appointment').where({'doctor_id' : d_id, state: 'free'})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchDoctorAppointmentsFromList: (list, p_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').whereIn('doctor_id', list).where('patient_id', p_id)
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchPatientAppointments: (p_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').where({'patient_id': p_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchSpecificAppointment: (d_id, ap_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').where({doctor_id: d_id, _id: ap_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    fetchTreatments: (p_id) => {

        return new Promise((resolve, reject) => {   

            db('treatment').where({patient_id: p_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    updateAppointmentStateToBooked: (ap_id, p_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').where({_id: ap_id})
            .update({patient_id: p_id, state: "booked"})
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

    getAllUnreadPat: (p_id) => {

        return new Promise((resolve, reject) => {

            db('message').where({patient_id: p_id, isReadPat: 0})
            .then(r => resolve(r))
            .catch(er => reject(er))    
        } )
    },

    markAllReadDoc: (d_id, p_id) => {

        return new Promise((resolve, reject) => {
            
            db('message').where({doctor_id: d_id, patient_id: p_id, isReadPat: 0})
            .update({isReadPat: 1})
            .then(r => resolve(r))
            .catch(er => reject(er))    
        })
    },

    isDoctorPatientPair: (p_id, d_id) => {

        return new Promise((resolve, reject) => {

            db('isPatient').where({patient_id: p_id, doctor_id: d_id})
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

    getAllUnreadPat: (p_id) => {
        return new Promise((resolve, reject) => {

            db('message').where({patient_id: p_id, isReadPat: 0})
            .select('doctor_id')
            .then(r => resolve(r))
            .catch(er => reject(er))    
        } )
    },

    markAllReadPat: (d_id, p_id) => {
        return new Promise((resolve, reject) => {
            
            db('message').where({doctor_id: d_id, patient_id: p_id, isReadPat: 0})
            .update({isReadPat: 1})
            .then(r => resolve(r))
            .catch(er => reject(er))    
        })
    },

    getAppointmentDoctor: (ap_id) => {

        return new Promise((resolve, reject) => {

            db('appointment').where({_id: ap_id})
            .select('doctor_id')
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    addPatientDoctor: (d_id, p_id) => {

        return new Promise((resolve, reject) => {

            db('isPatient')
            .insert({doctor_id: d_id, patient_id: p_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    },

    getMyInfo: (p_id) => {

        return new Promise((resolve, reject) => {

            db('patient').where({_id: p_id})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    } 
}

module.exports = { patientStore }