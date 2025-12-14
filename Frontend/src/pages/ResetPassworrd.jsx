import React from 'react'
import AuthForm from '../components/AuthForm'

const ResetPassworrd = () => {
  return (
   <div className='w-full h-screen bg-background flex items-center justify-center'>
      <AuthForm type={"reset-password"}/>
    </div>
  )
}

export default ResetPassworrd