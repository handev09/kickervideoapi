const express = require('express');
const router = express.Router();

const payRoute = require('./pay');

router.use('/pay', payRoute);

module.exports = router;
