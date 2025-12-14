import React from 'react'
import AuthForm from '../components/AuthForm'

const ForgetPassword = () => {
  return (
    <div className='w-full h-screen bg-background flex items-center justify-center'>
      <AuthForm type={"forget-password"}/>
    </div>
  )
}

export default ForgetPassword