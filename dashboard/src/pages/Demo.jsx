// dashboard/src/pages/Demo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import the Navigate component

const Demo = () => {
    const [status, setStatus] = useState("Logging in as demo user, please wait...");
    // --- NEW: State to trigger the navigation ---
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const attemptDemoLogin = async () => {
            try {
                // Step 1: Set the cookie
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/demo-login`,
                    {}, 
                    { withCredentials: true }
                );
                
                setStatus("Cookie set. Verifying session...");

                // Step 2: Verify the cookie is usable
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/verify`,
                    { withCredentials: true }
                );

                // --- THIS IS THE CHANGE ---
                // Step 3: If verification succeeds, set the state to trigger navigation
                setStatus("Session verified! Redirecting to dashboard...");
                setIsVerified(true);

            } catch (error) {
                const errorMsg = error.response?.data?.message || "Demo login failed. Please try again.";
                setStatus(errorMsg);
                console.error("Demo login flow failed", error);
            }
        };
        
        attemptDemoLogin();
    }, []); // Empty array ensures this runs only once

    // --- THIS IS THE NEW LOGIC ---
    // If the session has been successfully verified, render the Navigate component.
    // This tells React Router to handle the redirect internally.
    if (isVerified) {
        return <Navigate to="/" replace />;
    }

    // While the process is running, show the status message.
    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Demo Login</h1>
            <p>{status}</p>
        </div>
    );
};

export default Demo;