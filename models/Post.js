const mongoose=require('mongoose')
const Category=require('./Category')
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    category: {
        type: String, // Or ObjectId if you kept it that way
        required: [true, 'Please add a category']
    },
    content: {
        type: String,
        required: [true, 'Please add some content']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    // ADD THIS RIGHT HERE 👇
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User' // This tells Mongoose which collection to look in
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Post',PostSchema)