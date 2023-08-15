const express = require('express');
const router = express.Router();

const authRoutes = require('./auth'); // Import authRoutes module
const budgetRoutes = require('./budget'); // Import budgetRoutes module
// const budgetRoutes = require('./budgetRoutes');
// const crewRoutes = require('./crewRoutes');

// Use the authRoutes module
router.use('/auth', authRoutes);
router.use('/budget', budgetRoutes);
// router.use('/budgets', budgetRoutes);
// router.use('/crew', crewRoutes);

module.exports = router;
