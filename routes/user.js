const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const userCtrl = require('../controllers/user');

// GET /getData
router.get('/detail', isLoggedIn, userCtrl.user_detail_get);

module.exports = router;