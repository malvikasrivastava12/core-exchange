import React, { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import axios from "axios";
import toast from "react-hot-toast";
import { URLApi } from "../Helper/Api_function";
import { userClaimedRegistrationTokenfn } from "../Helper/Web3";
import { useSelector } from "react-redux";
export default function WalletStatisticModal(props) {
  const {
    toggleWalletStatisticsModal,
    walletAddress,
    handleCopy,
    referralLink,
    walletStatisticModalData,
    tableview,
    setTableview,
    isFetch,
    setIsFetch,
    setLevelPaid,
  } = props;
  const [securityPin, setSecurityPin] = useState(false);
  const [newPasskey, setNewPasskey] = useState("");
  const [confirmPasskey, setConfirmPasskey] = useState("");
  const { userInfo } = useSelector((state) => state.login);
  console.log(userInfo.securityPin, "::::011211564");
  const [tableUser, setTableUser] = useState(0);

  const handleSecurityPin = () => {
    setSecurityPin((prev) => !prev);
  };

  const handleUpdatepasskey = async () => {
    if (newPasskey != confirmPasskey) {
      toast.error("Pin not match");
      setNewPasskey("");
      setConfirmPasskey("");
      return;
    }
    if (newPasskey == 0 || confirmPasskey == 0) {
      toast.error("Pin can not be zero");
      setNewPasskey("");
      setConfirmPasskey("");
      return;
    }
    if (newPasskey === confirmPasskey) {
      try {
        const response = await axios.post(`${URLApi}/securityPin`, {
          pin: newPasskey,
          user: walletAddress,
        });
        console.log(response, "response");
        if (response?.data?.status == 200) {
          toast.success(response?.data?.message);
          setIsFetch(!isFetch);
        } else {
          toast.error(response?.data?.message);
        }
        setNewPasskey("");
        setConfirmPasskey("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URLApi}/getLevelAndPaid`, {
          params: {
            user: walletAddress,
          },
        });
        console.log(response.data, "getLevelAndPaid1");

        setTableUser(response.data.data);
        setLevelPaid(response.data);
        console.log(response.data.all, "response.data.all");
        console.log(tableUser, "tableUser");
      } catch (error) {
        console.log("Error getLevelAndPaid :", error);
      }
    };

    fetchData();
  }, [walletAddress]);
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
                  DAO Wallet Address
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
              <div className="depositp">
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
                              onClick={async () => {
                                if (
                                  item?.id === 0 &&
                                  item.buttonText == "Claim now"
                                ) {
                                  await userClaimedRegistrationTokenfn();
                                  setIsFetch(!isFetch);
                                } else {
                                  setTableview(item.id);
                                }
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
                              <thead className="k-grid-header " role="rowgroup">
                                <tr role="row">
                                  <th
                                    role="columnheader"
                                    data-field="SNO"
                                    data-title="Name"
                                    class="k-header"
                                  >
                                    Level
                                  </th>
                                  <th
                                    role="columnheader"
                                    data-field="SNO"
                                    data-title="Name"
                                    class="k-header"
                                  >
                                    User
                                  </th>
                                </tr>
                              </thead>
                              {tableUser &&
                                tableUser?.map((user) => (
                                  <tbody
                                    className="table-body"
                                    key={user.id || user.level}
                                  >
                                    <tr>
                                      <td>{user?.level}</td>
                                      <td>{user?.people}</td>
                                    </tr>
                                  </tbody>
                                ))}
                              {/* <tbody className="table-body">
                                <tr>
                                  <td>Mark</td>
                                  <td>Mark</td>
                                </tr>
                              </tbody> */}
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
                      type="text"
                      placeholder=""
                      value={walletAddress}
                      readOnly
                    />
                    <button class="maindescbut buttoncopy" onClick={handleCopy}>
                      Copy referral link
                    </button>
                    {!userInfo.securityPin ? (
                      <div>
                        {!securityPin ? (
                          // Show this button when securityPin is false
                          <button
                            className="maindescbut"
                            onClick={handleSecurityPin}
                          >
                            Security Pass Code
                          </button>
                        ) : (
                          // Show this form when securityPin is true
                          <>
                            <label>
                              Specify deposit and withdrawal security pin here
                            </label>
                            <div className="deposit-input-container">
                              <input
                                type="password"
                                placeholder="New Pass Key"
                                value={newPasskey}
                                onChange={(e) => setNewPasskey(e.target.value)}
                              />
                              <input
                                type="password"
                                placeholder="Confirm New Pass Key"
                                value={confirmPasskey}
                                onChange={(e) =>
                                  setConfirmPasskey(e.target.value)
                                }
                              />
                              <button
                                className="maindescbut"
                                onClick={handleUpdatepasskey}
                              >
                                Update
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div
                        class="maincontform authTrue d-block "
                        style={{ width: "fit-content" }}
                      >
                        <h3
                          className="h3"
                          style={{ fontSize: "18px", opacity: "0.7" }}
                        >
                          Your PIN has already been setup.
                        </h3>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
