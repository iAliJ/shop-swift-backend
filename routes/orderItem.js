const express = require('express');
const router = express.Router();
const isLoggedIn = require('../helper/isLoggedIn');

router.use(express.json());

// Import user controller
const orderItemCtrl = require('../controllers/orderItem');

// POST /create
router.post('/create', isLoggedIn, orderItemCtrl.orderItem_create_post);

// GET /byStore
router.get('/store', isLoggedIn, orderItemCtrl.orderItem_getByStore_get);

module.exports = router;