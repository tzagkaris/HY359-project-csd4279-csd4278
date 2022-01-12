/**
 * Routes for admin usage, 
 * users of other types are not authorized 
 */

const store = require('./admin.store').adminStore;

const getType = (type) => {

    return new Promise((resolve, reject) => {
        store.fetchUsers(type)
        .then(rows => resolve(rows))
        .catch(er => reject(er))
    })
}

const adminLogic = {

    getUsers: (req, res, next) => {

        Promise.all([
            getType('patient'),
            getType('doctor')
        ])
        .then(values => {
            /* even the admin should not be able to see password and email */
            values.forEach(val => val.forEach(ent => {delete ent.password; delete ent.email}))
            let comb = {
                patients: values[0],
                doctors: values[1]
            }

            res.status(200).send(comb);
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal error', code: 500, refCode: 1})
        })
    }
}

module.exports = { adminLogic }