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
    } 
}

module.exports = { doctorStore }