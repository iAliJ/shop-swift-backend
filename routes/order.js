const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const orderCtrl = require('../controllers/order');

// get /create
router.get('/create', isLoggedIn, orderCtrl.order_create_get);

// get /detail
router.get('/detail', isLoggedIn, orderCtrl.order_detail_get);

// get /user
router.get('/user', isLoggedIn, orderCtrl.order_user_get)

module.exports = router;