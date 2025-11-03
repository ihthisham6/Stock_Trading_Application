import React from "react";

function OpenAccount() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open a Zerodha account</h1>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        
        {/* --- THIS IS THE CHANGE --- */}
        {/* Replace the button with an <a> tag */}
        <a
          href={`${import.meta.env.VITE_DASHBOARD_URL}/signup`} 
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up Now
        </a>
        {/* --- END OF CHANGE --- */}
      </div>
    </div>
  );
}

export default OpenAccount;