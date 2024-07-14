import React from 'react'
import Rating from './Rating'
import "../styles/Product.css"
import { Link } from 'react-router-dom'


const Product = ({product}) => {

    return (
        <Link to={`/products/product/${product._id}`}>
        <div className="product-card" id="pbr">
            <div className="product-image">
                <img src= {product.image} alt=""/>
            </div>
            <h2>{product.name}</h2>
            <Rating rating={product.rating} numRev={product.numRev}/>
            <p id="pbrp">${product.price}</p>
        </div>
        </Link>
    )
}

export default Product
