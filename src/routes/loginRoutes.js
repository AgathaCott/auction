const express = require('express');

const router = express.Router();

const { renderLogin, loginUser } = require('../controllers/loginControllers');

router
  .get('/', renderLogin)
  .post('/', loginUser);

module.exports = router;