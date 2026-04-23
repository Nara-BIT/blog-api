const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Linking to the Product
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to a product.']
  },
  // Linking to the User who wrote it
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user.']
  }
}, {
  // These two lines are CRUCIAL for Virtual Populate to work
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// INDEXING: This makes searching for reviews for a specific product 100x faster
reviewSchema.index({ product: 1 });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;