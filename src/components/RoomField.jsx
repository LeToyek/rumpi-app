import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const RoomField = () => {
  const {
    setIsOpenModal,
    isOpenModal,
    rooms,
    getRealTimeRooms,
    isShowRoom,
    userData,
    setIsLoading
  } = useAppContext();

  useEffect(() => {
    setIsLoading(true)
    getRealTimeRooms();
    setIsLoading(false)
  }, []);
  return (
    <div className="room-field" style={{display: window.innerWidth <500 ? isShowRoom?"flex":"none":"flex"}}>
      <UserField Username={userData?.Username} />
      <div className="rooms-wrapper">
        {rooms && rooms.map((r) => <RoomContainer key={r.id} {...r} />)}
      </div>

      <button onClick={() => {
        setIsOpenModal(true)
        console.log(isOpenModal)
        }}>+</button>
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
  const { setChatRoomID,setIsShowRoom } = useAppContext();
  return (
    <div
      className="room-container"
      onClick={() => {
        setChatRoomID(id);
        setIsShowRoom(false)
      }}
    >
      <h3>{name}</h3>
    </div>
  );
};

export default RoomField;
