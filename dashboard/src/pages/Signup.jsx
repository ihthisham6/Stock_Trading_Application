// dashboard/src/pages/Signup.jsx

import React, { useState } from "react";
// --- CHANGE #1: Import Navigate instead of useNavigate ---
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  // --- CHANGE #2: Add a new state to track successful signup ---
  const [signupSuccess, setSignupSuccess] = useState(false);

  // --- Helper Functions for Notifications (No changes needed) ---
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  // --- Handles changes in the input fields (No changes needed) ---
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // --- Handles the form submission ---
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
        // --- CHANGE #3: Instead of a timeout/reload, just set the state ---
        setSignupSuccess(true);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  // --- CHANGE #4: Add conditional rendering for the redirect ---
  if (signupSuccess) {
    return <Navigate to="/" replace />;
  }

  // If signup is not successful, render the form as usual.
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
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder="Choose a username"
                onChange={handleOnChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Create a strong password"
                onChange={handleOnChange}
              />
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