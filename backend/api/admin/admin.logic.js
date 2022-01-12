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

const delType = (type, amka) => {

    return new Promise((resolve, reject) => {
        store.deleteUser(type, amka)
        .then(r => resolve(r))
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
    },

    deleteUser: (req, res, next) => {

        if(!req.body.amka) {
            next({status: 'error', desc: 'Amka not specified', code: 400, refCode: 2})
            return;
        }

        Promise.all([
            delType('patient', req.body.amka),
            delType('doctor', req.body.amka)
        ])
        .then(r => {
            res.status(200).send({status: 'ok'})
        })
        .catch(e => {
            next({status: 'error', desc: 'Internal error', code: 500, refCode: 1})
        })
    },

    certifyDoc: (req, res, next) => {

        if(!req.body.amka) {
            next({status: 'error', desc: 'Amka not specified', code: 400, refCode: 2})
            return;
        }

        store.certify(req.body.amka)
        .then(r => {
            res.status(200).send({status: 'ok'});
        })
        .catch(er => {
            next({status: 'error', desc: 'Internal error', code: 500, refCode: 1})
        })
    }

}

module.exports = { adminLogic }