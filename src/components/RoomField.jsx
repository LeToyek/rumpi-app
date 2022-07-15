import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const RoomField = () => {
  const {
    setIsOpenModal,
    getRoomData,
    rooms,
    getRealTimeRooms,
    userData,
  } = useAppContext();
  useEffect(() => {
    getRoomData();
  }, [rooms]);
  useEffect(() => {
    getRealTimeRooms();
  }, []);
  return (
    <div className="room-field">
      <UserField Username={userData?.Username} />
      <div className="rooms-wrapper">
        {rooms && rooms.map((r) => <RoomContainer key={r.id} {...r} />)}
      </div>

      <button onClick={() => setIsOpenModal(true)}>+</button>
    </div>
  );
};
const UserField = ({ Username }) => {
  return (
    <div className="user-field">
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/male-avatar-4329875-3599686.png"
        alt="avatar"
      />
      <h3>{Username}</h3>
    </div>
  );
};
const RoomContainer = ({ id, name }) => {
  const { setChatRoomID } = useAppContext();
  return (
    <div
      className="room-container"
      onClick={() => {
        setChatRoomID(id);
      }}
      // style={{backgroundColor: isActive? "#bb86fc" : "#1e2021"}}
    >
      <h3>{name}</h3>
    </div>
  );
};

export default RoomField;
