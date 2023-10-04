const express = require('express');
const router = express.Router();

const createBudgetRoute = require('./create');
const fetchBudgetRoute = require('./fetch');
const fetchBudgetDetailsRoute = require('./fetchBudget');
// const loginRoute = require('./login');

router.use('/create', createBudgetRoute);
router.use('/fetch', fetchBudgetRoute);
router.use('/budget-details', fetchBudgetDetailsRoute);
// router.use('/login', loginRoute);

module.exports = router;
