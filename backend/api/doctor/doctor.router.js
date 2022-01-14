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

router.post('/appointment',
    logic.changeAppointmentState
)

router.get('/appointments', 
    logic.getAppointments
)

router.get('/:patient_id/bloodtests',
    logic.isPatientDoctor,
    logic.getPatientBloodtests
)

router.put('/:patient_id/:bloodtest_id/treatment',
    logic.isPatientDoctor,
    logic.checkExamExists,
    logic.addNewTreatment
)

router.get('/patients', 
    logic.getDocPatients,
    logic.getDocPatientInfo
)

/* chat */
router.get('/:patient_id/chat',
    logic.isPatientDoctor,
    logic.getChatLog
)

router.put('/:patient_id/chat',
    logic.isPatientDoctor,
    logic.addNewMessage
)

router.use(error.onError)

module.exports = { routerBundle:  { router, prefix: '/doctor'} };