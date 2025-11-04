// dashboard/src/pages/Signup.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // We no longer need Navigate
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  // We no longer need the signupSuccess state
  // const [signupSuccess, setSignupSuccess] = useState(false);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);

        // --- THIS IS THE DEFINITIVE FIX ---
        // Use a timeout and a full page reload for reliability.
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("An error occurred during signup.");
    }
  };

  // We no longer need the conditional redirect logic.
  // if (signupSuccess) { ... }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-image-section"></div>
        <div className="auth-form-section">
          <img src="/logo.png" alt="Logo" className="auth-logo" />
          <h2>Create Your Account</h2>
          <p className="auth-subtitle">Start your trading journey with us.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} placeholder="Enter your email" onChange={handleOnChange}/>
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} placeholder="Choose a username" onChange={handleOnChange}/>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} placeholder="Create a strong password" onChange={handleOnChange}/>
            </div>
            <button type="submit">Sign Up</button>
          </form>

          <span className="auth-footer-link">
            Already have an account? <Link to={"/login"}>Log in</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;