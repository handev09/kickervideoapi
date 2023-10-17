const express = require('express');
const router = express.Router();

const crewMemberRoute = require('./create');
const fetchCrewRoute = require('./fetch');
const fetchCrewDetailsRoute = require('./fetchCrewDetails');

router.use('/create', crewMemberRoute);
router.use('/fetch', fetchCrewRoute);
router.use('/details', fetchCrewDetailsRoute);
// router.use('/login', loginRoute);

module.exports = router;