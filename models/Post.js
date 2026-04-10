const mongoose=require('mongoose')
const Category=require('./Category')
const PostSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        type:String,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model('Post',PostSchema)