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
    },

    deleteUser: (type, amka) => {

        return new Promise((resolve, reject) => {

            db(type)
            .where({amka : amka})
            .del()
            .then(r => resolve(r))
            .catch(e => reject(e))
        })
    },

    certify: (amka) => {

        return new Promise((resolve, reject) => {

            db('doctor')
            .where({amka: amka})
            .update({certified: 1})
            .then(r => resolve(r))
            .catch(er => reject(er))
        })
    }
}

module.exports = { adminStore }