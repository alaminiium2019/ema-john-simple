import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () => {
        const product = {}
        fetch('https://ema-john--server.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(product)
        })
        alert('Successfully Inserted')
    }

    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text" className="form-control"/></p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity:</span><input type="text"/></p>
                <p><span>Product Image:</span><input type="file"/></p>

            <button onClick={handleAddProduct}>Add Product</button>
            </form>
           
        </div>
    );
};

export default Inventory;