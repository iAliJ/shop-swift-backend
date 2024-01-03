const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const cartCtrl = require('../controllers/cart');

// GET /items
router.get('/items', isLoggedIn, cartCtrl.cart_items_get);

// GET /detail
router.get('/detail', isLoggedIn, cartCtrl.cart_detail_get);

// GET /empty
router.get('/empty', isLoggedIn, cartCtrl.cart_empty_get);


module.exports = router;