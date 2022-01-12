const router = require('express').Router();
const logger = require('./../../utils/logger/logger').logger;
const cError = require('./../../utils/error/error').cError;

const authenticator = require('./../../authentication/auth').authenticator;
const auth = new authenticator('admin')

const logic = require('./admin.logic').adminLogic;

router.use(logger.logRequest);

router.use(auth.authenticate);

router.get('/users', 
    logic.getUsers
)


router.use(cError.onError)

module.exports = { routerBundle:  { router, prefix: '/admin'} };