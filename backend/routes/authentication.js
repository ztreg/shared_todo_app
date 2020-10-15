const authenticationRouter = require('express').Router();
const authenticationController = require('../controllers/authenticationController');
const { authorization } = require('../middlewares/authorization')

authenticationRouter.get('/authentication/checkToken', authorization, authenticationController.checkToken);

authenticationRouter.post('/authentication', authenticationController.login);


module.exports = authenticationRouter