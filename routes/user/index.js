const express = require('express');
const router = express.Router();


const fetchUserRoute = require('./fetch');



router.use('/me', fetchUserRoute);
// router.use('/login', loginRoute);

module.exports = router;
