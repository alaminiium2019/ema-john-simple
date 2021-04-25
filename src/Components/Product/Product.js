import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const { name, price, img, seller, stock,key } = props.product;

  return (
    <div className="product">
      <div>
        <img src={img} />
      </div>
      <div>
        <h2 className="product-name"><Link to={'/product/'+key}>{name}</Link> </h2>
        <p>By: {seller}</p>
        <h5>Price: ${price}</h5>
        <br />
        <p>Only {stock} left in stock - Order soon </p>
        {props.showAddToCart && 
          <button className="main-button" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Add To Cart</button>}
      </div>
    </div>
  );
};

export default Product;
