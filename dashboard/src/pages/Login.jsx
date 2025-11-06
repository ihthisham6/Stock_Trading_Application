// // dashboard/src/pages/Login.jsx

// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // We no longer need Navigate
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const Login = () => {
//   const [inputValue, setInputValue] = useState({
//     email: "",
//     password: "",
//   });
//   const { email, password } = inputValue;

//   // We no longer need the loginSuccess state
//   // const [loginSuccess, setLoginSuccess] = useState(false);

//   const handleError = (err) =>
//     toast.error(err, {
//       position: "bottom-left",
//     });
//   const handleSuccess = (msg) =>
//     toast.success(msg, {
//       position: "bottom-left",
//     });

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/login`,
//         { ...inputValue },
//         { withCredentials: true }
//       );
//       const { success, message } = data;
//       if (success) {
//         handleSuccess(message);
        
//         // --- THIS IS THE DEFINITIVE FIX ---
//         // We use a timeout and a full page reload to ensure the cookie
//         // is readable by the browser before the app re-initializes.
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1000); // 1-second delay for the toast message to be visible

//       } else {
//         handleError(message);
//       }
//     } catch (error) {
//       console.log(error);
//       handleError("An error occurred during login.");
//     }
//   };
  
//   // We no longer need the conditional redirect logic.
//   // if (loginSuccess) { ... }

//   return (
//     <div className="auth-page-container">
//       <div className="auth-card">
//         <div className="auth-image-section"></div>
//         <div className="auth-form-section">
//           <img src="/logo.png" alt="Logo" className="auth-logo" />
//           <h2>Welcome Back</h2>
//           <p className="auth-subtitle">Please log in to access your dashboard.</p>
          
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={email}
//                 placeholder="Enter your email"
//                 onChange={handleOnChange}
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 placeholder="Enter your password"
//                 onChange={handleOnChange}
//                  autoComplete="new-password"
//               />
//             </div>
//             <button type="submit">Login</button>
//           </form>

//           <span className="auth-footer-link">
//             Don't have an account? <Link to={"/signup"}>Sign up</Link>
//           </span>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;

// dashboard/src/pages/Login.jsx

import React, { useState, useEffect } from "react";
// --- CHANGE #1: Import useLocation to read URL parameters ---
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  // --- CHANGE #2: Initialize the useLocation hook ---
  const location = useLocation();
  
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  // --- CHANGE #3: Add a new state to manage the demo login flow ---
  const [isDemoLogin, setIsDemoLogin] = useState(false);

  // --- This useEffect is the "Magic Link" handler that runs on page load ---
  useEffect(() => {
    // Read the query parameters from the URL (e.g., ?demo=true)
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("demo") === "true") {
      setIsDemoLogin(true); // Set state to show the "Logging in..." message
      handleDemoLogin();    // Automatically trigger the demo login API call
    }
  }, [location.search]); // This hook depends on the URL's search string

  // --- Helper Functions (no changes) ---
  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // --- NEW: Function to handle the demo login API call ---
  const handleDemoLogin = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/demo-login`,
        {}, // Body is empty for this request
        { withCredentials: true }
      );
      if (data.success) {
        // Use the reliable hard reload to redirect
        window.location.href = "/";
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      handleError(error.response?.data?.message || "Demo login failed.");
      setIsDemoLogin(false); // On failure, show the regular login form again
    }
  };

  // --- Your existing regular login handler (no changes) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError("An error occurred during login.");
    }
  };

  // --- CHANGE #4: Conditional rendering for the demo flow ---
  // If the component is in "demo login" mode, it shows a clean loading screen.
  if (isDemoLogin) {
    return (
      <div className="auth-page-container">
        <div className="auth-card">
          <div className="auth-image-section"></div>
          <div className="auth-form-section" style={{ textAlign: 'center' }}>
            <h2>Logging in as Demo User...</h2>
            <p className="auth-subtitle">Please wait, you will be redirected to the dashboard shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  // If not in demo mode, it renders the standard login form.
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-image-section"></div>
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
                 autoComplete="new-password"
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