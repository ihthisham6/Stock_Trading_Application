// import React from "react";
// import { Link } from "react-router-dom";
// function Navbar() {
//   return (
//     <nav
//       class="navbar navbar-expand-lg border-bottom"
//       style={{ backgroundColor: "#FFF" }}
//     >
//       <div class="container p-2">
//         <Link class="navbar-brand" to="/">
//           <img
//             src="media/images/logo.svg"
//             style={{ width: "25%" }}
//             alt="Logo"
//           />
//         </Link>
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <form class="d-flex" role="search">
//             <ul class="navbar-nav mb-lg-0">
//               <li class="nav-item">
//                 <Link class="nav-link active" aria-current="page" to="/signup">
//                   Signup
//                 </Link>
//               </li>
//               <li class="nav-item">
//                 <Link class="nav-link active" to="/about">
//                   About
//                 </Link>
//               </li>
//               <li class="nav-item">
//                 <Link class="nav-link active" to="/product">
//                   Products
//                 </Link>
//               </li>
//               <li class="nav-item">
//                 <Link class="nav-link active" to="/pricing">
//                   Pricing
//                 </Link>
//               </li>
//               <li class="nav-item">
//                 <Link class="nav-link active" to="/support">
//                   Support
//                 </Link>
//               </li>
//             </ul>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom" // Changed to className for React
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          className="navbar-toggler" // Changed to className
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* 
            Using ms-auto to push the navigation links to the right, 
            which is a standard Bootstrap layout.
          */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* --- THIS IS THE CRITICAL CHANGE --- */}

             {/* --- THIS IS THE NEW DEMO BUTTON --- */}
            {/* <li className="nav-item me-2">  */}
              {/* me-2 adds a margin to the right */}
              {/* <a 
                className="nav-link active btn btn-outline-secondary btn-sm" // Bootstrap button styling
                href={`${import.meta.env.VITE_DASHBOARD_URL}/demo`}
              >
                Demo Login
              </a>
            </li> */}
            {/* --- END OF NEW BUTTON --- */}
 <li className="nav-item">
      <a 
        className="nav-link active text-secondary" // Use a secondary, muted color
        href={`${import.meta.env.VITE_DASHBOARD_URL}/demo`}
      >
        Demo Login
      </a>
    </li>

            <li className="nav-item">
              {/* This is now a standard <a> tag pointing to the dashboard app */}
              <a 
                className="nav-link active" 
                href={`${import.meta.env.VITE_DASHBOARD_URL}/signup`}
              >
                Signup
              </a>
            </li>
            {/* --- END OF CHANGE --- */}

            <li className="nav-item">
              {/* These remain as <Link> components for internal navigation */}
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;