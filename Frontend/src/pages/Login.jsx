import React from 'react'
import AuthForm from '../components/AuthForm'

const Login = () => {
  return (
    <div className='w-full h-screen bg-background flex items-center justify-center'>
      <AuthForm type={"login"}/>
    </div>
  )
}

export default Login