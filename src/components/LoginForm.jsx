import React, { useState } from 'react'

const LoginForm = () => {
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  
  const onHandleLogin =(e)=>{
    e.preventDefault()
    console.log(Username + Password);
  }
  return (
    <div className='box-login'>
      <form onSubmit={(e) => onHandleLogin(e)}>
        <input type="text" value={Username} onChange={(e)=> setUsername(e.target.value)}/>
        <input type="password" value={Password} onChange={(e)=> setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginForm