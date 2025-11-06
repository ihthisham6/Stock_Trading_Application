// dashboard/src/pages/Demo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Demo = () => {
    const navigate = useNavigate(); // Initialize the hook
    const [status, setStatus] = useState("Logging in as demo user, please wait...");

    useEffect(() => {
        const attemptDemoLogin = async () => {
            try {
                // Step 1: Call the backend to set the cookie.
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/demo-login`,
                    {}, 
                    { withCredentials: true }
                );

                if (data.success) {
                    // Step 2: On success, perform a client-side navigation.
                    // This updates the URL and tells the router to render the correct component.
                    setStatus("Login successful! Redirecting...");
                    navigate('/', { replace: true });
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Demo login failed.";
                setStatus(errorMsg);
                console.error("Demo login flow failed", error);
            }
        };
        
        attemptDemoLogin();
    }, [navigate]); // Add navigate to the dependency array

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Demo Login</h1>
            <p>{status}</p>
        </div>
    );
};

export default Demo;