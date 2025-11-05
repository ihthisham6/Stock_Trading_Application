
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useCookies } from "react-cookie";
// // import { useGeneralContext } from "./GeneralContext";

// // const Menu = () => {
// //   // --- STATE MANAGEMENT ---

// //   const { user } = useGeneralContext();
// //   const [selectedMenu, setSelectedMenu] = useState(0);
// //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

// //   // --- HOOKS FOR AUTHENTICATION & NAVIGATION ---
// //   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
// //   const navigate = useNavigate();

// //   // --- EVENT HANDLERS ---
// //   const handleMenuClick = (index) => {
// //     setSelectedMenu(index);
// //     // Close the profile dropdown when navigating
// //     setIsProfileDropdownOpen(false); 
// //   };

// //   const handleProfileClick = () => {
// //     // Toggles the visibility of the dropdown
// //     setIsProfileDropdownOpen(!isProfileDropdownOpen);
// //   };

// //   const handleLogout = () => {
// //     // Remove the authentication token
// //     removeCookie("token");
// //     // Redirect the user to the login page
// //     navigate("/login");
// //   };

// //   // --- CSS CLASSES FOR STYLING ---
// //   const menuClass = "menu";
// //   const activeMenuClass = "menu selected";

// //   return (
// //     <div className="menu-container">
// //       <img src="logo.png" style={{ width: "50px" }} alt="logo" />
// //       <div className="menus">
// //         <ul>
// //           {/* ----- Your Navigation Links (Unchanged) ----- */}
// //           <li>
// //             <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
// //               <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
// //             </Link>
// //           </li>
// //           <li>
// //             <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
// //               <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
// //             </Link>
// //           </li>
// //           <li>
// //             <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
// //               <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
// //             </Link>
// //           </li>
// //           <li>
// //             <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
// //               <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
// //             </Link>
// //           </li>
// //           <li>
// //             <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
// //               <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
// //             </Link>
// //           </li>
// //           <li>
// //             <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
// //               <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
// //             </Link>
// //           </li>
// //         </ul>
// //         <hr />

// //         {/* ----- DYNAMIC AUTHENTICATION SECTION ----- */}
// //         <div className="profile-section">
// //           {cookies.token ? (
// //             // --- RENDER THIS IF USER IS LOGGED IN ---
// //             <>
// //               <div className="profile" onClick={handleProfileClick}>
// //                 <div className="avatar">ZU</div>
// //                 <p className="username">USERID</p> {/* This can be made dynamic later */}
// //               </div>
// //               {isProfileDropdownOpen && (
// //                 <div className="profile-dropdown">
// //                   {/* You can add more links here like "Settings" or "Profile" */}
// //                   <button onClick={handleLogout} className="logout-button">
// //                     Logout
// //                   </button>
// //                 </div>
// //               )}
// //             </>
// //           ) : (
// //             // --- RENDER THIS IF USER IS LOGGED OUT ---
// //             <div className="auth-links">
// //               <Link to="/login" className="login-button">
// //                 Login
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Menu;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { useGeneralContext } from "./GeneralContext"; // This is already correctly imported

// const Menu = () => {
//   // --- STATE MANAGEMENT ---
//   const { user } = useGeneralContext(); // You are correctly getting the user object
//   const [selectedMenu, setSelectedMenu] = useState(0);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   // --- HOOKS FOR AUTHENTICATION & NAVIGATION ---
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
//   const navigate = useNavigate();

//   // --- EVENT HANDLERS ---
//   const handleMenuClick = (index) => {
//     setSelectedMenu(index);
//     setIsProfileDropdownOpen(false);
//   };

//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleLogout = () => {
//     removeCookie("token");
//     navigate("/login");
//   };

//   // --- CSS CLASSES FOR STYLING ---
//   const menuClass = "menu";
//   const activeMenuClass = "menu selected";

//   return (
//     <div className="menu-container">
//       <img src="logo.png" style={{ width: "50px" }} alt="logo" />
//       <div className="menus">
//         <ul>
//           {/* Your Navigation Links (No changes needed here) */}
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenu-click(0)}>
//               <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
//             </Link>
//           </li>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
//               <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
//             </Link>
//           </li>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
//               <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
//             </Link>
//           </li>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
//               <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
//             </Link>
//           </li>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
//               <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
//             </Link>
//           </li>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
//               <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
//             </Link>
//           </li>
//         </ul>
//         <hr />

//         {/* ----- DYNAMIC AUTHENTICATION SECTION ----- */}
//         <div className="profile-section">
//           {cookies.token ? (
//             // --- RENDER THIS IF USER IS LOGGED IN ---
//             <>
//               <div className="profile" onClick={handleProfileClick}>
//                 {/* --- THIS IS THE CHANGE (AVATAR) --- */}
//                 <div className="avatar">
//                   {/* 
//                     Use a ternary operator: if the user object exists, show the initials.
//                     Otherwise, show a fallback 'ZU'.
//                   */}
//                   {user ? user.username.substring(0, 2).toUpperCase() : 'ZU'}
//                 </div>
//                 {/* --- THIS IS THE CHANGE (USERNAME) --- */}
//                 <p className="username">
//                   {/* If the user object exists, show the username. Otherwise, show 'USERID'. */}
//                   {user ? user.username : 'USERID'}
//                 </p>
//               </div>
              
//               {isProfileDropdownOpen && (
//                 <div className="profile-dropdown">
//                   <button onClick={handleLogout} className="logout-button">
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             // --- RENDER THIS IF USER IS LOGGED OUT ---
//             <div className="auth-links">
//               <Link to="/login" className="login-button">
//                 Login
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;


// dashboard/src/components/Menu.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGeneralContext } from "./GeneralContext";

const Menu = () => {
  const { user } = useGeneralContext(); // Get the user object from the context
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    // Specify the path for robust cookie removal across the domain
    removeCookie("token", { path: '/' });
    // Use a hard reload for the most reliable logout redirect
    window.location.href = "/login";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          {/* Your navigation links remain the same */}
          <li><Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}><p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}><p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}><p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}><p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}><p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}><p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p></Link></li>
        </ul>
        <hr />

        <div className="profile-section">
          {/* --- THIS IS THE CRITICAL FIX --- */}
          {/* The source of truth is the 'user' object from the context. If it exists, the user is logged in. */}
          {user ? (
            // If user exists, they are logged in.
            <>
              <div className="profile" onClick={handleProfileClick}>
                <div className="avatar">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                <p className="username">{user.username}</p>
              </div>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            // If user is null, they are logged out.
            <div className="auth-links">
              <Link to="/login" className="login-button">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;