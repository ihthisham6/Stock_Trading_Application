// dashboard/src/pages/Demo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Demo = () => {
    const [status, setStatus] = useState("Logging in as demo user, please wait...");

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

                // Step 3: If verification succeeds, redirect
                setStatus("Session verified! Redirecting to dashboard...");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);

            } catch (error) {
                const errorMsg = error.response?.data?.message || "Demo login failed. Please try again.";
                setStatus(errorMsg);
                console.error("Demo login flow failed", error);
            }
        };
        
        attemptDemoLogin();
    }, []);

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Demo Login</h1>
            <p>{status}</p>
        </div>
    );
};

export default Demo;