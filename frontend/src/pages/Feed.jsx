import "../styles/user.css"

import { Fragment, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { faLocationDot, faCalendarDays, faComment, faShareSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
export const Feed = () =>{
    return(
        <Fragment>
            <div className="feed-table">
                <div className="tabs">
                    <p>Posts</p>
                    <p>Replies</p>
                    <p>Liked</p>
                </div>
                <div className="post-container">
                <img src="/userPicture.png"/>
                <div className="comment">
                    <div className="user-details">
                        <strong>@DamnDaniel</strong>
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
                <div className="post-container">
                <img src="/userPicture.png"/>
                <div className="comment">
                    <div className="user-details">
                        <strong>@DamnDaniel</strong>
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
            </div>
        </Fragment>
    )
}