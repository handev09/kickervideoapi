const express = require('express');
const router = express.Router();

const createLineItemRoute = require('./create');
const fetchLineItemRoute = require('./fetch');
const updateLineItemRoute = require('./update');
const deleteLineItemRoute = require('./delete');
// const loginRoute = require('./login');

router.use('/create', createLineItemRoute);
router.use('/fetch', fetchLineItemRoute);
router.use('/update', updateLineItemRoute);
router.use('/delete', deleteLineItemRoute);
// router.use('/login', loginRoute);

module.exports = router;
