const express = require('express');
const router = express.Router();
const isLoggedin = require('../helper/isLoggedIn');
const isRoleSeller = require('../helper/isRoleSeller');
const shopController = require('../controllers/store');

router.use(express.json());

// POST /create
router.post('/create', isLoggedin, isRoleSeller, shopController.store_create_post);
// router.post('/create', isLoggedin, shopController.store_create_post);

module.exports = router;


