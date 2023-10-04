const express = require('express');
const router = express.Router();

const createContactsRoute = require('./create');
const fetchContactsRoute = require('./fetch');
const fetchContactDetailsRoute = require('./fetchContact');
// const deleteClientsRoute = require('./delete');
// const loginRoute = require('./login');

router.use('/create', createContactsRoute);
router.use('/fetch', fetchContactsRoute);
router.use('/contact-details', fetchContactDetailsRoute);
// router.use('/delete', deleteExpenseRoute);
// router.use('/login', loginRoute);

module.exports = router;
