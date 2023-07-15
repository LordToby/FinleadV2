import React, {useState} from "react";
import "../styles/user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
  } from "@fortawesome/free-solid-svg-icons";

export const CommentBox =(props)=>{

  const [content, setContent] = useState(props.content);
  
  const [isEditField, setEditField] = useState(false);

  const[likes, setLikes] = useState(props.likes);

  const handleUpdate = async(event)=>{
    event.preventDefault();
    console.log(content);
    setEditField(false);
    let response = null;
    response = await fetch(`http://localhost:4000/api/updateComment/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
       })
       if(response.ok){
        console.log("Det gik godt!");
       }
       else{
        console.log("Response kom galt af sted!");
       }
  }

  const incrementLike= (event)=>{
     setLikes(likes +1);
     console.log(likes);
  }

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);
    setContent(value);

  };

  return (
    <div className="comment-box">     
    
    <div className="user-pic-container">
            <img className="user-pic" src="/userPicture.png"/>
            
        </div>
        <div className="post-content">
        <a href="#">{props.userName}</a> 
        {isEditField ? (
          <form onSubmit={handleUpdate}>
           <textarea onChange={handleChange}>{content}</textarea>
           <button type="submit">Save</button>
           </form>
        ): (<p style={{paddingTop: "1%"}}>{content}</p>        
        )}
        </div>
        <div className="bottom-row">
        {/* <span className="bottom-item">👍</span>     */}
        <span className=" bottom-item post-like" onClick={incrementLike}>{likes} </span>
        <span className="bottom-item">Reply</span> 
        <span className="bottom-item post-date">{props.date}</span>
        </div>
        <hr></hr>
        <div className="comment-options">        
        <button onClick={()=>setEditField(true)}>Edit</button>  
        <button style={{marginLeft:"2%"}}>Delete</button>
        </div>
    </div>
  )
}