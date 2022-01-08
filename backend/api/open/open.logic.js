/**
 * Logic / functions required for open routes.
 * Bundled together in an service like js object.
 */



const openLogic = {

    /* register */
    
    checkBirthDate: (req, res, next) => {

    },

    checkAmkaValidity: (req, res, next) => {

    },

    register: (req, res, next) => {

    },

    onError: (error, req, res, next) => {
        
        res.status(error.status).send({error: error});
        return;
    }
}

module.exports = { openLogic }