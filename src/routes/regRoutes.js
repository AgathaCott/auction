const express = require('express');

const router = express.Router();

const { renderRegister, regUser } = require('../controllers/regControllers');

router.get('/', renderRegister).post('/', regUser);

module.exports = router;
