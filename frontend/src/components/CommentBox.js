// import React, {Fragment, useState, useContext, useEffect} from "react";
// import AuthContext from "./AuthContext";
// import { CommentField } from "./CommentField";
// import "../styles/user.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faUserCircle,
//   } from "@fortawesome/free-solid-svg-icons";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000")

// export const CommentBox =(props)=>{

//   const [content, setContent] = useState(props.content);
//   const { userState, setUserState } = useContext(AuthContext);
//   const id = props.id;
//   const [isEditField, setEditField] = useState(false);
//   const [likes, setUserLikes] = useState(props.likes);
//   const[replies, setReplies] = useState([])

//   const[replyActive, setReply] = useState(false); 


//   useEffect(() => {
//     getReplies();
//     const user = userState.userReference;
//     const userLikesComment = props.likes.includes(user);
//     setUserLikes(userLikesComment);
//   }, [props.likes, userState.userReference]);

//   const handleUpdate = async(event)=>{
//     event.preventDefault();
//     setEditField(false);
//     let response = null;
//     let objectToPass ={id: id, content: content}
//     response = await fetch(`http://localhost:4000/api/updateComment/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(objectToPass),
//        })
//        if(response.ok){
//         console.log("Det gik godt!");
//        }
//        else{
//         console.log("Response kom galt af sted!");
//        }
//   }

//   const getReplies = async()=>{
//     try{
//       const response = await fetch(`http://localhost:${4000}/api/replies/${id}`, {
//         method:"GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         cache: "default",
//       });
//       const responseData = await response.json();
//       setReplies(responseData);
//     } catch(error){
//       console.log(error);
//     }
//   }

//   const handleDelete = async(event)=>{
//     event.preventDefault();
//     let response = null;
//     console.log("For denne her er id " + id);
//     let objectToPass ={id: id}
//     response = await fetch(`http://localhost:4000/api/deleteComment/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(objectToPass),
//     })
//     console.log(response);
//     if(response.ok){
//       console.log("Det lykkedes");
//     }
//     else{
//       console.log("Nej det gjorde ej!");
//     }

//   }


//   const setLkes = (event)=>{
//      const user = userState.userReference;
//      console.log(props.likes.includes(user));
//      const operation = props.likes.includes(user) ? "removeLike": "addLike"
//      const message = {user: user, comment: id, operation: operation};
//      socket.emit("updateLike", message);
     
//      setUserLikes(!likes);
//   }

//   const handleChange = (event) => {
//     event.preventDefault();
//     const value = event.target.value;
//     setContent(value);

//   };

//   const reply = async(event) => {
//      event.preventDefault();
//      const content = event.target[0].value;
//      const commentObject ={
//       comment: content,
//       user: userState.userReference,
//       tickerRef: props.ticker,
//       parent: id
//     };
//     socket.emit("comment", commentObject);
//     setReply(!replyActive);

//   }
    
//   // socket.on("likesUpdated", (comment)=>{
//   //   console.log(comment);
//   //   likesUpdate(comment.likes);
//   // });

//   return (
//     <Fragment>
//     <div className="comment-box">     
    
//     <div className="user-pic-container">
//             <img className="user-pic" src="/userPicture.png"/>
            
//         </div>
//         <div className="post-content">
//         <p hidden name="id">{props.id}</p>
//         <a href="#">{props.userName}</a> 
//         {isEditField ? (
//           <form onSubmit={handleUpdate}>
//            <textarea onChange={handleChange}>{content}</textarea>
//            <button type="submit">Save</button>
//            </form>
//         ): (<p style={{paddingTop: "1%"}}>{content}</p>        
//         )}
//         </div>
//         <div className="bottom-row">
//         {/* <span className="bottom-item">👍</span>     */}
//         <span className=" bottom-item post-like" onClick={setLkes}>{likes.length} </span>
//         <span className="bottom-item" onClick={() =>{setReply(!replyActive)}}>Reply</span> 
//         <span className="bottom-item post-date">{props.date}</span>
//         </div>
//         <hr></hr>
//         <div className="comment-options">        
//         <button onClick={()=>setEditField(true)}>Edit</button> 
//         <form onSubmit={handleDelete}>
//         <button type="submit"style={{marginLeft:"2%"}}>Delete</button>
//         </form>
       
//         </div>
       
//     </div>
//     {replyActive && (
//       <div className="reply-field">
//       <form onSubmit={reply}>
//         <textarea>
            
//         </textarea>
//         <button>Post reply</button>
//         </form>
//     </div>
//     )}
//     {replies.length > 0 && (
//           <div>
//           {replies.map((reply, index) => (
//             <div style={{backgroundColor: "lightblue", borderColor:"black", border:"solid"}} key={index}>
//             <span>User: {reply.userReference}</span>
//             <p>{reply.content}</p>
//             </div>
//           ))}
//           </div>
//         )}
    
//     </Fragment>
//   )
// }