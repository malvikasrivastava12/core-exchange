import React, { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import axios from "axios";
import toast from "react-hot-toast";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import {
  URLApi,
  getDirectTeam,
  getFetchTeams,
  setUserSecurityPin,
  getMagicBoosterHistoryfn,
  getMagicIncomeHistoryfn,
  getStarIncomeHistoryfn,
  getRoiOfUserfn,
} from "../Helper/Api_function";
import {
  userClaimedRegistrationTokenfn,
  UserDetailsfn,
  ReturnUserQualificationLengthfn,
  TotalClaimableIncomefn,
  TotalIncomefn,
} from "../Helper/Web3";
import { useSelector } from "react-redux";

export default function WalletStatisticModal(props) {
  const {
    toggleWalletStatisticsModal,
    walletAddress,
    handleCopy,
    referralLink,
    isFetch,
    setIsFetch,
    userExist,
  } = props;
  const [tableview, setTableview] = useState("");
  const [levelPaid, setLevelPaid] = useState({});

  const [securityPin, setSecurityPin] = useState(false);
  const [newPasskey, setNewPasskey] = useState("");
  const [confirmPasskey, setConfirmPasskey] = useState("");
  const { userInfo } = useSelector((state) => state.login);
  const [directTeam, setDirectTeam] = useState([]);
  // const [levelTeam, setLevelTeam] = useState([]);
  const [C50Team, setC50Team] = useState([]);
  const [magicIncome, setMagicIncome] = useState([]);
  const [magicBooster, setMagicBooster] = useState([]);
  const [rankReward, setRankReward] = useState({ data: [], pageinate: {} });
  const [isloading, setIsLoading] = useState(-1);
  const [viewC50TeamTable, setViewC50TeamTable] = useState("");
  const [viewLevelTeamTable, setViewLevelTeamTable] = useState("");
  const [viewDirectTeamTable, setViewDirectTeamTable] = useState("");
  const [viewMagicBoosterTable, setViewMagicBoosterTable] = useState("");
  const [viewMagicIncomeHistoryTable, setViewMagicIncomeHistoryTable] =
    useState("");
  const [viewRankRewardHistoryTable, setViewRankRewardHistoryTable] =
    useState("");
  const [levelTeam, setLevelTeam] = useState([]);
  const [C50Income, setC50Income] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = rankReward?.pageinate?.totalCount || 0;
  const itemsPerPage = 2; // Or you can use rankReward?.itemsPerPage if available
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [rank, setRank] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  // const [filteredTeam, setFilteredTeam] = useState([]);
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
    if (!userExist) {
      toast.error("Wallet not Connected!!");
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
          // setTimeout(() => {
          //   setIsFetch(!isFetch);
          // }, 2000);
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
  const handleDirectTeam = async () => {
    if (userExist) {
      const data = await getDirectTeam(walletAddress);
      setDirectTeam(Array.isArray(data.data) ? data.data : []);
      // setIsLoading(-1);
    } else toast.error("Wallet is not connected!!");
  };

  const handleMagicBooster = async () => {
    if (userExist) {
      const data = await getMagicBoosterHistoryfn(walletAddress);
      setMagicBooster(Array.isArray(data.data) ? data.data : []);
      setIsLoading(-1);
    } else toast.error("Wallet is not connected!!");
  };

  const handleMagicIncome = async () => {
    if (userExist) {
      const data = await getMagicIncomeHistoryfn(walletAddress);
      setMagicIncome(Array.isArray(data.data) ? data.data : []);
      setIsLoading(-1);
    } else toast.error("Wallet is not connected!!");
  };

  const handleC50Income = async () => {
    const data = await getMagicIncomeHistoryfn(walletAddress);
    console.log(data, "::::::::::in getMagicIncomeHistoryfn");
    setMagicIncome(Array.isArray(data.data) ? data.data : []);
    setIsLoading(-1);
  };

  const ReturnUserQualificationLength = async () => {
    const UserQualificationLength = await ReturnUserQualificationLengthfn(
      walletAddress
    );
    // console.log(Number(UserQualificationLength), "UserQualificationLength");
    const C50IncomeRes = await getRoiOfUserfn(
      walletAddress,
      Number(UserQualificationLength)
    );
    setC50Income(C50IncomeRes.message);
    console.log("C50Income", C50IncomeRes, C50IncomeRes.deposits);
  };

  const handletotalEarned = async () => {
    const TotalClaimableIncome = await TotalClaimableIncomefn(walletAddress);
    setTotalEarned(TotalClaimableIncome / 1e18);
    // console.log(TotalClaimableIncome / 1e18?.toFixed(2), "totalEarned");
  };

  const handleTotalWithdraw = async () => {
    const TotalIncome = await TotalIncomefn(walletAddress);
    setTotalWithdraw(TotalIncome / 1e18);
    // console.log(TotalIncome / 1e18?.toFixed(2), "TotalIncome");
  };
  useEffect(() => {
    ReturnUserQualificationLength(walletAddress);
    handletotalEarned();
    handleTotalWithdraw();
  }, [walletAddress]);

  const handleRankReward = async () => {
    const data = await getStarIncomeHistoryfn(
      walletAddress,
      currentPage,
      itemsPerPage
    );
    console.log(data, "::::::::::in getStarIncomeHistoryfn");
    setRankReward({
      data: Array.isArray(data.data) ? data.data : [],
      pageinate: data,
    });
    setIsLoading(-1);

    console.log(rankReward, "rankReward==========");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URLApi}/getLevelAndPaid`, {
          params: {
            user: walletAddress,
          },
        });
        // console.log(response.data, "getLevelAndPaid1");

        setC50Team(response.data.data);
        setLevelPaid(response.data);
      } catch (error) {
        console.log("Error getLevelAndPaid :", error);
      }
    };

    fetchData();
  }, [walletAddress]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      handleRankReward(newPage); // Fetch data for the previous page
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      handleRankReward(newPage); // Fetch data for the next page
    }
  };

  const handleLevelTeam = async () => {
    if (walletAddress) {
      const data = await getFetchTeams(walletAddress);
      // console.log(walletAddress, "walletAddress");
      // console.log(data, "::::::::::in getFetchTeams11");
      const users = Array.isArray(data.data.users) ? data.data.users : [];
      // console.log(users, "directTeam");
      setLevelTeam(users);

      const filteredUsers = users.filter((user) => user.totalDeposit > 0);
      // console.log(filteredTeam?.length, ":::::::12231115");
      setFilteredTeam(filteredUsers?.length);
    }
  };

  useEffect(() => {
    handleLevelTeam();
  }, [walletAddress]);

  useEffect(() => {
    UserDetailsfn(walletAddress).then((res) => {
      console.log("UserDetailsfn response", res);
      setUserDetails(res);

      if (Number(res[10]) === Number(10 * 1e18)) {
        if (Number(res[9]) == 1) {
          setRank("BRONZE");
        } else if (Number(res[9]) == 2) {
          setRank("SILVER");
        } else if (Number(res[9]) == 3) {
          setRank("GOLD");
        } else if (Number(res[9]) == 4) {
          setRank("DIAMOND");
        }
      } else {
        setRank("Claim now");
      }
    });
  }, [walletAddress, isFetch]);

  const walletStatisticModalData = [
    {
      id: 0,
      label: "Total Free Core:",
      value:
        Number(userDetails[10]) / 1e18 > 0
          ? (
              Number(userDetails[10]) / 1e18 +
              Number(userDetails[12]) / 1e18
            ).toFixed(4)
          : 0,
      label2: "Request to get :",
      buttonText: rank,

      text: "Click Get button, and you will get instantly your today pool earnings as a single transaction. Your personal hold-bonus will be reseted.",
    },
    {
      id: 13,
      label: "Total Core Remaining Amount:",
      value:
        Number(userDetails[6]) / 1e18 > 0
          ? (Number(userDetails[6]) / 1e18 - totalWithdraw)?.toFixed(2)
          : 0,
      label2: "Request withdraw:",
      buttonText: "DAO User",
      image: DAOIcon,
      name: "TW",
    },

    {
      id: 1,
      label: "Level Team:",
      heading: "All/Paid",
      value: `${userInfo?.teamCount ?? 0}/${
        filteredTeam > 0 ? filteredTeam : 0
      }`,

      label2: "Click to View:",
      buttonText: "View Team",
      isTable: true,
    },
    {
      id: 2,
      label: "C50 Team",
      heading: "All/Paid",
      value: `${levelPaid?.all ?? 0}/${levelPaid?.paid ?? 0}`,
      label2: "Click to View:",
      buttonText: "View Team",
      isTable: true,
    },
    {
      id: 3,
      label: "C50 Capping",
      value: 0,
      label2: "Click to View:",
      buttonText: "View Team",
    },
    {
      id: 4,
      label: "Direct Businesses:",
      value: userInfo?.directBonus ?? 0,
      label2: "Click to View:",
      buttonText: "View Direct Team",
      image: DAOIcon,
    },
    {
      id: 5,
      label: "Total Businesses:",
      value: userInfo?.teamBusiness ?? 0,
      label2: "Click to View:",
      buttonText: "Magic Team",
      image: DAOIcon,
    },
    {
      id: 14,
      label: "Rank and Reward Income:",
      value: userInfo?.starRankIncome ?? 0,
      label2: "Request withdraw:",
      buttonText: "RANK AND REWARD HISTORY",
      image: DAOIcon,
      name: "B",
    },
    {
      id: 6,
      label: "Magic Income:",
      value: userInfo?.magicIncome ?? 0,
      label2: "Magic Income History:",
      buttonText: "Magic Income History",
      image: DAOIcon,
    },
    {
      id: 8,
      label: "C50 Income:",
      value: C50Income?.totalRoi?.toFixed(4),
      label2: "Recent Days Income Total:",
      buttonText: "C50 Income History",
      image: DAOIcon,
    },

    {
      id: 7,
      label: "C50 Flushed:",
      value: C50Income?.totalRoi && (C50Income?.totalRoi * 20)?.toFixed(4),
      label2: "C50 Flushed History:",
      buttonText: "C50 Flushed History",
      image: DAOIcon,
    },

    {
      id: 9,
      label: "Offer",
      value: userInfo?.magicBoosterIncome ?? 0,
      label2: "Offer Income History:",
      buttonText: "Offer Income History",
      image: DAOIcon,
    },

    {
      id: 10,
      label: "Offer Income:",
      value: 0,
      label2: "Offer Income History:",
      buttonText: "Offer Income History",
      image: DAOIcon,
    },

    {
      id: 11,
      label: "Total earned:",
      value: totalEarned?.toFixed(4),
      label2: "All Earning History:",
      buttonText: "All Earning History",
      image: DAOIcon,
    },

    {
      id: 12,
      label: "Total Withdrawn:",
      value: totalWithdraw?.toFixed(4),
      label2: "Withdraw History:",
      buttonText: "View History",
      image: DAOIcon,
    },
  ];
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
                <h6 className="d-flex justify-content-center align-items-center pb-2">
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
                <div className="d-flex flex-column gap-2 text-break">
                  <h6 style={{ paddingTop: "10px", fontSize: "14px" }}>
                    <IoIosLink />
                    Your Refferal link
                  </h6>
                  <a
                    href="javascript:(void:0)"
                    style={{ color: "#fd9500", lineHeight: "1.4" }}
                    className="custom-underline"
                    onClick={handleCopy}
                  >
                    {referralLink}
                  </a>
                  <p style={{ textAlign: "center", fontSize: "14px" }}>
                    Share this link with your partners to get free core
                  </p>
                </div>

                {/* <div className="modaldash"></div> */}
              </form>
              <div className="depositp">
                {walletStatisticModalData?.map((item, index) => (
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
                                {item.value}
                              </span>
                            </div>
                          </div>
                          <div class="modallinewrap">
                            {item.label2}
                            {isloading === item?.id ? (
                              <button className="maindescbut" type="button">
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </button>
                            ) : (
                              <p
                                type="button"
                                class="maindescbut getButton"
                                style={{ marginTop: "4px" }}
                                onClick={async () => {
                                  if (
                                    item?.id === 0 &&
                                    item.buttonText == "Claim now"
                                  ) {
                                    await userClaimedRegistrationTokenfn(
                                      walletAddress
                                    );
                                    setTimeout(() => {
                                      setIsFetch(!isFetch);
                                    }, 2000);
                                  } else if (item?.id === 1) {
                                    // setIsLoading(item?.id);
                                    // await handleLevelTeam();
                                    setViewLevelTeamTable(item.id);
                                  } else if (item?.id === 2) {
                                    // setIsLoading(item?.id);
                                    setViewC50TeamTable(item.id);
                                  } else if (item?.id === 4) {
                                    // setIsLoading(item?.id);
                                    await handleDirectTeam();
                                    setViewDirectTeamTable(item.id);
                                  } else if (item?.id === 5) {
                                    setIsLoading(item?.id);
                                    setViewLevelTeamTable(item.id);
                                  } else if (item?.id === 6) {
                                    setIsLoading(item?.id);
                                    await handleMagicIncome();
                                    setViewMagicIncomeHistoryTable(item.id);
                                  } else if (item?.id === 9) {
                                    setIsLoading(item?.id);
                                    await handleMagicBooster();
                                    setViewMagicBoosterTable(item.id);
                                  } else if (item?.id === 14) {
                                    setIsLoading(item?.id);
                                    await handleRankReward();
                                    setViewRankRewardHistoryTable(item.id);
                                  } else {
                                    setIsLoading(item?.id);
                                    setTableview(item.id);
                                  }
                                }}
                              >
                                {item.buttonText}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="cardtext-container">
                          <p className="cardtext">{item.text}</p>
                        </div>
                      </div>
                    </div>

                    {userExist &&
                      viewC50TeamTable === item.id &&
                      item.id === 2 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewC50TeamTable("")}
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
                                {C50Team &&
                                  C50Team?.map((user, index) => (
                                    <tbody className="table-body">
                                      <tr key={index}>
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

                              {C50Team.length === 0 && (
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
                    {userExist &&
                      viewDirectTeamTable === item.id &&
                      item.id === 4 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewDirectTeamTable("")}
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
                                      SNo
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Address
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Invested
                                    </th>
                                  </tr>
                                </thead>
                                {directTeam?.length > 0 &&
                                  directTeam?.map((user, index) => (
                                    <tbody className="table-body">
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user?.user}</td>
                                        <td>{user?.depositWallet}</td>
                                      </tr>
                                    </tbody>
                                  ))}
                              </table>
                              {directTeam.length === 0 && (
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
                                Displaying 1 to 7 out of 7 items
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                    {userExist &&
                      viewLevelTeamTable === item.id &&
                      (item.id === 1 || item.id === 5) && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewLevelTeamTable("")}
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
                                      Level
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Address
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Total Deposit
                                    </th>
                                  </tr>
                                </thead>
                                {levelTeam?.length > 0 &&
                                  levelTeam?.map((user, index) => (
                                    <tbody className="table-body">
                                      <tr key={index}>
                                        <td>{user?.level}</td>
                                        <td>{user?.user}</td>
                                        <td>{user?.totalDeposit}</td>
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
                              {levelTeam.length === 0 && (
                                <div className="p-4 d-flex justify-content-center">
                                  <div>No Data Found!</div>
                                </div>
                              )}
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
                          </div>
                        </>
                      )}
                    {/* magic booster is offer */}
                    {userExist &&
                      viewMagicBoosterTable === item.id &&
                      item.id === 9 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewMagicBoosterTable("")}
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
                                      Address
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Amount
                                    </th>
                                  </tr>
                                </thead>
                                {magicBooster?.length > 0 &&
                                  magicBooster?.map((user, index) => (
                                    <tbody className="table-body">
                                      <tr key={index}>
                                        <td>{user?.user}</td>
                                        <td>{user?.amount}</td>
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
                              {magicBooster.length === 0 && (
                                <div className="p-4 d-flex justify-content-center">
                                  <div>No Data Found!</div>
                                </div>
                              )}
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
                          </div>
                        </>
                      )}
                    {/* magic booster is offer */}

                    {userExist &&
                      viewMagicIncomeHistoryTable === item.id &&
                      item.id === 6 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewMagicIncomeHistoryTable("")}
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
                                      Address
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Amount
                                    </th>
                                  </tr>
                                </thead>
                                {magicIncome?.length > 0 &&
                                  magicIncome?.map((user, index) => (
                                    <tbody className="table-body">
                                      <tr key={index}>
                                        <td>{user?.user}</td>
                                        <td>{user?.amount}</td>
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
                              {magicIncome.length === 0 && (
                                <div className="p-4 d-flex justify-content-center">
                                  <div>No Data Found!</div>
                                </div>
                              )}
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
                          </div>
                        </>
                      )}

                    {userExist &&
                      viewRankRewardHistoryTable === item.id &&
                      item.id === 14 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewRankRewardHistoryTable("")}
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
                                      Address
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Reward
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Rank
                                    </th>
                                  </tr>
                                </thead>
                                {rankReward?.data?.length > 0 &&
                                  rankReward?.data?.map((user, index) => (
                                    <tbody className="table-body">
                                      <tr key={index}>
                                        <td>{user?.user}</td>
                                        <td>{user?.reward}</td>
                                        <td>{user?.starRank}</td>
                                      </tr>
                                    </tbody>
                                  ))}
                              </table>
                              {rankReward?.data?.length === 0 && (
                                <div className="p-4 d-flex justify-content-center">
                                  <div>No Data Found!</div>
                                </div>
                              )}
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
                                  className={`k-link k-pager-nav ${
                                    currentPage === 1 ? "k-state-disabled" : ""
                                  }`}
                                  aria-controls="DataTables_Table_0"
                                  onClick={handlePrevious}
                                  style={{
                                    cursor:
                                      currentPage === 1
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
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
                                      {currentPage}
                                    </a>
                                  </li>
                                </ul>
                                <a
                                  className={`k-link k-pager-nav ${
                                    currentPage === totalPages
                                      ? "k-state-disabled"
                                      : ""
                                  }`}
                                  aria-controls="DataTables_Table_0"
                                  onClick={handleNext}
                                  style={{
                                    cursor:
                                      currentPage === totalPages
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
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

                                <span className="k-pager-info k-label">
                                  {`Displaying ${
                                    (currentPage - 1) * itemsPerPage + 1
                                  } to ${Math.min(
                                    currentPage * itemsPerPage,
                                    totalItems
                                  )} out of ${totalItems} items`}
                                </span>
                              </div>
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
                          <button
                            className="maindescbut"
                            onClick={handleSecurityPin}
                          >
                            Security Pass Code
                          </button>
                        ) : (
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
