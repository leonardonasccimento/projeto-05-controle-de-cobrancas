const express = require('express');
const verifyFieldsLogin=require('../middlewares/verifyFields/verifyFieldsLogin');
const verifyEmailLogin=require('../middlewares/genericChecks/verifyEmailLogin');
const verifyPassword=require('../middlewares/genericChecks/verifyPassword');
const  login = require('../controllers/user/login');

const routeLogin = express();

routeLogin.post('/login', verifyFieldsLogin, verifyEmailLogin, verifyPassword, login);

module.exports = routeLogin;