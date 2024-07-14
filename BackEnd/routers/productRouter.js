import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'
import {products} from '../products.js'

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async(req,res) => {
    const createdProducts = await Product.insertMany(products);
    res.send( {createdProducts} );
}))

productRouter.post('/add', expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, pdffile, image, brand, category, description, price, stock = 100, rating = 0, numRev = 0  } = req.body;

    const product = new Product({
        name,
        pdffile,
        image,
        brand,
        category,
        description,
        price,
        stock,
        rating,
        numRev
    });
    const createdProduct = await product.save();
    res.status(201).json({ message: 'Product Created Successfully', product: createdProduct });
}));


// Update a review by ID
productRouter.put('/rating/:id', expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { rating, numRev } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.rating = rating;
        product.numRev = numRev;
        const updatedProduct = await product.save();
        res.send({ message: 'Rating Updated Successfully', product: updatedProduct });
    } else {
        res.status(404).send({ message: "Review not found." });
    }
}));

productRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: "Product not found."});
    }
}))

// Update a product by ID
productRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const { name, image, description, category, brand, price } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.image = image;
        product.description = description;
        product.category = category;
        product.brand = brand;
        product.price = price;

        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated Successfully', product: updatedProduct });
    } else {
        res.status(404).send({ message: "Product not found." });
    }
}));

// Delete a product by ID
productRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.send({ message: 'Product Deleted Successfully' });
    } else {
        res.status(404).send({ message: "Product not found." });
    }
}));

export default productRouter;