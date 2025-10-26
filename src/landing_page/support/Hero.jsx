import React from "react";

function Hero() {
  return (
    <section id="supportHero">
      <div id="supportWrapper">
        <div className="support-header">
          <h4>Support Portal</h4>
          <a href="">Track Tickets</a>
        </div>
        <div className="support-main-content">
          <div className="support-left">
            <h1>
              Search for an answer or browse help topics<br />to create a ticket
            </h1>
            <input placeholder="Eg: how do I activate F&O, why is my order getting rejected..." />
            <div className="quick-links">
              <a href="">Track account opening</a>
              <a href="">Track segment activation</a>
              <a href="">Intraday margins</a>
              <a href="">Kite user manual</a>
            </div>
          </div>
          <div className="featured-section">
            <div className="col-5 featured-section">
              <h1>Featured</h1>
              <ol>
                <li>
                  <a href="">Current Takeovers and Delisting - January 2024</a>
                </li>
                <li>
                  <a href="">Latest Intraday leverages - MIS & CO</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;