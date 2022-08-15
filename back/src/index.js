require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const routeLogin = require('./routes/login');
const routeUser = require('./routes/user');
const routeCostumer = require('./routes/customer');
const routeBilling = require('./routes/billings');

app.use(cors());
app.use(express.json({limit: Infinity}));
app.use(routeLogin);
app.use(routeUser);
app.use(routeCostumer);
app.use(routeBilling);

app.listen(port, () => {
    console.log(`Server is Runnig at http://localhost:${port}/`);
});

