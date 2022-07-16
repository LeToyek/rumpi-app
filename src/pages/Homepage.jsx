import React from 'react'
import { useHistory } from 'react-router-dom'
import nightChat from '../assets/night-chat.png'
const Homepage = () => {
  const history = useHistory()
  return (
    <div className='homepage'>
      <img src={nightChat} alt="" />
      <div className="right">
        <h1>Rumpi</h1>
        <p>When you need to hangout with your circle or talk about someone with your friend online and secretly. <span>Rumpi</span> has you covered</p>
        <button onClick={()=>history.push('/login')}>Get Started</button>
      </div>
    </div>
  )
}

export default Homepage