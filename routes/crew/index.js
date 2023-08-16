const express = require('express');
const router = express.Router();

const crewMemberRoute = require('./create');
// const loginRoute = require('./login');

router.use('/create', crewMemberRoute);
// router.use('/login', loginRoute);

module.exports = router;