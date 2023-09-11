const express = require('express');
const router = express.Router();

const createExpenseRoute = require('./create');
const fetchExpenseRoute = require('./fetch');
const deleteExpenseRoute = require('./delete');
// const loginRoute = require('./login');

router.use('/create', createExpenseRoute);
router.use('/fetch', fetchExpenseRoute);
router.use('/delete', deleteExpenseRoute);
// router.use('/login', loginRoute);

module.exports = router;
