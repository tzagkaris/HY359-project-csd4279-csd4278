const router = require('express').Router();
const logger = require('./../../utils/logger/logger').logger;
const errorHandler = require('./../../utils/error/error').cError;
const logic = require('./open.logic').openLogic;

router.use(logger.logRequest);

router.post('/register', 

    logic.checkAmkaValidity,
    logic.checkBirthDate,
    logic.register
);

router.post('/login',

    logic.checkLoginInfo,
    logic.generateToken
);

router.get('/certified',

    logic.getCertified
);

router.use(errorHandler.onError);

module.exports = { routerBundle:  { router, prefix: '/open'} };