import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';


const ProductDetails = () => {
    const {id} = useParams();

    const product = fakeData.find(pd => pd.key === id)

    console.log(product);
    return (
        <div>
            <h2>{id}</h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;