import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../../App";
import { handleGoogleSignIn, initializeLoginFramework,handleSignout, createUserWithemailandpassord, signInwithEmailandPassword } from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSigneddIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //redirect
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  //redirect
  const googleSignIn = () => {
   handleGoogleSignIn()
   .then(res => {
    handleResponse(res,true)
   })
  }

  //handle signout
  const signout = () => {
    handleSignout()
    .then(res => {
      handleResponse(res,false);
    })
  }

  //handleResponse
  const handleResponse = (res,redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);

    }
  }
  //handleOnchange
  const handleChange = (e) => {
    let isFieldValid = true;

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  //handleSubmit form
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithemailandpassord(user.name, user.password)
      .then (res => {
        setUser(res);
        setLoggedInUser(res);
      })
    }
    if (!newUser && user.email && user.password) {
      signInwithEmailandPassword(user.email, user.password)
      .then (res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);  //after sign in to redirect
      })
    }

    e.preventDefault();
  };

  //

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSigneddIn ? (
        <button onClick={signout}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}

      <button>Login in with facebook</button>

      <div>
        <h2>Sign Up form</h2>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label>New User Sign up</label>
        <form onSubmit={handleSubmit}>
          {newUser && (
            <input
              type="text"
              name="name"
              type="text"
              onBlur={handleChange}
              placeholder="Enter your name"
              id=""
            />
          )}
          <br />
          <input
            type="text"
            name="email"
            onBlur={handleChange}
            placeholder="Enter your email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onBlur={handleChange}
            placeholder="Enter your password"
            required
          />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            User {newUser ? "created" : "logged in"} successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
