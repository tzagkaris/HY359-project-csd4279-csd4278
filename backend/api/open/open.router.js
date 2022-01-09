const router = require('express').Router();
const logger = require('./../../utils/logger/logger').logger;
const logic = require('./open.logic').openLogic;

router.use(logger.logRequest);

router.post('/register', 

    logic.checkAmkaValidity,
    logic.checkBirthDate,
    logic.register,
    logic.onError
)


module.exports = { routerBundle:  { router, prefix: '/open'} };