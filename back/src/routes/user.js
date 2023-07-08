const express = require('express');
const verifyFieldsSignup=require('../middlewares/verifyFields/verifyFieldsSignup');
const verifyEmailSignup=require('../middlewares/genericChecks/verifyEmailSignup');
const  listUsers  = require('../controllers/user/listUsers');
const  signUp  = require('../controllers/user/signUp');
const authenticateAccess = require('../middlewares/authentication');
const verifyFieldsEditUser=require('../middlewares/verifyFields/verifyFieldsEditUser');
const verifyFieldsUploadImage=require('../middlewares/verifyFields/verifyFieldsUploadImage');
const verifyFieldsDeleteImage=require('../middlewares/verifyFields/verifyFieldsDeleteImage');
const verifyEmailEditUser=require('../middlewares/genericChecks/verifyEmailEditUser');
const verifyCpfEditUser=require('../middlewares/genericChecks/verifyCpfEditUser');
const  detailUser  = require('../controllers/user/detailUser');
const  editUser  = require('../controllers/user/editUser');
const uploadImage=require('../controllers/user/uploadImage');
const deleteImage=require('../controllers/user/deleteImage');

const routeUser = express();

routeUser.get('/usuario', listUsers);
routeUser.post('/usuario', verifyFieldsSignup, verifyEmailSignup, signUp);

routeUser.use(authenticateAccess);

routeUser.get('/usuario/:id', detailUser);
routeUser.put('/usuario', verifyFieldsEditUser, verifyEmailEditUser, verifyCpfEditUser, editUser);
routeUser.post('/usuario/carregar', verifyFieldsUploadImage, uploadImage);
routeUser.post('/usuario/excluir', verifyFieldsDeleteImage, deleteImage);

module.exports = routeUser;
