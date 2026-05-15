const express = require('express');
const router = express.Router();
const { createProduct, getProducts,getProduct ,getProductStats} = require('../controllers/productController');

// This handles GET /api/products AND POST /api/products
router.route('/')
    .get(getProducts)
    .post(createProduct); // <--- Make sure this line exists!

// Specific routes must come BEFORE generic :id routes
router.get('/product-stats', getProductStats);

router.route('/:id')
    .get(getProduct);

module.exports = router;