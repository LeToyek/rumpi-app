import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AddRoomPopUp from '../components/AddRoomPopUp'
import ChatField from '../components/ChatField'
import LoadingSection from '../components/LoadingSection'
import RoomField from '../components/RoomField'
import { useAppContext } from '../context/AppContext'

const ChatPage = () => {
  const {isOpenModal,isLoading,getUserById,setIsLoading} = useAppContext()
  const history = useHistory()
  useEffect(()=>{
    setIsLoading(true)
    setTimeout(() => {
      getUserById()
    }, 1500);
  },[])
  return localStorage.getItem("user_id") === null ? history.push("/login") : (isLoading ? <LoadingSection/> : (
    <div className='chat-page'>
      {isOpenModal? <AddRoomPopUp/> : null}
      <RoomField/>
      <ChatField/>
    </div>
  ))
}

export default ChatPage