import React, {useState} from "react";
import InputField from "../components/InputField";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button"
import "../styles/login.css";

export const Register=(props)=>{
  const [show, setShow] = useState(false);
  const year = new Date().getFullYear()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
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
        <div className="loginContainer">
        <img src="Title.png" alt="Title"></img>
        <br></br>
        <br></br>
                <form onSubmit={""} className="login">
                <InputField type="email" placeholder="email"/>
                <InputField type="password" placeholder="password"/> 
                <div className="form-group mb-3" control-id="formBasicCheckbox">
            <p className="small">
              <a className="text-primary" href="#!">
                Forgot password?
              </a>
            </p>
          </div>
            <button className="btn btn" type="submit">
              Login
            </button>
          
                </form>
                <div className="mt-3">
          <p className="mb-0  text-center">
            Don't have an account?{" "} <br></br>
            <a href="{''}" className="text-primary fw-bold">
              Sign Up
            </a>
          </p>
        </div>
        <br/>
        <p>© FinLead team {year}</p>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );

}
