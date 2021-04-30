import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';


const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct]= useState({});

    useEffect(() => {
        
        fetch('https://ema-john--server.herokuapp.com/product/'+id)
        .then(res => res.json())
        .then(data => setProduct(data))

    },[id])

    // const products = product.find(pd => pd.key === id)

    console.log(product);
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;