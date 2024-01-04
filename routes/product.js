const express = require('express');
const router = express.Router();
const isLoggedin = require('../helper/isLoggedIn');
const isRoleSeller = require('../helper/isRoleSeller');
const shopController = require('../controllers/product');
const upload = require('../helper/multerUploader');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// POST /create
router.post('/create', isLoggedin, isRoleSeller, shopController.product_create_post);

// POST /edit
router.post('/edit', isLoggedin, isRoleSeller, upload.single('file'), shopController.product_edit_post);

// GET /delete
router.get('/delete', isLoggedin, isRoleSeller, shopController.product_delete_get);

// GET /all
router.get('/all', shopController.product_getAll_get);

// GET /detail
router.get('/detail', shopController.product_detail_get);

// GET /byCategory
router.get('/byCategory', shopController.product_getByCategory_get);

router.get('/search', shopController.search_index_get);
// GET /bystore
router.get('/bystore', shopController.product_getByStore_get);

module.exports = router;


