import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const AddRoomPopUp = () => {
  const {createRoom,setIsOpenModal} = useAppContext()
  const [name,setName] = useState("")
  const onCreateRoom = (e) =>{
    e.preventDefault()
    createRoom(name)
    setIsOpenModal(false)
  }
  return (
    <div className='cr-popup'>
      <div className="container">
        <h1>Create Room</h1>
        <form onSubmit={(e)=>onCreateRoom(e)}>
          <label >Name</label>
          <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
          {/* <label >Password</label>
           <input type="password" /> */}
          <button>create</button>
        </form>
      </div>
    </div>
  )
}

export default AddRoomPopUp