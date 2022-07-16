import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const RoomField = () => {
  const {
    setIsOpenModal,
    getRoomData,
    rooms,
    getRealTimeRooms,
    userData,
    setIsLoading
  } = useAppContext();
  useEffect(() => {
    getRoomData();
  }, [rooms]);
  useEffect(() => {
    setIsLoading(true)
    getRealTimeRooms();
    setIsLoading(false)
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
    >
      <h3>{name}</h3>
    </div>
  );
};

export default RoomField;
