import React from 'react'

const AddRoomPopUp = () => {
  return (
    <div className='cr-popup'>
      <div className="container">
        <h1>Create Room</h1>
        <form>
          <label >Name</label>
          <input type="text" />
          <label >Password</label>
          <input type="password" />
          <button>create</button>
        </form>
      </div>
    </div>
  )
}

export default AddRoomPopUp