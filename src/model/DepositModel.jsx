import React, { useEffect, useState } from "react";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import { useSelector } from "react-redux";

export default function DepositModel(props) {
  const { userInfo } = useSelector((state) => state.login);
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
    setInputPin,
    inputPin,
    isDepositMode,
    handleCancel,
    handleIsDeposit,
  } = props;

  return (
    <>
      <div
        className="modal fade show"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
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

            {/* {!userExist && walletAddress && (
              <form className="maincontform authFalse">
                <p>You need to register before deposition</p>
                <button className="maindescbut">Register Now</button>
                <div className="modaldash" style={{ top: "200px" }}></div>
              </form>
            )} */}

            {!userExist && (
              <>
                <form className="maincontform authFalse">
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
                      DAO amount here
                    </h6>
                  </div>
                  {!isDepositMode ? (
                    <>
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
                        {/* {!userInfo.securityPin ? (
                          <input
                            type="password"
                            value={userInfo.securityPin}
                            onChange={(e) => setInputPin(e.target.value)}
                          />
                        ) : (
                          <input
                            type="password"
                            placeholder="Enter Security Pin"
                            value={inputPin}
                            onChange={(e) => setInputPin(e.target.value)}
                          />
                        )} */}
                        <input
                          type="password"
                          // placeholder={
                          //   !userInfo.securityPin ? "Enter Security Pin" : ""
                          // }
                          value={userInfo.securityPin}
                          onChange={(e) => setInputPin(e.target.value)}
                          // disabled={!userInfo.securityPin}
                        />

                        {errors.pin && <p className="error">{errors.pin}</p>}
                      </div>
                    </>
                  ) : (
                    <div className="deposit-input-container">
                      <input
                        type="text"
                        value={`Main Wallet : ${props.mainInput}`}
                        readOnly
                      />
                      <input
                        type="text"
                        value={`Free Core : ${props.freeWallet}`}
                        readOnly
                      />
                      <input
                        type="text"
                        value={`Split Wallet : ${props.splitInput}`}
                        readOnly
                      />
                    </div>
                  )}
                  {isLoader ? (
                    <button className="maindescbut" type="button">
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </button>
                  ) : isDepositMode ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "10px",
                      }}
                    >
                      <button
                        className="maindescbut cancel"
                        type="button"
                        onClick={handleCancel}
                      >
                        CANCEL
                      </button>
                      <button
                        className="maindescbut"
                        type="button"
                        onClick={handleDeposit}
                      >
                        DEPOSIT NOW
                      </button>
                    </div>
                  ) : (
                    <button
                      className="maindescbut"
                      style={{ marginBottom: "10px" }}
                      type="button"
                      onClick={handleIsDeposit}
                    >
                      DEPOSIT NOW
                    </button>
                  )}
                </form>
                <div className="depositp">
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
                          <div className="table-container">
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
                                <thead
                                  className="k-grid-header "
                                  role="rowgroup"
                                >
                                  <tr role="row">
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      SNO
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Credit Amount
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Dated
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Description
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className="table-body">
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>mdo</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ))}

                  <div class="modaldesc">
                    <form class="maincontform" style={{ marginBottom: "0px" }}>
                      <label>Your referral link:</label>
                      <input
                        id="reflink"
                        type="text"
                        value={referralLink}
                        readOnly
                      />
                      <button
                        class="maindescbut buttoncopy"
                        onClick={handleCopy}
                      >
                        Copy referral link
                      </button>
                      {/* <a
                        href="#"
                        data-remodal-target="promo"
                        class="maindescbut"
                      >
                        Promo materials
                      </a> */}
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
