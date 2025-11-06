// dashboard/src/pages/Demo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Demo = () => {
    const [status, setStatus] = useState("Logging in as demo user, please wait...");

    useEffect(() => {
        const attemptDemoLogin = async () => {
            try {
                // Step 1: Set the cookie by calling the demo-login endpoint.
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/demo-login`,
                    {}, 
                    { withCredentials: true }
                );
                
                setStatus("Cookie set. Verifying session...");

                // Step 2: Immediately verify the cookie is usable by calling /verify.
                // This forces the browser to confirm the cookie is ready.
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/verify`,
                    { withCredentials: true }
                );

                // --- THIS IS THE CRITICAL FIX ---
                // Step 3: If both previous steps succeeded, perform a hard reload to the root.
                // This is the most reliable way to ensure the entire React app
                // re-initializes with the new, verified cookie state.
                setStatus("Session verified! Redirecting to dashboard...");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000); // 1-second delay to read the message

            } catch (error) {
                const errorMsg = error.response?.data?.message || "Demo login failed. Please try again.";
                setStatus(errorMsg);
                console.error("Demo login flow failed", error);
            }
        };
        
        attemptDemoLogin();
    }, []); // Empty array ensures this runs only once

    // This component will now only show status messages. The redirect is handled by the hard reload.
    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1>Demo Login</h1>
            <p>{status}</p>
        </div>
    );
};

export default Demo;