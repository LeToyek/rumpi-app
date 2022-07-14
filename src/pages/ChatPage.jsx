import React from 'react'
import AddRoomPopUp from '../components/AddRoomPopUp'
import ChatField from '../components/ChatField'
import RoomField from '../components/RoomField'
import { useAppContext } from '../context/AppContext'

const ChatPage = () => {
  const {isOpenModal} = useAppContext()
  console.log(isOpenModal)
  return (
    <div className='chat-page'>
      {isOpenModal? <AddRoomPopUp/> : null}
      <RoomField/>
      <ChatField/>
    </div>
  )
}

export default ChatPage