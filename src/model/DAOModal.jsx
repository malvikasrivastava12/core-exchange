import React from "react";
import { IoWarning } from "react-icons/io5";
import { FaExclamationTriangle } from "react-icons/fa";
import DAOIcon from "../assets/Images/ForeX.png";
import DAOFavIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
export default function DAOModal({ closeDAOModal, showDAOModal }) {
  return (
    <div
      className="remodal-overlay remodal-is-opened"
      style={{ display: "block" }}
    >
      <div>
        <div
          className="modal fade show"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden={!showDAOModal}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            data-remodal-id="warning"
            className="remodal remodal-is-initialized remodal-is-opened"
            tabIndex="-1"
          >
            <button
              // data-remodal-action="close"
              className="remodal-close"
              onClick={closeDAOModal}
            ></button>
            <div className="DAOLogo">
              <img src={DAOIcon} className="modallogo" alt="Core Logo" />
            </div>

            {/* Modal Description */}
            <div className="modaldesc">
              {/* Core Logo and Description */}
              {/* <img src={DAOFavIcon} alt="Core Logo" /> */}
              <b>CORE (DAO)</b>{" "}
              <span className="Modalopacity">
                - one of the largest blockchain-based operating systems in the
                world. The world needs a decentralized, secure, and scalable
                blockchain at its Core.
              </span>
              {/* How to Get DAO Section */}
              <h3 className="Modalopacity" style={{ fontSize: "20px" }}>
                How to get DAO?
              </h3>
              <p className="Modalopacity">
                You can easily get DAO on every popular exchanger like{" "}
                <a
                  href="https://binance.com/"
                  className="modallink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Binance
                </a>
                ,{" "}
                <a
                  href="https://poloniex.com/"
                  className="modallink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Matic
                </a>
                ,{" "}
                <a
                  href="https://www.bitfinex.com/"
                  className="modallink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bitfinex
                </a>
                , and{" "}
                <a
                  href="https://okex.com/"
                  className="modallink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OKX
                </a>
                . After exchange, send DAO to your personal wallet and then send
                it to our smart-contract address.
              </p>
              <br />
              {/* Important Note */}
              <b className="gt">
                <FaExclamationTriangle /> IMPORTANT!
              </b>{" "}
              <span className="Modalopacity">
                {" "}
                We are working only with personal wallets. Do not make deposits
                from exchanger accounts; you will lose funds because payouts
                will be sent to the exchanger address, not yours!
              </span>
              {/* Wallets Section */}
              <h3 className="Modalopacity" style={{ fontSize: "20px" }}>
                What DAO personal wallets to use?
              </h3>
              <p>
                <span className="Modalopacity">
                  You can use two types of wallets:
                </span>
                <br />- <b>Browser extensions</b>.{" "}
                <span className="Modalopacity">
                  For example, <b>MetaMask</b> / <b>TokenPocket</b>. Just
                  install the extension on your favorite browser and create a
                  personal wallet address.
                </span>
                <br />
                <br />- <b>Mobile crypto wallets</b>.{" "}
                <span className="Modalopacity">
                  You can use any personal crypto wallet that supports DAO
                  cryptocurrency and "CORE dapps" technology, for example:{" "}
                </span>
                <a
                  href="https://tronwallet.me/"
                  className="modallink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TokenPocket
                </a>
                ,{" "}
                <a
                  href="https://bankowallet.com/"
                  className="modallink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Banko
                </a>
                , <span className="Modalopacity">and others.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
