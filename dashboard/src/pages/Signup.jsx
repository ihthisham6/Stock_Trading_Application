// dashboard/src/pages/Signup.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  // --- Helper Functions for Notifications ---
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  // --- Handles changes in the input fields ---
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
        `${import.meta.env.VITE_API_URL}/signup`, // Using your .env variable
        {
          ...inputValue,
        },
        { withCredentials: true } // Essential for sending cookies
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/"); // Redirect to dashboard on success
        }, 1000);
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

//   return (
//     <div className="form_container">
//       <h2>Signup Account</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={handleOnChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             placeholder="Enter your username"
//             onChange={handleOnChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             placeholder="Enter your password"
//             onChange={handleOnChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <span>
//           Already have an account? <Link to={"/login"}>Login</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );

// In dashboard/src/pages/Signup.jsx

// ... (keep all your existing imports, useState, and handler functions)

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Left Side: Image Section */}
        <div className="auth-image-section"></div>

        {/* Right Side: Form Section */}
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
  
// ... (keep export default Signup;)

};

export default Signup;