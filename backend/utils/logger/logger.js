/**
 * 
 * Service like logging middleware.
 */

const chalk = require('colors/safe')

const  logger = {

    logRequest: (req, res, next) => {
        console.log( 
            chalk.yellow("NEW") + " REQUEST: " 
            + chalk.blue(`${ req.method }`) 
            + " on " + chalk.green(`${ req.baseUrl + req.path }`)
            );
        next();
    },

    logUnauthrized: (info) => {
        console.log(
            chalk.red("Access Denied ") + " -- " + info
        )
    }
}

module.exports = { logger }