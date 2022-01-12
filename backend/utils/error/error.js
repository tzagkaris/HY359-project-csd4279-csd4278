/**
 * Service like error handler.
 * Used as express middleware
 */

const cError = {

    onError: (error, req, res, next) => {
        res.status(error.code).send({error: error});
        return;
    }
}

module.exports = { cError }