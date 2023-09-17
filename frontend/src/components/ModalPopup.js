import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import InputField from "./InputField";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"
import "../styles/login.css";
import AuthContext from "./AuthContext";

export const ModalPopup=(props)=>{
   const [show, setShow] = useState(false);
  // const year = new Date().getFullYear()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(event.target);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    let response = null;
    console.log(inputs);
    if(!isLoggedIn){   
    response = await fetch(`http://localhost:7050/Login/loginUser?email=${inputs.email}&password=${inputs.password}`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputs.email,
        password:inputs.password
      }),
      credentials: 'include', // Add this line
    });
    console.log(response);
    if(response.ok){
      setIsLoggedIn(true);
      const responseData = await response.json();
      localStorage.setItem("token", responseData.tokenString);
      console.log(responseData)
      setError("");
      handleClose();
    }
    else{
      setError("Invalid email or password!");
    }
  }
  else{
    console.log("Set to logout please")
    setIsLoggedIn(false);
  }
   
  };

  const handleLoginStatus = () =>{
     if(!isLoggedIn){
      handleShow();
     }
     else{
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      handleClose();
     }
  }
  

  return (
    <>
        <div>
        <Button variant="primary" onClick={handleLoginStatus}>
             {isLoggedIn ? "Logout" : "Login"}
        </Button>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form className="login" onSubmit={handleSubmit}>
              <InputField
                type="email"
                value={inputs.value}
                onChange={handleChange}
                name="email"
              />
              <InputField
                type="password"
                value={inputs.value}
                onChange={handleChange}
                name="password"
              />
  
              <div className="form-group mb-3" control-id="formBasicCheckbox">
                <p className="small">
                  <a className="text-primary" href="#!">
                    Forgot password?
                  </a>
                </p>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="d-flex justify-content-center">
                <button className="btn btn" type="submit">
                  Login
                </button>
              </div>
            </form>
  
            <div className="mt-3">
              <p className="mb-0 text-center">
                Don't have an account? <br></br>
                <button className="text-primary fw-bold" onClick={()=> {navigate("/register")}}>
                  Sign Up
                </button>
              </p>
            </div>
            <br />
            <br />
            <p>© FinLead team 2023</p>
          </div>
        </Modal.Body>
      </Modal>
      </div>


      
    </>
  );

}
