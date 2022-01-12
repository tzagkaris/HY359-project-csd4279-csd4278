/**
 * TO DO
 */

const db = require('./../../database/database').getDb();

const openStore = {

    /**
     * Insert new user (doctor or patient) to the database.
     * 
     * @param user doctor or patient object.
     */
    newUser: (user) => {
        let table = "";
        
        if(user.specialty) table = "doctor"
        else table = "patient"

        return new Promise((resolve, reject) => {
            
            db(table).insert(user)
            .then(res => resolve(res))
            .catch(error => reject(error))

        })
             
    },

    getLogin: (user, name, pass) => {

        return new Promise((resolve, reject) => {
            
            db(user).where({username: name, password: pass})
            .then(res => {
                if(res.length) resolve(res)
                else resolve(0)
            })
            .catch(error => {
                reject(error)
            })    
        })
    },

    getCert: () => {

        return new Promise((resolve, reject) => {

            db('doctor').where({certified: 1})
            .then(res => resolve(res))
            .catch(error => reject(error))
        })
    }

} 

module.exports = { openStore }