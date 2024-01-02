const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const cartCtrl = require('../controllers/cart');

// GET /detail
router.get('/detail', isLoggedIn, cartCtrl.cart_detail_get);

module.exports = router;