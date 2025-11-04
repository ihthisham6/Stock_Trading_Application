// dashboard/src/pages/Login.jsx

import React, { useState } from "react";
// --- CHANGE #1: Import Navigate instead of useNavigate ---
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  // --- CHANGE #2: Add a new state to track successful login ---
  const [loginSuccess, setLoginSuccess] = useState(false);

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
        `${import.meta.env.VITE_API_URL}/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        // --- CHANGE #3: Instead of a timeout/reload, just set the state ---
        setLoginSuccess(true);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    // This part is fine, it will clear the form fields on a failed attempt
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  // --- CHANGE #4: Add conditional rendering for the redirect ---
  // If loginSuccess becomes true, this component will render the <Navigate>
  // component, which reliably tells React Router to change the page.
  if (loginSuccess) {
    // The 'replace' prop is a best practice. It prevents the user from
    // clicking the browser's "back" button to return to the login page.
    return <Navigate to="/" replace />;
  }

  // If login is not successful, render the form as usual.
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* The background image is set via CSS */}
        <div className="auth-image-section"></div>

        {/* Right Side: Form Section */}
        <div className="auth-form-section">
          <img src="/logo.png" alt="Logo" className="auth-logo" />
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Please log in to access your dashboard.</p>
          
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>

          <span className="auth-footer-link">
            Don't have an account? <Link to={"/signup"}>Sign up</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;