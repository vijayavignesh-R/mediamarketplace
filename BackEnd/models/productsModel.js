import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
{
    name: {type: String, required: true, unique: true},
    pdffile: {type: String, required: false},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: false},
    rating: {type: Number, required: false},
    numRev: {type: Number, required: false},
},
{
    timestamps: true,
}
);


const Product = mongoose.model("Product", productSchema);

export default Product;