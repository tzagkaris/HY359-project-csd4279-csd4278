/**
 * TO DO
 */

const db = require('./../../database/database').getDb()

const adminStore = {

    fetchUsers: (type) => {

        return new Promise((resolve, reject) => {

            db(type)
            .then(rows => resolve(rows))
            .catch(er => reject(er))
        })
    }
}

module.exports = { adminStore }