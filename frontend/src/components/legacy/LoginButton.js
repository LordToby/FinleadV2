import React,{useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import AuthContext from "./AuthContext";
import "../styles/login.css";

export const LoginButton = (props)=>{
   // const [loggedIn, setLogStatus] = useState(true);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSumbit = async(event)=>{
        console.log(event);
        event.preventDefault();
        const response = await fetch("http://localhost:4000/api/logout",  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
           // body: JSON.stringify(inputs),
          });
          console.log(response);
        if(response.ok){
            setIsLoggedIn(false);
            navigate("/main");
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handleSumbit}>
                      <Button type="submit">{isLoggedIn ? "Logout": "Login"}</Button>
                </form>
            </div>
        </>
    )

    

}