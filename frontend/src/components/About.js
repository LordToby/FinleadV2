import React, { useEffect, useState, useContext } from "react";
import "../styles/navbar.css"
import useSocketModule from './shared/SocketModule';


function About() {
  
    const[users, setUsers] = useState([]);

    const { connection } = useSocketModule();

    //Eksempel på REST API kald
    const fetchUsers = async() =>{
        try{
            const response = await fetch(`http://localhost:7050/Person/person`,
            {
                         method: "GET",
                         headers: {
                           "Content-Type": "application/json",
                         },
                         cache: "default",
                       }
            );
            const responseData = await response.json();
            console.log(responseData);
            setUsers(responseData)

        }
        catch(error){
            console.log(error);
        }
    }

    //Websocket besked eksempel
    const sendData = async() => {
          const person = {
            firstName: "Tintin",
            lastName: "Tinsen",
            country: "Belgium",
           }
           console.log("Så sender vi dig af sted, din lille lort!");
         await connection.invoke("SendData", person);
        
        }

    useEffect(()=>{
      if (connection) {
        connection.invoke("SendMessage", "Hello from client");
      }
        fetchUsers();
    }, [])

    return (
        <div style={{backgroundColor: "white"}}>
               {users.map((user, index)=>(
                 <div key={index}>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p>{user.country}</p>
                 </div>   
               ))}
               <button onClick={sendData} style={{backgroundColor:"green"}}>Klik på mig din spade</button>
        </div>
    )
}


export default About;