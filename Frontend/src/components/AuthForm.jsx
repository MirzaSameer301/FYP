import React, { useState } from "react";
import credentials from "../assets/credentials.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../store/authSlice";
import { toast } from "react-toastify";

const AuthForm = ({ type }) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type === "login") {
      if (!email || !password) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }
      await dispatch(loginUser({ email, password }))
        .unwrap()
        .then((res) => {
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
          setLoading(false);
        });
    } else if (type === "signup") {
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }
      await dispatch(registerUser({ name, email, password }))
        .unwrap()
        .then((res) => {
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    } else if (type === "reset-password") {
      
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      await dispatch(resetPassword({ token, password }))
        .unwrap()
        .then((res) => {
          toast.success("Password reset successful");
          setLoading(false);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    } else if (type === "forget-password") {
     await dispatch(forgotPassword(email))
        .unwrap()
        .then((res) => {
          toast.success("Check Your Mail for reset link");
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="bg-light w-[80%] mx-auto rounded-lg flex flex-row-reverse shadow-md shadow-[#a9a9a9] overflow-hidden justify-between">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-10 gap-3 justify-center w-full"
      >
        <h2 className="text-secondary text-lg sm:text-xl md:text-2xl font-bold text-center mb-4">
          {type === "login"
            ? "Log In"
            : type === "signup"
            ? "Create New Account"
            : type === "reset-password"
            ? "Reset Password"
            : "Forgot Password"}
        </h2>
        {type === "signup" && (
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full border border-primary rounded-lg px-3 py-1 text-secondary placeholder:text-primary placeholder:text-sm shadow-lg outline-none"
          />
        )}
        {(type === "signup" ||
          type === "login" ||
          type === "forget-password") && (
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full border border-primary rounded-lg px-3 py-1 text-secondary placeholder:text-primary placeholder:text-sm shadow-lg outline-none"
          />
        )}
        {(type === "signup" || type === "login") && (
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border border-primary rounded-lg px-3 py-1 text-secondary placeholder:text-primary placeholder:text-sm shadow-lg outline-none"
          />
        )}
        {type === "signup" && (
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-primary rounded-lg px-3 py-1 text-secondary placeholder:text-primary placeholder:text-sm shadow-lg outline-none"
          />
        )}
        {type === "login" && (
          <p className="text-sm text-secondary text-left hover:underline">
            <Link to={"/forget-password"}>Forgot Password?</Link>
          </p>
        )}
        {type === "reset-password" && (
          <div className="flex flex-col gap-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Write New Password"
              className="w-full border border-primary rounded-lg px-3 py-1 text-secondary placeholder:text-primary placeholder:text-sm shadow-lg outline-none"
            />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-primary rounded-lg px-3 py-1 text-secondary placeholder:text-primary placeholder:text-sm shadow-lg outline-none"
            />
          </div>
        )}
        <button
          type="submit"
          className="shadow-md shadow-secondary w-full p-2 text-white font-semibold sm:text-lg bg-secondary rounded-lg hover:opacity-90 cursor-pointer mt-2"
        >
          {type === "login"
            ? "Log In"
            : type === "signup"
            ? "Sign Up"
            : type === "reset-password"
            ? "Reset Password"
            : type === "forget-password"
            ? "Send Reset Link"
            : ""}
        </button>
        {type === "login" ? (
          <p className="text-secondary text-sm pt-2 text-left">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className=" cursor-pointer font-semibold hover:opacity-90"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-secondary text-sm pt-2 text-left">
            Already have an account?{" "}
            <Link
              to="/login"
              className=" cursor-pointer font-semibold hover:opacity-90"
            >
              Log In
            </Link>
          </p>
        )}
      </form>

      <div className="h-[420px] md:w-full hidden md:block object-cover ">
        <img
          src={credentials}
          alt="credentials Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthForm;
