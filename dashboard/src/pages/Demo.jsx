// dashboard/src/pages/Demo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Demo = () => {
    const [status, setStatus] = useState("Attempting demo login...");

    useEffect(() => {
        const attemptDemoLogin = async () => {
            try {
                // STEP 1: The component's ONLY job is to get the cookie.
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/demo-login`,
                    {}, 
                    { withCredentials: true }
                );

                if (data.success) {
                    // STEP 2: On success, trigger a HARD reload to the homepage.
                    // This forces the entire React app to restart from scratch.
                    // There is no race condition.
                    setStatus("Login successful! Redirecting...");
                    window.location.href = "/";
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Demo login failed. Please try again.";
                setStatus(errorMsg);
                console.error("Demo login flow failed", error);
            }
        };
        
        attemptDemoLogin();
    }, []); // Runs only once

    // This page only ever shows a status message.
    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Demo Login</h1>
            <p>{status}</p>
        </div>
    );
};

export default Demo;