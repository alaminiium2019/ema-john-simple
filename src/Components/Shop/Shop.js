import React, { useEffect } from "react";
import { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  // const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(()=>{
    fetch('https://ema-john--server.herokuapp.com/products')
    .then(res => res.json())
    .then(data => setProducts(data))

  },[])


  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('https://ema-john--server.herokuapp.com/productsByKeys' ,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))

  //  if(products.length){
  //   const previousCart = productKeys.map(existingKey => {
  //     const product = products.find(pd => pd.key === existingKey);
  //     product.quantity = savedCart[existingKey];
  //     return product;
  //   })
  //   setCart(previousCart)
  //  }
  },[]);



  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;

    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            product={product}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
        <Link to="/review"><button className="main-button">Review Order</button></Link>
      </div>
    </div>
  );
};

export default Shop;
