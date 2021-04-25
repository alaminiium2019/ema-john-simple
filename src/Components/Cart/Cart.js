import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    
    const cart = props.cart;

    //const totalPrice = cart.reduce((total, prd) => total + prd.price,0);

    let total = 0;
    for(let i =0;i<cart.length;i++){
        const product = cart[i];
        total = (total + product.price * product.quantity);
    }
    const totalPrice = total;

    //Shipping 

    let shipping = 0;
    if(totalPrice>35){
        shipping =0;
    }else if(totalPrice>15){
        shipping = 3.5
    }
    //Tax
    const tax = (totalPrice /10).toFixed(2);

   const subTotal = (totalPrice+shipping+ Number(tax)).toFixed(2);
  

   //Number format
   const formatNumber = num => {
       const precision = num.toFixed(2);
       return Number(precision);
   }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Price: {formatNumber(totalPrice)}</p>
            <p>Shipping cost: {shipping}</p>
            <p>Tax (VAT): {tax}</p>
            <p>Sub Total: {subTotal}</p>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;