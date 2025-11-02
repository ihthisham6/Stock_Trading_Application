// dashboard/src/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

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
        `${import.meta.env.VITE_API_URL}/login`, // Using your .env variable
        {
          ...inputValue,
        },
        { withCredentials: true } // Essential for sending cookies
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        console.log("LOGIN SUCCESSFUL! Preparing to navigate...");
        setTimeout(() => {
            window.location.href = "/";  // Redirect to dashboard on success
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
    });
  };

//   return (
//     <div className="form_container">
//       <h2>Login Account</h2>
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
//           Don't have an account? <Link to={"/signup"}>Signup</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

// In dashboard/src/pages/Login.jsx

// ... (keep all your existing imports, useState, and handler functions)

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Left Side: Image Section */}
        <div className="auth-image-section">
          {/* The background image is set via CSS */}
        </div>

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