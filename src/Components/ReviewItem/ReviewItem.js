import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,img,key,price} = props.product;

    const reviewItemStyle ={
        borderBottom:'2px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }

    return (
        <div style={reviewItemStyle}>
            <img src={img}/>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <br/>
            <button className="main-button" onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;