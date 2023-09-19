const express = require('express');
const router = express.Router();

const authRoutes = require('./auth'); // Import authRoutes module
const budgetRoutes = require('./budget'); // Import budgetRoutes module
const crewRoutes = require('./crew'); // Import budgetRoutes module
const expesnseRoutes = require('./expenses'); // Import budgetRoutes module
const subRoutes = require('./payments'); // Import budgetRoutes module
const userRoutes = require('./user'); // Import budgetRoutes module
// const budgetRoutes = require('./budgetRoutes');
// const crewRoutes = require('./crewRoutes');

// Use the authRoutes module
router.use('/auth', authRoutes);
router.use('/budget', budgetRoutes);
router.use('/crew', crewRoutes);
router.use('/expense', expesnseRoutes);
router.use('/subscription', subRoutes);
router.use('/user', userRoutes);
// router.use('/budgets', budgetRoutes);
// router.use('/crew', crewRoutes);

module.exports = router;
