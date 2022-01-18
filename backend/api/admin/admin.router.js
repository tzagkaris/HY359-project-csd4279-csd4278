const router = require('express').Router();
const logger = require('./../../utils/logger/logger').logger;
const cError = require('./../../utils/error/error').cError;

const Authenticator = require('./../../authentication/auth').Authenticator;
const auth = new Authenticator('admin')

const logic = require('./admin.logic').adminLogic;

router.use(logger.logRequest);

router.use(auth.authenticate);

router.get('/users', 
    logic.getUsers
)

router.delete('/users/:amka',
    logic.deleteUser
)

router.post('/certify',
    logic.certifyDoc
)


router.use(cError.onError)

module.exports = { routerBundle:  { router, prefix: '/admin'} };