import React from "react";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";

export default function DepositModel(props) {
  const {
    userReferer,
    referralLink,
    tableview,
    toggleMakeDepositModal,
    walletAddress,
    userExist,
    inputAmount,
    handleAmountInputChange,
    inputAddress,
    setInputAddress,
    isLoader,
    handleDeposit,
    MakeDepositModalData,
    handleCopy,
    setTableview,
    errors,
  } = props;

  return (
    <>
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
                onClick={toggleMakeDepositModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h1>Make New Deposit</h1>
            </div>

            {!walletAddress && (
              <form className="maincontform authFalse">
                <input
                  type="text"
                  placeholder="Connect with your wallet app..."
                  value=""
                  readOnly
                />
                <div className="modalref">
                  Connect with your <b className="gt">TrustWallet</b> /{" "}
                  <b className="gt">MetaMask</b> browser extension, or{" "}
                  <b className="gt">TokenPocket</b> /{" "}
                  <b className="gt">Banko</b> mobile app. After connection you
                  will get the opportunity to make a deposit (reload this page).
                  <br />
                  <u>Please, contact our support team if you can't connect.</u>
                  <br />
                  <br />
                  <div className="userRefererDiv">
                    Your upline partner wallet:{" "}
                    <span className="userReferer">{userReferer}</span>
                  </div>
                </div>
              </form>
            )}

            {!userExist && walletAddress && (
              <form className="maincontform authFalse">
                <p>You need to register before deposition</p>
                <button className="maindescbut">Register Now</button>
                <div className="modaldash" style={{ top: "200px" }}></div>
              </form>
            )}

            {userExist && (
              <>
                <form
                  className="maincontform authFalse"
                  style={{ paddingBottom: "30px" }}
                >
                  <div style={{ paddingBottom: "15px" }}>
                    <h6>
                      Specify deposit
                      <img
                        src={DAOIcon}
                        style={{
                          width: "20px",
                          height: "20px",
                          margin: "0px 8px",
                        }}
                        alt="DAO Icon"
                      />
                      POL amount here
                    </h6>
                  </div>
                  <div className="deposit-input-container">
                    <input
                      type="text"
                      placeholder="Enter amount"
                      value={inputAmount}
                      onChange={handleAmountInputChange}
                    />
                    {errors.amt && <p className="error">{errors.amt}</p>}
                    <input
                      type="text"
                      placeholder="Enter User Address"
                      value={inputAddress}
                      onChange={(e) => setInputAddress(e.target.value)}
                    />
                    {errors.adr && <p className="error">{errors.adr}</p>}
                    {/* <input type="text" placeholder="Security Pin" value="" /> */}
                  </div>
                  {isLoader ? (
                    <button className="maindescbut" type="button">
                      <div
                        class="spinner-border spinner-border-sm "
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      className="maindescbut"
                      type="button"
                      onClick={handleDeposit}
                    >
                      DEPOSIT NOW
                    </button>
                  )}
                </form>
                <div className="modal-contents-section">
                  {MakeDepositModalData.map((item, index) => (
                    <>
                      <div class="modaldesc">
                        <div class="dashmodal"></div>

                        <div class="macblockline" key={index}>
                          <div class="modallineflex">
                            <div class="modallinewrap">
                              <b>{item.label1}</b>
                              <div class="modallinewrapvalue">
                                <img src={item.image} alt="" />{" "}
                                <span
                                  class="userTotalDeposits"
                                  id="freeCoinPer"
                                >
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
                                  setTableview(item.name);
                                }}
                              >
                                {item.buttonText}
                              </p>
                            </div>
                            <div className="cardtext-container">
                              <p className="cardtext">{item.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {tableview === item.name && (
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
                      value={referralLink}
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
                  <button className="maindescbut" style={{ marginTop: "0px" }}>
                    Promo Metarials
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
