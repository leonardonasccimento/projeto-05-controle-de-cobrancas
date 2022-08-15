const express = require('express');
const { signUp } = require('../controllers/user/signUp');
const { editUser } = require('../controllers/user/editUser');
const { listUsers } = require('../controllers/user/listUsers');
const { detailUser } = require('../controllers/user/detailUser');
const image=require('../controllers/user/image');
const verify = require('../middlewares/verify');
const authenticateAccess = require('../middlewares/authentication');

const routeUser = express();

routeUser.get('/usuario', listUsers);
routeUser.post('/usuario', verify.verifyFieldsSignup, verify.verifyEmailSignup, signUp);

routeUser.use(authenticateAccess);

routeUser.get('/usuario/:id', detailUser);
routeUser.put('/usuario', verify.verifyFieldsEditUser, verify.verifyEmailEditUser, verify.verifyCpfEditUser, editUser);
routeUser.post('/usuario/carregar', verify.verifyFieldsUploadImage, image.uploadImage);
routeUser.post('/usuario/excluir', verify.verifyFieldsDeleteImage, image.deleteImage);

module.exports = routeUser;
