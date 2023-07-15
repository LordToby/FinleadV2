import React,{useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"
import AuthContext from "./AuthContext";
import "../styles/login.css";

export const LogOutButton = (props)=>{
   // const [loggedIn, setLogStatus] = useState(true);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
          console.log("logout response is:" , response);
        if(response.ok){
            setIsLoggedIn(false);
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handleSumbit}>
                      <Button type="submit" className="logout-button">Logout</Button>
                </form>
            </div>
        </>
    )

    

}