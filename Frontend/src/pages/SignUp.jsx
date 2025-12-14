import React from "react";
import AuthForm from "../components/AuthForm";

const SignUp = () => {
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      <AuthForm type={'signup'}/>
    </div>
  );
};

export default SignUp;
