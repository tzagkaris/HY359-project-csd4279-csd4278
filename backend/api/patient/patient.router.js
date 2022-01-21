const router = require('express').Router();

const logic = require('./patient.logic').patientLogic;
const logger = require('./../../utils/logger/logger').logger;
const error = require('./../../utils/error/error').cError;

const Authenticator = require('./../../authentication/auth').Authenticator;
const auth = new Authenticator('patient')

router.use(logger.logRequest)

router.use(auth.authenticate)

router.put('/bloodtest', 
    logic.checkNotFutureDate,
    logic.addRatingIfNotExists,
    logic.addBloodTest
)

router.get('/bloodtest',
    logic.getBloodTests
)

router.get('/doctors',
    logic.getDoctorList,
    logic.getDoctorInfoFromList
)

router.get('/appointments',
    logic.getPatientAppointments
)

router.get('/treatments',
    logic.getPatientTreatments
)

router.get('/:doctor_id/appointments',
    logic.getAppointments,
    logic.filterAppoinmtnetsByDate
)

router.post('/:doctor_id/:appointment_id/book',
    logic.checkIfAppointmentIsFree,
    logic.bookAppointment
)

router.put('/:doctor_id/chat',
    logic.isDoctorPatient,
    logic.addNewMessage
)

router.get('/:doctor_id/chat',
    logic.isDoctorPatient,
    logic.getChatLog
);

router.get('/chat/new',
    logic.getUnreadPat
)

router.post('/:doctor_id/chat',
    logic.isDoctorPatient,
    logic.markAllRead
)


router.use(error.onError)

module.exports = { routerBundle:  { router, prefix: '/patient'} };