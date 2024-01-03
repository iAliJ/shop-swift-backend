const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const cartItemCtrl = require('../controllers/cartItem');

// GET /update
router.get('/update', isLoggedIn, cartItemCtrl.cartItem_update_post);

// GET /delete
router.get('/delete', isLoggedIn, cartItemCtrl.cartItem_delete_get);

module.exports = router;