const express = require('express');
const { registerBilling } = require('../controllers/billings/registerBilling');
const { listBillings } = require('../controllers/billings/listBillings');
const { editBilling } = require('../controllers/billings/editBilling');
const { detailBilling } = require('../controllers/billings/detailBilling');
const { deleteBilling } = require('../controllers/billings/deleteBilling');
const authenticateAccess = require('../middlewares/authentication');
const verify = require('../middlewares/verify');

const routeBilling = express();

routeBilling.use(authenticateAccess);

routeBilling.post('/cobranca/:id', verify.verifyFieldsBilling, registerBilling);
routeBilling.get('/cobranca', listBillings);
routeBilling.put('/cobranca/:id', verify.verifyFieldsBilling, editBilling);
routeBilling.get('/cobranca/:id', detailBilling);
routeBilling.delete('/cobranca/:id', deleteBilling);

module.exports = routeBilling;