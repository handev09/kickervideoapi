const express = require('express');
const router = express.Router();

const createLineItemRoute = require('./create');
const fetchLineItemRoute = require('./fetch');
// const loginRoute = require('./login');

router.use('/create', createLineItemRoute);
router.use('/fetch', fetchLineItemRoute);
// router.use('/login', loginRoute);

module.exports = router;
