import React from "react";
import { IoIosLink } from "react-icons/io";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
export default function WalletStatisticModal(props) {
  const {
    toggleWalletStatisticsModal,
    walletAddress,
    handleCopy,
    referralLink,
    walletStatisticModalData,
    tableview,
    setTableview,
  } = props;
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div
        className=" modal-dialog-centered"
        role="document"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="modal-content remodal remodal-is-initialized remodal-is-opened"
          style={{ backgroundColor: "#1f1f1f" }}
        >
          <div>
            <button
              type="button"
              className="remodal-close"
              onClick={toggleWalletStatisticsModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h1>Wallet Statistic</h1>
          </div>
          {!walletAddress && (
            <form id="walletAddress" className="maincontform authFalse">
              <input
                type="text"
                placeholder="Connect with your wallet app..."
                readOnly
              />
              <div className="modalref">
                Connect with your <b className="gt">TokenPocket</b> /{" "}
                <b className="gt">MetaMask</b> browser extension, or{" "}
                <b className="gt">TrustWallet</b> /{" "}
                <b className="gt">MetaMask</b> mobile app. After connection, you
                will get the opportunity to make a deposit (reload this page).
                <br />
                <u>Please, contact our support team if you can't connect.</u>
                <br />
                <a href="#" data-remodal-target="promo" className="maindescbut">
                  Promo materials
                </a>
              </div>
            </form>
          )}
          {walletAddress && (
            <>
              <form
                className="maincontform authFalse"
                style={{ paddingBottom: "30px" }}
              >
                <h6>
                  Your
                  <img
                    src={DAOIcon}
                    style={{
                      width: "20px",
                      height: "20px",
                      margin: "0px 8px",
                    }}
                    alt="DAO Icon"
                  />
                  Core Wallet Address
                </h6>
                <input
                  type="text"
                  placeholder=""
                  value={walletAddress}
                  readOnly
                />
                <div onClick={handleCopy} style={{ wordBreak: "break-word" }}>
                  <h6 style={{ paddingTop: "10px", fontSize: "14px" }}>
                    <IoIosLink />
                    Your Refferal link
                  </h6>
                  <a href="javascript:(void:0)" style={{ color: "#fd9500" }}>
                    {referralLink}
                  </a>
                </div>

                <p style={{ textAlign: "center", fontSize: "14px" }}>
                  Share this link with your partners to get free core
                </p>

                {/* <div className="modaldash"></div> */}
              </form>
              <div className="modal-contents-section">
                {walletStatisticModalData.map((item, index) => (
                  <>
                    <div class="modaldesc">
                      <div class="dashmodal"></div>

                      <div class="macblockline" key={index}>
                        <div class="modallineflex">
                          <div class="modallinewrap">
                            <b>{item.label}</b>
                            <p>{item.heading}</p>
                            <div class="modallinewrapvalue">
                              <img src={item.image} alt="" />{" "}
                              <span class="userTotalDeposits" id="freeCoinPer">
                                {" "}
                                {item.value}
                              </span>
                            </div>
                          </div>
                          <div class="modallinewrap">
                            {item.label2}
                            <p
                              type="button"
                              class="maindescbut getButton"
                              style={{ marginTop: "4px" }}
                              onClick={() => {
                                setTableview(item.id);
                              }}
                            >
                              {item.buttonText}
                            </p>
                          </div>
                        </div>
                        <div className="cardtext-container">
                          <p className="cardtext">{item.text}</p>
                        </div>
                      </div>
                    </div>
                    {tableview === item.id && (
                      <>
                        <div
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => setTableview("")}
                        >
                          <div class="closee">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <svg viewBox="0 0 36 36" class="circlu">
                              <path
                                stroke-dasharray="100, 100"
                                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table class="table table-dark">
                            <thead>
                              <tr>
                                <th scope="col">SNo</th>
                                <th scope="col">Address</th>
                                <th scope="col">level</th>
                                <th scope="col">Direct</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>mdo</td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>mdo</td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>mdo</td>
                              </tr>
                              <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>mdo</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </>
                ))}

                <h5>Your Refferal Link</h5>
                <form className="maincontform authFalse">
                  <input
                    type="text"
                    placeholder=""
                    value={walletAddress}
                    readOnly
                  />
                </form>
                <button
                  className="maindescbut"
                  style={{ marginTop: "0px" }}
                  onClick={handleCopy}
                >
                  Copy Refferal link
                </button>
                <span>
                  <p>Your PIN has already been setup</p>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
