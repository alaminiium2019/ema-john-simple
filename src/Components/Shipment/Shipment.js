import React from 'react';
import {useForm} from 'react-hook-form';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';


const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);  
    const {register,handleSubmit,watch,errors} = useForm();


    const onSubmit = data =>{
        
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products:savedCart, shipment:data, orderTime: new Date()};

        fetch('https://ema-john--server.herokuapp.com/addOrder',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder()
                alert("Your Ordr placed Successfully")
                console.log("Submitted")
            }
        })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='ship-form'>
            
            <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="your name" />
            <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="your email" />
            <input {...register("address", { required: true })} placeholder="your address" />
            <input {...register("phone", { required: true })} placeholder="your phone number" />  

        <input type="submit" />
      </form>
    );
};

export default Shipment;