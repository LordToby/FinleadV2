import React, {Fragment, useState} from "react";
import InputField from "../components/InputField";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"
import "../styles/login.css";

export const Register=()=>{

  const createUser = async (event) => {
    console.log("Hejsa")
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.psw.value;
    console.log(email, username, password);

    // let response = null;
    // response = await fetch(`http://localhost:7050/Login/loginUser?email=${inputs.email}&password=${inputs.password}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: inputs.email,
    //     password:inputs.password
    //   }),
    //   credentials: 'include', // Add this line
    // });

  }

  return (
    <Fragment>
    <div className="register-form">
    <form onSubmit={createUser}>
    <label><b>Email</b></label> 
    <input type="text" placeholder="Enter Email" name="email" required/> 
    
    <label><b>Username</b></label>
    <input type="text" placeholder="enter your username" name="username" required/>

    <label><b>Password</b></label> 
    <input type="password" placeholder="Enter Password" name="psw" required/> 
    {/* <label>
      <input type="checkbox" checked="checked" name="remember"/> Remember me 
    </label> <br/> */}
    <button type="submit">Så kører vi!</button>
    </form>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
    </div>
    </Fragment>
  );

}
