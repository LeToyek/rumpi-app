import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const RoomField = () => {
  const {openPopUp} = useAppContext()
  return (
    <div className="room-field">
      <UserField />
      <RoomContainer />
      <RoomContainer />
      <button onClick={()=> openPopUp(true)}>+</button>
    </div>
  );
};
const UserField = () => {
  return (
    <div className="user-field">
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-4329875-3599686.png"
        alt="avatar"
      />
      <h3>Toyek</h3>
    </div>
  );
};
const RoomContainer = () => {
  const [isActive, setisActive] = useState(false);
  return (
    <div 
    className="room-container" 
    onClick={() => setisActive(!isActive)}
    // style={{backgroundColor: isActive? "#bb86fc" : "#1e2021"}}

    >
      <h3>Room 1</h3>
    </div>
  );
};


export default RoomField;
