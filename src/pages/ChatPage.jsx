import React from 'react'
import AddRoomPopUp from '../components/AddRoomPopUp'
import ChatField from '../components/ChatField'
import LoadingSection from '../components/LoadingSection'
import RoomField from '../components/RoomField'
import { useAppContext } from '../context/AppContext'

const ChatPage = () => {
  const {isOpenModal,isLoading} = useAppContext()
  return isLoading ? <LoadingSection/> : (
    <div className='chat-page'>
      {isOpenModal? <AddRoomPopUp/> : null}
      <RoomField/>
      <ChatField/>
    </div>
  )
}

export default ChatPage