import React, {useContext, useState} from "react";
import AuthContext from "./AuthContext";
import { ModalPopup } from "./ModalPopup";
//import { io } from "socket.io-client";

//const socket = io("http://localhost:4000")

export const CommentField=(props) =>{

    //const { userState, setUserState } = useContext(AuthContext);
    const [isExpanded, setExpanded] = useState(false);
    const [modalVisible, setModal] = useState(false);
    const [comment, setComment] = useState("");
    //console.log("min ticker er " + props.ticker);
    //console.log("For min context er bruger " + userState.userReference);

    // function handleClick(){
    //     if(userState.isLoggedIn){
    //    setExpanded(true);
    //    }
    //    else{
    //     setExpanded(false);
    //    }
    // }
    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value);
        setComment(value);
        console.log(comment);
      };


    const handleSubmit = async(event) =>{
       event.preventDefault();
       const messageObject = {tickerRef: props.ticker, comment:comment, user: userState.userReference, parent: null};
       socket.emit("comment", messageObject)
       setExpanded(false);
       setComment('');
    }


    return (
        <>
            <div style={{backgroundColor:"lightblue"}}>
             <button onClick={handleClick}>Comment</button>
             {isExpanded &&(
                   <div>
                    <form onSubmit={handleSubmit}>
                    <p hidden name="user">{userState.userReference}</p>
                    <textarea name="content" placeholder="write your comment here..." onChange={handleChange}></textarea>
                    <br></br>
                    <button type="submit">Post</button>
                    </form>
                    </div>
                    )
                }
            {modalVisible && (
                <ModalPopup></ModalPopup>
            )}
            </div>
        </>
    )
}