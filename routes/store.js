const express = require('express');
const router = express.Router();
const isLoggedin = require('../helper/isLoggedIn');
const isRoleSeller = require('../helper/isRoleSeller');
const shopController = require('../controllers/store');
const upload = require('../helper/multerUploader');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// POST /create
router.post('/create', isLoggedin, isRoleSeller, shopController.store_create_post);

// POST /edit
router.post('/edit', isLoggedin, isRoleSeller, upload.single('file'), shopController.store_edit_post);

// GET /delete
router.get('/delete', isLoggedin, isRoleSeller, shopController.store_delete_get);

// GET /all
router.get('/all', shopController.store_getAll_get);

// GET /detail
router.get('/detail', shopController.store_detail_get);

module.exports = router;


