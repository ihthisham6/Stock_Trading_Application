import React from "react";

function Footer() {
  return (
    <footer id="footer" style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container">
        <div className="row between main-footer">
          <div className="col-3">
            <div className="footer-logo">
              <img src="media/images/logo.svg" alt="logo" />
            </div>
            <p className="copyright">
              © 2010 - 2024, Not Zerodha Broking Ltd.
            </p>
            <p className="copyright">
              All rights reserved.
            </p>
            <div className="social-icons">
              <a href="#" target="_blank"><i className="fa fa-twitter"></i></a>
              <a href="#" target="_blank"><i className="fa fa-facebook"></i></a>
              <a href="#" target="_blank"><i className="fa fa-instagram"></i></a>
              <a href="#" target="_blank"><i className="fa fa-linkedin"></i></a>
            </div>
            <hr />
            <div className="social-icons">
              <a href="#" target="_blank"><i className="fa fa-youtube"></i></a>
              <a href="#" target="_blank"><i className="fa fa-whatsapp"></i></a>
              <a href="#" target="_blank"><i className="fa fa-telegram"></i></a>
            </div>
          </div>
          <div className="col-9">
            <div className="row between">
              <div className="col-3">
                <ul className="list-style">
                  <li className="nav-head">Account</li>
                  <li><a href="#">Open an account</a></li>
                  <li><a href="#">Fund transfer</a></li>
                  <li><a href="#">60 day challenge</a></li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="list-style">
                  <li className="nav-head">Support</li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Support portal</a></li>
                  <li><a href="#">Z-Connect blog</a></li>
                  <li><a href="#">List of charges</a></li>
                  <li><a href="#">Downloads & resources</a></li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="list-style">
                  <li className="nav-head">Company</li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Products</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Press & media</a></li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="list-style">
                  <li className="nav-head">Quick links</li>
                  <li><a href="#">Brokerage calculator</a></li>
                  <li><a href="#">Market holidays</a></li>
                  <li><a href="#">Margin calculator</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Zerodha Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@zerodha.com, for DP related to dp@zerodha.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please
            create a ticket here.
          </p>
        </div>
        <div className="footer-graveyard-links">
          <ul>
            <li><a href="#">NSE</a></li>
            <li><a href="#">BSE</a></li>
            <li><a href="#">MCX</a></li>
            <li><a href="#">Terms & conditions</a></li>
            <li><a href="#">Policies & procedures</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Disclosure</a></li>
            <li><a href="#">For investor's attention</a></li>
            <li><a href="#">Investor charter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;