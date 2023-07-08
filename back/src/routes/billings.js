const express = require('express');
const authenticateAccess = require('../middlewares/authentication');
const verifyFieldsBilling=require('../middlewares/verifyFields/verifyFieldsBilling');
const  registerBilling  = require('../controllers/billings/registerBilling');
const  listBillings  = require('../controllers/billings/listBillings');
const  editBilling  = require('../controllers/billings/editBilling');
const  detailBilling  = require('../controllers/billings/detailBilling');
const  deleteBilling  = require('../controllers/billings/deleteBilling');

const routeBilling = express();

routeBilling.use(authenticateAccess);

routeBilling.post('/cobranca/:id', verifyFieldsBilling, registerBilling);
routeBilling.get('/cobranca', listBillings);
routeBilling.put('/cobranca/:id', verifyFieldsBilling, editBilling);
routeBilling.get('/cobranca/:id', detailBilling);
routeBilling.delete('/cobranca/:id', deleteBilling);

module.exports = routeBilling;