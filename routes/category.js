const express = require('express');
const router = express.Router();
const isLoggedin = require('../helper/isLoggedIn');
const isRoleSeller = require('../helper/isRoleSeller');
const shopController = require('../controllers/category');

router.use(express.json());

// POST /create
router.post('/create', isLoggedin,  shopController.category_create_post);

// POST /edit
router.post('/edit', isLoggedin, isRoleSeller, shopController.category_edit_post);

// GET /delete
router.get('/delete', isLoggedin, isRoleSeller, shopController.category_delete_get);

// GET /all
router.get('/all', shopController.category_getAll_get);

// GET /detail
router.get('/detail', shopController.category_detail_get);

module.exports = router;


