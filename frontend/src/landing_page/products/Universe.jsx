import React from "react";

function Universe() {
  return (
    <section className="universe-section">
      <div className="container">
        <div className="text-center">
          <h1>The Zerodha Universe</h1>
          <p>
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>

        <div className="universe-grid">
          <div className="universe-item">
            <img src="media/images/smallcaseLogo.png" alt="Smallcase" />
            <p>Thematic investment platform</p>
          </div>
          <div className="universe-item">
            <img src="media/images/streakLogo.png" alt="Streak" />
            <p>Algo & strategy platform</p>
          </div>
          <div className="universe-item">
            <img src="media/images/sensibullLogo.svg" alt="Sensibull" />
            <p>Options trading platform</p>
          </div>
          <div className="universe-item">
            <img src="media/images/zerodhaFundhouse.png" alt="Zerodha Fundhouse" />
            <p>Asset management</p>
          </div>
          <div className="universe-item">
            <img src="media/images/goldenpiLogo.png" alt="Goldenpi" />
            <p>Bonds trading platform</p>
          </div>
          <div className="universe-item">
            <img src="media/images/dittoLogo.png" alt="Ditto" />
            <p>Insurance</p>
          </div>
        </div>
        
        <div className="text-center">
          {/* --- THIS IS THE CHANGE --- */}
          {/* Replaced the placeholder href="#" with the dynamic URL */}
          <a 
            href={`${import.meta.env.VITE_DASHBOARD_URL}/signup`} 
            className="signup-button"
          >
            Signup Now
          </a>
          {/* --- END OF CHANGE --- */}
        </div>
      </div>
    </section>
  );
}

export default Universe;