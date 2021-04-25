import React from 'react';
import {useForm} from 'react-hook-form';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import './Shipment.css';


const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);  
    const {register,handleSubmit,watch,errors} = useForm();

    const onSubmit = data =>{
        console.log("Example");
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