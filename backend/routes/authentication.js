const authenticationRouter = require('express').Router();
const authenticationController = require('../controllers/authenticationController');

authenticationRouter.post('/authentication', authenticationController.login);

module.exports = authenticationRouter