import React, {useState, useContext, useEffect} from "react";
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
  const { userState, setUserState } = useContext(AuthContext);
  console.log(userState);
  const navigate = useNavigate();
   
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
   

  useEffect(() => {
    console.log(userState);
  }, [userState]);

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
    if(!userState.isLoggedIn){   
    response = await fetch(`http://localhost:4000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
      credentials: 'include', // Add this line
    });
    if(response.ok){
      const responseData = await response.json();
      console.log(responseData)
      setUserState({
        userReference:responseData.userName,
        isLoggedIn: true
      })
      console.log(userState.userReference);
      console.log(responseData);
      await setCookie("UserCookie", "True", 30).then((res) => {
        console.log("Got in setCookie");
      })
      //console.log(responseData);
      // setTimeout(() => {
      //   navigate("/about");
      // }, 1000);
      //navigate("/about");
      setError("");
      handleClose();
    }
    else{
      setError("Invalid email or password!");
    }
  }
  else{
    response = await fetch("http://localhost:4000/api/logout",  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include', // Add this line
          });
          if(response.ok){
            setUserState({
              userReference:"",
              isLoggedIn:false
            });
            console.log(userState);
          }
  }

  async function setCookie(cname, cvalue, exdays) {
    console.log("Got in set cookie");
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log(getCookie(cname));
  }
  
  async function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
   
  };

  return (
    <>
      {!userState.isLoggedIn ? (
        <div>
        <Button variant="primary" onClick={handleShow}>
             {userState.isLoggedIn ? "Logout" : "Login"}
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
              <p className="mb-0  text-center">
                Don't have an account? <br></br>
                <a href="{''}" className="text-primary fw-bold">
                  Sign Up
                </a>
              </p>
            </div>
            <br />
            <br />
            <p>© FinLead team 2023</p>
          </div>
        </Modal.Body>
      </Modal>
      </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Button type="submit" variant="primary">{userState.isLoggedIn ? "Logout" : "Login"}</Button>
          </form>
        </div>
      )}
  
      
    </>
  );

}
