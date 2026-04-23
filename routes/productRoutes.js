const express = require('express');
const router = express.Router();
const { createProduct, getProducts,getProduct } = require('../controllers/productController');

// This handles GET /api/products AND POST /api/products
router.route('/')
    .get(getProducts)
    .post(createProduct); // <--- Make sure this line exists!

router.route('/:id')
    .get(getProduct);

module.exports = router;