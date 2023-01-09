const express = require('express');
const checkUser = require('../middlewares/common');

const router = express.Router();

const { renderProfile } = require('../controllers/itemsControllers');

router.get('/', checkUser, renderProfile);

module.exports = router;
