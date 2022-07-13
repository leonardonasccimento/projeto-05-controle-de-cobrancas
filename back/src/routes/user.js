const express = require('express');
const { signUp } = require('../controllers/user/signUp');
const { editUser } = require('../controllers/user/editUser');
const verify = require('../middlewares/verify');
const authenticateAccess = require('../middlewares/authentication');
const { listUsers } = require('../controllers/user/listUsers');

const routeUser = express();

routeUser.get('/usuario', listUsers);
routeUser.post('/usuario', verify.verifyFieldsSignup, verify.verifyEmailSignup, signUp);

routeUser.use(authenticateAccess);

routeUser.put('/usuario', verify.verifyFieldsEditUser, verify.verifyEmailEditUser, verify.verifyCpfEditUser, editUser);

module.exports = routeUser;
