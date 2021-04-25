import React from "react";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link, useHistory } from "react-router-dom";
import happyImage from '../../images/giphy.gif';


const Review = () => {
  const [cart, setCart ] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();


  const handleProceedCheckout = () => {
    history.push('/shipment');


  }

  const handleRemoveProduct = (productkey) =>{
    const newCart = cart.filter(pd => pd.key !== productkey);
    setCart(newCart);
    removeFromDatabaseCart(productkey);


  }

  useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);

      const cartProducts = productKeys.map( key => {
          const product = fakeData.find( pd => pd.key === key);
          product.quantity = savedCart[key];
          return product;
      });

      setCart(cartProducts);
   
    },[]);
  

    let thankyou;
    if(orderPlaced){
      thankyou = <img src={happyImage}/>
    } 

  return (
    <div className="shop-container">
      <div className="product-container">
      {
          cart.map(pd => <ReviewItem key={pd.key} product={pd} removeProduct={handleRemoveProduct}></ReviewItem>)
      }
      <br/>
      {
        thankyou 
      }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
        <button onClick={handleProceedCheckout} className="main-button" style={{width:'200px'}}>Proceed Checkout</button>
        </Cart>
      </div>

    </div>
  );
};

export default Review;
