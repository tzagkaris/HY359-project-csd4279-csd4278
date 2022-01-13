const router = require('express').Router();
const logic = require('./doctor.logic').doctorLogic;
const logger = require('./../../utils/logger/logger').logger;
const error = require('./../../utils/error/error').cError;

const Authenticator = require('./../../authentication/auth').Authenticator;
const auth = new Authenticator('doctor')



router.use(logger.logRequest)

router.use(auth.authenticate)

router.put('/appointment',
    logic.checkValidDate,
    logic.checkValidDuration,
    logic.checkValidPrice,
    logic.addNewAppointment
)


router.use(error.onError)

module.exports = { routerBundle:  { router, prefix: '/doctor'} };