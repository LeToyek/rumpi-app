import React from 'react'
import AuthForm from '../components/AuthForm'
import LoadingSection from '../components/LoadingSection'
import { useAppContext } from '../context/AppContext'

const LoginPage = () => {
  const {isLoading} = useAppContext()
  return isLoading ? <LoadingSection/>:(
    <div className='login-page'>
      <AuthForm isLogin={false}/>
    </div>
  )
}

export default LoginPage