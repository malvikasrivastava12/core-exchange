import React from "react";
import Icon from "../assets/Images/Core_Exchange_Logo_favicon.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footerwrap">
          {/* Footer Block 1 */}
          <div className="footblock">
            <a href="#" className="footlogo">
              <img src={Icon} alt="Logo" />
            </a>
            <p>
              Copyrights:
              <br />
              Core Exchange LTD |
              <a href="index.html" style={{ color: "#fd9500" }}>
                https://core-exchange.com/
              </a>
              <br />
              Blockchain investment platform
              <br />
              2024 © All Rights Reserved
            </p>
          </div>

          {/* Footer Block 2 */}
          <div className="footblock">
            <p>
              Smart-contract address:
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fd9500", wordWrap: "break-word" }}
              >
                0x8af8bdBD504a9d302e251a9f6AF4fD5bC3C65b4C
              </a>
            </p>
            <p>
              Powered by
              <img src={Icon} className="footimg" alt="Polygon Logo" />
              DAO blockchain
            </p>
          </div>

          {/* Footer Block 3 */}
          <div className="footblock">
            <a
              href="#"
              style={{ height: "40px", lineHeight: "42px", fontSize: "20px" }}
              className="maindescbut"
              data-remodal-target="invest"
            >
              Make Deposit
            </a>

            <a
              href="#"
              style={{ height: "40px", lineHeight: "42px", fontSize: "20px" }}
              className="maindescbut"
              data-remodal-target="wallet"
            >
              Wallet statistic
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
