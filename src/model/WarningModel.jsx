import React from "react";
import { IoWarning } from "react-icons/io5";

export default function WarningModel({ closeModal, showWarningModal }) {
  return (
    <>
      <div
        className="modal fade show"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden={!showWarningModal}
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
            onClick={closeModal}
          ></button>
          <h1>Warning: Beware of Fake Websites</h1>
          <div className="modaldesc">
            <p>
              "It has come to our attention that a fraudulent website has been
              created, copying our content and design. Please be aware that this
              website is not affiliated with us and is attempting to scam
              users."
            </p>

            <br />
            <br />

            <b className="gt">
              <IoWarning size={25} /> IMPORTANT!
            </b>
            <ul>
              <li>
                Our official website is{" "}
                <a href="https://core-exchange.com/" className="gt">
                  https://core-exchange.com
                </a>
              </li>
              <li>We have not launched any new websites or platforms.</li>
              <li>
                Do not provide personal or financial information to any
                unauthorized websites.
              </li>
            </ul>

            <h3>How to Identify the Fake Website:</h3>
            <ul>
              <li>
                - Check the URL carefully. Our official website URL is{" "}
                <a href="https://core-exchange.com/" className="gt">
                  https://core-exchange.com
                </a>
              </li>
              <li>
                Look for SSL certification (https) and verify our website's
                security.
              </li>
              <li>Be cautious of websites with similar design and content.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
