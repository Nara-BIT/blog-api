import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    }
}, {
    // This allows the "reviews" virtual to show up in Postman
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// The "Virtual Populate" configuration
productSchema.virtual('reviews', {
    ref: 'Review',          // Link to the Review model
    foreignField: 'product', // The field in Review.js that holds the Product ID
    localField: '_id'        // The field in Product.js (this file) to match
});

const Product = mongoose.model('Product', productSchema);

// Modern export syntax
export default Product;