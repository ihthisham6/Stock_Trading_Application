import React from "react";

function CreateTicket() {
  return (
    <div className="support-categories">
      <div className="container">
        <h1 className="categories-title">To create a ticket, select a relevant topic</h1>
        <div className="categories-grid">
          <div className="category-item">
            <h3>
              <span className="category-icon">+</span>
              Account Opening
            </h3>
            <div className="category-links">
              <a href="#">Online Account Opening</a>
              <a href="#">Offline Account Opening</a>
              <a href="#">Company, Partnership and HUF Account Opening</a>
              <a href="#">NRI Account Opening</a>
              <a href="#">Charges at Zerodha</a>
              <a href="#">Zerodha IDFC FIRST Bank 3-in-1 Account</a>
              <a href="#">Getting Started</a>
            </div>
          </div>

          <div className="category-item">
            <h3>
              <span className="category-icon">👤</span>
              Your Account
            </h3>
            <div className="category-links">
              <a href="#">Login Credentials</a>
              <a href="#">Account Modification and Segment Addition</a>
              <a href="#">DP ID and bank details</a>
              <a href="#">Your Profile</a>
              <a href="#">Transfer and conversion of shares</a>
            </div>
          </div>

          <div className="category-item">
            <h3>
              <span className="category-icon">📈</span>
              Trading and Markets
            </h3>
            <div className="category-links">
              <a href="#">Margin/leverage, Product and Order types</a>
              <a href="#">Kite Web and Mobile</a>
              <a href="#">Trading FAQs</a>
              <a href="#">Corporate Actions</a>
              <a href="#">Sentinel</a>
              <a href="#">Kite API</a>
              <a href="#">Pi and other platforms</a>
              <a href="#">Stockreports+</a>
              <a href="#">GTT</a>
            </div>
          </div>

          <div className="category-item">
            <h3>
              <span className="category-icon">💰</span>
              Funds
            </h3>
            <div className="category-links">
              <a href="#">Adding Funds</a>
              <a href="#">Fund Withdrawal</a>
              <a href="#">eMandates</a>
            </div>
          </div>

          <div className="category-item">
            <h3>
              <span className="category-icon">⚙️</span>
              Console
            </h3>
            <div className="category-links">
              <a href="#">Reports</a>
              <a href="#">Ledger</a>
              <a href="#">Portfolio</a>
            </div>
          </div>

          <div className="category-item">
            <h3>
              <span className="category-icon">🪙</span>
              Coin
            </h3>
            <div className="category-links">
              <a href="#">Understanding Mutual Funds</a>
              <a href="#">About Coin</a>
              <a href="#">Buying and Selling through Coin</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;