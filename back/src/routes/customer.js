const express = require('express');
const authenticateAccess = require('../middlewares/authentication');
const verifyFieldsCustomer=require('../middlewares/verifyFields/verifyFieldsCustomer');
const verifyEmailCustomerEdit=require('../middlewares/genericChecks/verifyEmailCustomerEdit');
const verifyCpfCustomerEdit=require('../middlewares/genericChecks/verifyCpfCustomerEdit');
const  detailCustomer  = require('../controllers/customers/detailCustomer');
const  editCustomer = require('../controllers/customers/editCustomer');
const  listCustomers  = require('../controllers/customers/listCustomers');
const  registerCustomer  = require('../controllers/customers/registerCustomer');

const routeCostumer = express();

routeCostumer.use(authenticateAccess);

routeCostumer.post('/cliente', verifyFieldsCustomer, registerCustomer);
routeCostumer.get('/cliente', listCustomers);
routeCostumer.get('/cliente/:id', detailCustomer);
routeCostumer.put('/cliente/:id',verifyFieldsCustomer, verifyCpfCustomerEdit, verifyEmailCustomerEdit, editCustomer)

module.exports = routeCostumer;
