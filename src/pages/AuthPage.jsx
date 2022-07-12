import React from 'react'
import AuthForm from '../components/AuthForm'

const LoginPage = () => {
  return (
    <div className='login-page'>
      <AuthForm isLogin={false}/>
    </div>
  )
}

export default LoginPage