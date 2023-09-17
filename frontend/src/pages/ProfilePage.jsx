import "../styles/user.css"

import { React } from "react";
import { useParams } from "react-router-dom";
export const ProfilePage = () => {
  const { name } = useParams();
  return (
    <div>
      {/* <h1>Hello {name}</h1> */}
      <div className="userBox">
        <img src="/userPicture.png" width="40%" height="60%"/>
        <div>
          <p><strong>{name}</strong></p>
          <p>14 folowers, 40 following</p>
        </div>
      </div>
      <hr/>
      <div className="location-info">
        <p>Denmark</p>
        <p>Created 07/12/2024</p>
      </div>
    </div>
  );
};
