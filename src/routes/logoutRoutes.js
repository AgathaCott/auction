const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const { logoutUser } = require('../controllers/logoutControllers');

router.get('/', checkUser, logoutUser);

module.exports = router;
