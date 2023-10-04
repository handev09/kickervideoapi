const express = require('express');
const router = express.Router();

const createClientsRoute = require('./create');
const fetchClientsRoute = require('./fetch');
const fetchClientDetailsRoute = require('./fetchClient');
// const deleteClientsRoute = require('./delete');
// const loginRoute = require('./login');

router.use('/create', createClientsRoute);
router.use('/fetch', fetchClientsRoute);
router.use('/client-details', fetchClientDetailsRoute);
// router.use('/delete', deleteExpenseRoute);
// router.use('/login', loginRoute);

module.exports = router;
