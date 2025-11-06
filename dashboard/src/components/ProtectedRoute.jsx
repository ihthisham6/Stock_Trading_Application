// // // dashboard/src/components/ProtectedRoute.jsx
// // import React from 'react';
// // import { useCookies } from 'react-cookie';
// // import { Navigate, Outlet } from 'react-router-dom';

// // const ProtectedRoute = () => {
// //   const [cookies] = useCookies(['token']);

// //    console.log("ProtectedRoute checking for token:", cookies.token);

// //   // If the token cookie exists, render the child route (e.g., Dashboard).
// //   // Otherwise, navigate them to the login page.
// //   return cookies.token ? <Outlet /> : <Navigate to="/login" />;
// // };

// // export default ProtectedRoute;


// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const verifyUser = async () => {
//             try {
//                 // Make a request to our new /verify endpoint
//                 const response = await axios.get(
//                     `${import.meta.env.VITE_API_URL}/verify`,
//                     { withCredentials: true } // This sends the cookie to the backend
//                 );
                
//                 // If the request is successful (status 200), the user is authenticated.
//                 if (response.status === 200) {
//                     setIsAuthenticated(true);
//                 }
//             } catch (error) {
//                 // If the request fails (e.g., 401 Unauthorized), the user is not authenticated.
//                 console.log("Verification failed:", error);
//                 setIsAuthenticated(false);
//             } finally {
//                 // No matter the outcome, the loading process is finished.
//                 setIsLoading(false);
//             }
//         };

//         verifyUser();
//     }, []); // The empty array ensures this runs only once when the component mounts

//     // While the verification request is in flight, show a loading indicator.
//     if (isLoading) {
//         return <div>Loading...</div>; // Or a spinner component
//     }

//     // After loading, check if the user is authenticated.
//     // If they are, render the child component (e.g., the Home page).
//     // If not, redirect them to the login page.
//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


// dashboard/src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // This component's ONLY job is to ask the backend "is the user valid?"
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/verify`,
                    { withCredentials: true }
                );
                setIsAuthenticated(true);
            } catch (error) {
                console.log("Verification failed, user is not authenticated.");
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;