const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const cartItemCtrl = require('../controllers/cartItem');

// POST /update
router.get('/update', isLoggedIn, cartItemCtrl.cartItem_update_post);

module.exports = router;