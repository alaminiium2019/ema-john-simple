import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../../App";
import img from "../../images/logo.png";
import { handleSignout } from "../Login/LoginManager";
import "./Header.css";



const Header = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  
  return (
    <div className="header">
      <img src={img} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/manage">Manage Inventory</Link>
        <Link to="#" style={{color:'red'}}>{loggedInUser.email}</Link>
        <button onClick={() => setLoggedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
