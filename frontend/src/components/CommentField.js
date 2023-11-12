import React, {Fragment, useContext, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/user.css"
// import AuthContext from "./AuthContext";
// import { ModalPopup } from "./ModalPopup";
import { faLocationDot, faCalendarDays, faComment, faShareSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
export const CommentField = (props) =>{
  return (
    <Fragment>
      <div className="post-container">
      <img src="/userPicture.png"/>
                <div className="comment">
                    <div className="user-details">
                        <strong><a href={`profile/${props.userName}`}>{props.userName}</a></strong>
                        <span>14/12/2022 8:32 PM</span>
                    </div>
                    <p className="stock-name">$MSFT <strong>$120</strong></p>
                    <p className="comment-text">This stock is gonna crash so hard lol goodbye</p>
                </div>
                <div className="post-icons">
                <div className="post-icons-icon">
                <FontAwesomeIcon icon={faComment}/>
                <p>3</p>
                </div> 
                <div className="post-icons-icon">
                <FontAwesomeIcon icon={faHeart}/>
                <p>10</p>
                </div>
                <div className="post-icons-icon">
                <FontAwesomeIcon icon={faShareSquare}/>
                <p>8</p>
                </div>                   
                </div>
      </div>
    </Fragment>
  )
}

// export const CommentField=(props) =>{
//     const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
//     const [isExpanded, setExpanded] = useState(false);
//     const [modalVisible, setModal] = useState(false);
//     const [comment, setComment] = useState("");
//     console.log("min ticker er " + props.ticker);

//     function handleClick(){
//         console.log("isLoggedIn: ", isLoggedIn);
//         if(isLoggedIn){
//        setExpanded(true);
//        }
//        else{
//         setModal(true);
//        }
//     }
//     const handleChange = (event) => {
//         const value = event.target.value;
//         console.log(value);
//         setComment(value);
//         console.log(comment);
//       };

//     const handleSubmit = async(event) =>{
//        event.preventDefault();
//        let response = null;
//        const commentObject ={
//          content: comment,
//          user: "abe",
//          tickerRef: props.ticker,
//        };
//        response = await fetch(`http://localhost:4000/api/postComment/${props.ticker}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(commentObject),
//        })
//        if(response.ok){
//         const responseData = await response.json();
//         console.log(responseData);
//         // Trigger re-render of Stock component by updating comments state
//         props.setComments((prevComments) => [...prevComments, responseData]);
//        } else{
//         console.log("Den gik sgu ikke");
//        }
//        setExpanded(false);
//        setComment('');
//     }

//     return (
//         <>
//             <div style={{backgroundColor:"lightblue"}}>
//              <button onClick={handleClick}>Comment</button>
//              {isExpanded &&(
//                    <div>
//                     <form onSubmit={handleSubmit}>
//                     <textarea name="content" placeholder="write your comment here..." onChange={handleChange}></textarea>
//                     <br></br>
//                     <button type="submit">Post</button>
//                     </form>
//                     </div>
//                     )
//                 }
//             {modalVisible && (
//                 <ModalPopup></ModalPopup>
//             )}
//             </div>
//         </>
//     )
// }