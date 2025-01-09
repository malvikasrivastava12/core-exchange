import React, { useEffect, useState } from "react";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import { useSelector } from "react-redux";
import { getUserDepositList } from "../Helper/Api_function";
import { getReturnVirtualTokenAmountCanBeUsed } from "../Helper/Web3";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import toast from "react-hot-toast";
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
  const handleSecurityPin = () => {
    setSecurityPin((prev) => !prev);
  };

  const [depositHistory, setDepositHistory] = useState([]);
  const [viewDepositHistoryTable, setViewDepositHistoryTable] = useState("");
  const handleDepositHistory = async () => {
    const data = await getUserDepositList(walletAddress);
    console.log(data, "::::::::::in getUserDepositList");
    setDepositHistory(Array.isArray(data.data) ? data.data : []);
    console.log(depositHistory, "depositHistory");
    console.log(walletAddress, "walletAddress-------");
  };
  const [inputDeposit, setInputDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [inputPinWithdwaw, setInputPinWithdwaw] = useState("");
  const [viewSplitwalletTable, setViewSplitwalletTable] = useState("");
  const handleCancelWithdraw = () => {
    setIsWithdraw("");
  };

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
            {/* 
            {!userExist && walletAddress && (
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
                    <h6 className="d-flex justify-content-center align-items-center pb-2">
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

                        <input
                          type="password"
                          placeholder="Enter Security Pin"
                          value={
                            userInfo.securityPin ? userInfo.securityPin : ""
                          }
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
                              {(item.id === 5
                                ? !inputDeposit && item.id === 5
                                : true) && (
                                <p
                                  type="button"
                                  class="maindescbut getButton"
                                  style={{ marginTop: "4px" }}
                                  onClick={async () => {
                                    if (item.id === 5) {
                                      setInputDeposit(true);
                                    } else if (item?.id === 0) {
                                      setViewSplitwalletTable(item.id);
                                    } else if (item?.id === 3) {
                                      await handleDepositHistory();
                                      setViewDepositHistoryTable(item.id);
                                    } else {
                                      setTableview(item.id);
                                    }
                                  }}
                                  // onClick={() => {

                                  //   if (item.id === 5) {
                                  //     setInputDeposit(true);
                                  //   } else setTableview(item.id);
                                  // }}
                                >
                                  {item.buttonText}
                                </p>
                              )}
                              {inputDeposit && item.id === 5 && (
                                <>
                                  {!isWithdraw ? (
                                    <div className="maincontform authFalse">
                                      <div
                                        className="deposit-input-container"
                                        style={{ paddingTop: "10px" }}
                                      >
                                        <input
                                          type="password"
                                          placeholder="Security Pin"
                                          value={inputPinWithdwaw}
                                          onChange={(e) => {
                                            console.log(e.target.value);
                                            setInputPinWithdwaw(e.target.value);
                                          }}
                                        />
                                        <button
                                          className="maindescbut"
                                          onClick={() => {
                                            console.log(
                                              inputPinWithdwaw,
                                              userInfo?.securityPin,
                                              "inputPinWithdwaw"
                                            );
                                            if (
                                              userInfo?.securityPin ==
                                              inputPinWithdwaw
                                            ) {
                                              setIsWithdraw(true);
                                            } else {
                                              toast.error("Pin Not Match!!");
                                            }
                                          }}
                                        >
                                          Withdraw
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="maincontform authFalse">
                                        {" "}
                                        <div className="deposit-input-container">
                                          <input
                                            type="text"
                                            value={`Transfer to wallet (Core) : 0`}
                                            readOnly
                                          />
                                          <input
                                            type="text"
                                            value={`Transfer to Split Wallet(Core) : 0`}
                                            readOnly
                                          />
                                          <input
                                            type="text"
                                            value={`Re-Invest(USD) : 0 `}
                                            readOnly
                                          />
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "5px",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <button
                                              className="maindescbut cancel"
                                              type="button"
                                              onClick={handleCancelWithdraw}
                                              style={{ width: "50%" }}
                                            >
                                              CANCEL
                                            </button>
                                            <button
                                              className="maindescbut"
                                              type="button"
                                              // onClick={handleDeposit}
                                            >
                                              Withdraw NOW
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </>
                              )}
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
                      {viewSplitwalletTable === item.id && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewSplitwalletTable("")}
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
                                      User Address
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Amount 123
                                    </th>
                                    {/* <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Description
                                    </th> */}
                                  </tr>
                                </thead>
                                {/* {depositHistory?.length > 0 &&
                                  depositHistory?.map((user, index) => (
                                    <tbody className="table-body" key={index}>
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{user?.user}</td>
                                        <td>{user?.depositWallet}</td>
                                      </tr>
                                    </tbody>
                                  ))} */}
                                <tbody className="table-body">
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                      {viewDepositHistoryTable === item.id && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewDepositHistoryTable("")}
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
                                      User Address
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Amount
                                    </th>
                                    {/* <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Description
                                    </th> */}
                                  </tr>
                                </thead>
                                {depositHistory?.length > 0 &&
                                  depositHistory?.map((user, index) => (
                                    <tbody className="table-body" key={index}>
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{user?.user}</td>
                                        <td>{user?.amount}</td>
                                      </tr>
                                    </tbody>
                                  ))}
                                {/* <tbody className="table-body">
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>mdo</td>
                                  </tr>
                                </tbody> */}
                              </table>

                              {depositHistory.length === 0 && (
                                <div className="p-4 d-flex justify-content-center">
                                  <div>No Data Found!</div>
                                </div>
                              )}
                            </div>

                            <div
                              class="k-pager-wrap k-grid-pager k-widget"
                              data-role="pager"
                            >
                              <a
                                class="k-link k-pager-nav  k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="0"
                                tabindex="0"
                                id="DataTables_Table_0_previous"
                              >
                                <IoCaretBackOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav  k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="0"
                                tabindex="0"
                                id="DataTables_Table_0_previous"
                              >
                                <IoCaretBackOutline />
                              </a>
                              <ul class="k-pager-numbers k-reset">
                                <li>
                                  <a
                                    class="k-state-selected"
                                    aria-controls="DataTables_Table_0"
                                    data-dt-idx="1"
                                    tabindex="0"
                                    value="1"
                                  >
                                    1
                                  </a>
                                </li>
                              </ul>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                {/* <i class="k-icon k-i-arrow-e"></i> */}
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoCaretForwardOutline />
                              </a>

                              <span class="k-pager-info k-label">
                                Displaying 1 to 7 out of 7 items{" "}
                              </span>
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
