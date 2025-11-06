// dashboard/src/pages/Demo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Demo = () => {
    const navigate = useNavigate(); // Initialize the hook
    const [status, setStatus] = useState("Logging in as demo user, please wait...");
    const [isVerified, setIsVerified] = useState(false);

    // This useEffect handles the navigation AFTER the state is updated.
    useEffect(() => {
        // If the session has been verified, navigate to the homepage.
        if (isVerified) {
            // Using the navigate function is a more forceful command to the router.
            navigate('/', { replace: true });
        }
    }, [isVerified, navigate]); // This effect will run when 'isVerified' changes.

    // This useEffect handles the API calls.
    useEffect(() => {
        const attemptDemoLogin = async () => {
            try {
                // Step 1: Set the cookie
                await axios.post(`${import.meta.env.VITE_API_URL}/demo-login`, {}, { withCredentials: true });
                setStatus("Cookie set. Verifying session...");

                // Step 2: Verify the cookie is usable
                await axios.get(`${import.meta.env.VITE_API_URL}/verify`, { withCredentials: true });

                // Step 3: If verification succeeds, update the state.
                // This will trigger the navigation useEffect above.
                setStatus("Session verified! Redirecting to dashboard...");
                setIsVerified(true);

            } catch (error) {
                const errorMsg = error.response?.data?.message || "Demo login failed. Please try again.";
                setStatus(errorMsg);
                console.error("Demo login flow failed", error);
            }
        };
        
        attemptDemoLogin();
    }, []); // Empty array ensures this runs only once for API calls

    // While the process is running, show the status messages.
    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Demo Login</h1>
            <p>{status}</p>
        </div>
    );
};

export default Demo;