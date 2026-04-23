import Product from '../models/Product.js';

// Use 'export' before the function
export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('reviews');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id).populate('reviews');  
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}