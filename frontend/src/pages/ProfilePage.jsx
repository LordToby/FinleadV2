import "../styles/user.css"

import { Fragment, React } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Feed } from "./Feed";
import { faLocationDot, faCalendarDays, faComment, faShareSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
export const ProfilePage = () => {
  const { name } = useParams();
  return (
    <Fragment>
      {/* <h1>Hello {name}</h1> */}
      <div className="userPage">
        {/* <div className="user-picture">
        
        </div> */}
        <div className="name-info">
        <img src="/userPicture.png"/>
         <div className="name-info-text">
         <p>{name}</p>
          <p>14 folowers, 40 following</p>
         </div>
          
        </div>
        <div className="location-info">
        <div className="location-icon">
        <FontAwesomeIcon icon={faLocationDot}/>       
        <p>Denmark</p>
        </div>
        <div className="location-icon">
        <FontAwesomeIcon icon={faCalendarDays}/>
        <p>Created 07/12/2024</p>
        </div>
      </div>
      <p>Interested in gold mining and short term trades</p>
      <Feed/>
      </div>
      <br/>
      
     
    </Fragment>
  );
};
