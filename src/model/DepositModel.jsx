import React, { useEffect, useState } from "react";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import { useSelector } from "react-redux";
import {
  getUserDepositList,
  getWithdrawHistoryfn,
  getInvestmentHistoryfn,
  getLeftCoreWalletfn,
  getLeftSplitWalletfn,
  updateDownlinefn,
} from "../Helper/Api_function";
import {
  Depositfn,
  getReturnVirtualTokenAmountCanBeUsed,
  returnAvailableSplitWalletFundfn,
  TotalClaimableIncomefn,
  TotalIncomefn,
  UserDetailsfn,
  withdrawBalancefn,
  setReturnWithdrawBalancefn,
} from "../Helper/Web3";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";
import { IoMdFastforward } from "react-icons/io";
import { IoPlayBackSharp } from "react-icons/io5";
export default function DepositModel(props) {
  const { userInfo } = useSelector((state) => state.login);
  const {
    referralLink,
    walletAddress,
    userExist,
    toggleMakeDepositModal,
    handleCopy,
    setIsFetch,
    isFetch,
  } = props;

  const [isDepositMode, setIsDepositMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [tableview, setTableview] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [userReferer, setUserReferer] = useState("");

  const [depositHistory, setDepositHistory] = useState([]);
  const [viewDepositHistoryTable, setViewDepositHistoryTable] = useState("");

  const [inputDeposit, setInputDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [inputPinWithdwaw, setInputPinWithdwaw] = useState("");
  const [viewSplitwalletTable, setViewSplitwalletTable] = useState("");
  const [freeWallet, setFreeWallet] = useState(0);
  const [mainInput, setMainInput] = useState(0);
  const [splitInput, setSplitInput] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [isDepositFunction, setIsDepositFunction] = useState(false);
  const [myInvestment, setMyInvestment] = useState([]);
  const [viewMyInvestmentTable, setViewMyInvestmentTable] = useState("");
  const [myReInvestment, setMyReInvestment] = useState([]);
  const [viewMyReInvestmentTable, setViewMyReInvestmentTable] = useState("");
  const [balance, setBalance] = useState(0);
  const [transferToWallet, setTransferToWallet] = useState(0);
  const [transferToSplitWallet, setTransferToSplitWallet] = useState(0);
  const [reinvestwallet, setReinvestwallet] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState([]);
  const [viewTotalWithdrawTable, setViewTotalWithdrawTable] = useState("");
  const [splitWallet, setSplitWallet] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  const [reInvest, setReInvest] = useState(0);
  const [leftSplitWallet, setLeftSplitWallet] = useState(0);
  const [leftFreeCoreHistory, setLeftFreeCoreHistory] = useState([]);
  const [viewLeftFreeCoreTable, setViewLeftFreeCoreTable] = useState("");

  const [leftSplitWalletHistory, setleftSplitWalletHistory] = useState([]);
  const [viewLeftSplitWalletTable, setViewLeftSplitWalletTable] = useState("");

  const [leftFreeCore, setLeftFreeCore] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTable, setDataTable] = useState({ data: [], pageinate: {} });
  const totalItems = dataTable?.pageinate?.totalCount || 0;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleSecurityPin = () => {
    setSecurityPin((prev) => !prev);
  };

  // function resetpage() {
  //   setCurrentPage(1);
  // }

  const [previousTable, setPreviousTable] = useState(-1);
  function resetpage(id) {
    setCurrentPage(1);
    console.log(previousTable, "previosuTable:::::::::::");
    setPreviousTable(id);
    if (previousTable != -1 && previousTable == 0) {
      setViewSplitwalletTable("");
      console.log(id, "::::::::::::::");
    } else if (previousTable != -1 && previousTable == 1) {
      setViewLeftFreeCoreTable("");
    } else if (previousTable != -1 && previousTable == 2) {
      setViewLeftSplitWalletTable("");
    } else if (previousTable != -1 && previousTable == 3) {
      setViewDepositHistoryTable("");
    } else if (previousTable != -1 && previousTable == 4) {
      setViewTotalWithdrawTable("");
    } else if (previousTable != -1 && previousTable == 6) {
      setViewMyInvestmentTable("");
    } else if (previousTable != -1 && previousTable == 7) {
      setViewMyReInvestmentTable("");
    }

    console.log(id, ":::::::shfsdjjsasdgk");
    if (previousTable == 1) {
    }
  }

  const handleAmountInputChange = (event) => {
    setInputAmount(event.target.value);
  };
  const handleCancel = () => {
    setInputAddress("");
    setInputAmount("");
    setInputPin("");
    setIsDepositMode(false);
  };
  const handleMyReInvestment = async (page) => {
    if (walletAddress) {
      const data = await getWithdrawHistoryfn(
        walletAddress,
        page,
        itemsPerPage
      );
      setReInvest(data.totalReinvestment);
      setDataTable({
        data: Array.isArray(data?.data) ? data?.data : [],
        pageinate: data,
      });
      // setMyReInvestment(data.data);
      // setTotalWithdraw(data.data);
      setSplitWallet(data.splitWallet);
    }
  };

  // console.log(splitWallet, "splitWallet");

  const handleTotalWithdraw = async () => {
    if (walletAddress) {
      const TotalClaimableIncome = await TotalClaimableIncomefn(walletAddress);
      const TotalIncome = await TotalIncomefn(walletAddress);
      setTotalWithdrawn(TotalIncome / 1e18);
      // setTotalWithdrawn(TotalIncome / 1e18);
      // console.log(TotalIncome / 1e18?.toFixed(2), "TotalIncome");
    }
  };

  const handleBalance = async () => {
    if (walletAddress) {
      const TotalClaimableIncome = await TotalClaimableIncomefn(walletAddress);
      setBalance(Number(TotalClaimableIncome) / 1e18);
    }
  };

  const handleDepositHistory = async (page) => {
    if (walletAddress) {
      const data = await getUserDepositList(walletAddress, page, itemsPerPage);
      // console.log(data, "::::::::::in getUserDepositList");
      setDataTable({
        data: Array.isArray(data?.data) ? data?.data : [],
        pageinate: data,
      });
      // setDepositHistory(Array.isArray(data.data) ? data.data : []);
    }
  };

  const handleMyInvestment = async (page) => {
    if (walletAddress) {
      const data = await getInvestmentHistoryfn(
        walletAddress,
        page,
        itemsPerPage
      );
      setDataTable({
        data: Array.isArray(data?.data) ? data?.data : [],
        pageinate: data,
      });
      // setMyInvestment(data.data);
    }
  };

  // left free and split
  const handleLeftFreeCoreHistory = async (page) => {
    if (walletAddress) {
      const data = await getLeftCoreWalletfn(walletAddress, page, itemsPerPage);
      setDataTable({
        data: Array.isArray(data?.data) ? data?.data : [],
        pageinate: data,
      });
      // setLeftFreeCoreHistory(data.data);
      console.log(data, "Left Free core");
    }
  };
  // const handleLeftFreeCoreHistory = async () => {
  //   if (walletAddress) {
  //     const data = await getLeftCoreWalletfn(walletAddress);
  //     setLeftFreeCoreHistory(data.data);
  //     console.log(data, "Left Free core");
  //   }
  // };

  const handleSplitFreeWallet = async (page) => {
    if (walletAddress) {
      const data = await getLeftSplitWalletfn(
        walletAddress,
        page,
        itemsPerPage
      );
      setDataTable({
        data: Array.isArray(data?.data) ? data?.data : [],
        pageinate: data,
      });
      // setleftSplitWalletHistory(data.data);
      // console.log(data, "Left split wallet");
    }
  };

  // left free and split
  const inputWithdraws = async () => {
    const data = await setReturnWithdrawBalancefn(walletAddress);
    console.log(data, "inputWithdraws");
    const walletinput = Number(data[0]) / 1e18;
    const splitwalletinput = Number(data[1]) / 1e18;
    const reInvestWalletinput = Number(data[2]) / 1e18;
    setTransferToWallet(walletinput);
    setTransferToSplitWallet(splitwalletinput);
    setReinvestwallet(reInvestWalletinput);
  };

  const handleLeftSplitWallet = async () => {
    const data = await returnAvailableSplitWalletFundfn(walletAddress);
    setLeftSplitWallet(data / 1e18);
    // console.log(data, "Left Split Wallet :::::::::::::::::");
  };

  useEffect(() => {
    if (walletAddress) {
      handleMyReInvestment(currentPage);
      handleBalance();
      handleTotalWithdraw();

      handleLeftSplitWallet();
      console.log(isFetch, "isFetch");
    }
  }, [walletAddress, isFetch]);

  const handleMainandFreeCore = async (walletAddress, inputAmount, rank) => {
    console.log(walletAddress, inputAmount, rank, ":::::::::::1254125152");
    const virtualToken = await getReturnVirtualTokenAmountCanBeUsed(
      walletAddress,
      inputAmount,
      rank
    );
    console.log(rank, virtualToken, ":::::123456");

    const freeCore = Number(virtualToken[0]) / 1e18;
    const split = Number(virtualToken[1]) / 1e18;
    setFreeWallet(freeCore?.toFixed(2));
    setSplitInput(split?.toFixed(2));
    setMainInput((inputAmount - (split + freeCore))?.toFixed(2));
    console.log(freeCore, split, mainInput, virtualToken, "virtualToken");
  };

  const handleIsDeposit = async () => {
    try {
      const newErrors = { amt: "", adr: "", pin: "" };

      if (!inputAmount) {
        newErrors.amt = "Transaction amount is required.";
      }
      console.log(inputAddress, "inputAddress");
      if (!inputAddress) {
        newErrors.adr = "Address is required.";
      }
      if (!inputPin) {
        newErrors.pin = "Security Pin  is required.";
      }
      console.log(newErrors, "newErrors");
      setErrors(newErrors);

      if (newErrors.amt != "" || newErrors.adr != "" || newErrors.pin != "") {
        setTimeout(() => {
          setErrors({ amt: "", adr: "", pin: "" });
        }, 3000);
        return;
      }

      console.log(userInfo?.securityPin, "userInfo?.securityPin", inputPin);
      if (inputPin == userInfo?.securityPin) {
        setIsDepositMode(true);
      } else {
        toast.error("Security Pin is Incorrect");
      }
      // setIsDepositMode(true);

      const rank = await UserDetailsfn(walletAddress);
      console.log(rank, "::::::::::215445445");
      handleMainandFreeCore(walletAddress, inputAmount, rank[9]);
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleDeposit = async () => {
    const newErrors = { amt: "", adr: "", pin: "" };

    if (!inputAmount) {
      newErrors.amt = "Transaction amount is required.";
    }
    console.log(inputAddress, "inputAddress");
    if (!inputAddress) {
      newErrors.adr = "Address is required.";
    }
    if (!inputPin) {
      newErrors.pin = "Security Pin  is required.";
    }
    console.log(newErrors, "newErrors");
    setErrors(newErrors);

    if (newErrors.amt != "" || newErrors.adr != "" || newErrors.pin != "") {
      setTimeout(() => {
        setErrors({ amt: "", adr: "", pin: "" });
      }, 3000);
      return;
    }

    setIsLoader(true);

    if (walletAddress) {
      try {
        if (!userExist) {
          toast.error("Please register yourself");
          setIsLoader(false); // Ensure loader is stopped
          return;
        }

        const responseDownline = await updateDownlinefn(
          walletAddress,
          inputAddress
        );

        console.log(responseDownline, "Downline:::");
        if (responseDownline.success === true) {
          await Depositfn(mainInput, inputAmount, inputAddress);
          setIsLoader(false);

          setTimeout(() => {
            setIsFetch(!isFetch);
          }, 4000);

          console.log(userExist, "isUserExist");
        } else {
          toast.error("Invalid Downline User!!");
          setIsLoader(false);
          return;
        }
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error("An unexpected error occurred");
        setIsLoader(false);
      }
    }

    setIsDepositMode(false);
    setInputAmount("");
    setInputAddress("");
  };
  const handleWithdraw = async () => {
    await withdrawBalancefn();
    setIsWithdraw(false);
    setTimeout(() => {
      setIsFetch(!isFetch);
    }, 3000);
  };

  const handleCancelWithdraw = () => {
    setIsWithdraw(false);
  };

  useEffect(() => {
    UserDetailsfn(walletAddress).then((res) => {
      setUserDetails(res);
      setTimeout(() => {
        setIsDepositFunction(!isDepositFunction);
      }, 4000);
    });
  }, [walletAddress, isDepositFunction, isFetch]);

  // const handlePrevious = () => {
  //   if (currentPage > 1) {
  //     const newPage = currentPage - 1;
  //     setCurrentPage(newPage);
  //     handleRankReward(newPage); // Fetch data for the previous page
  //   }
  // };

  const handlePrevious = async (id) => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (id === 0) {
        await handleMyReInvestment(newPage);
      } else if (id === 1) {
        await handleLeftFreeCoreHistory(newPage);
      } else if (id === 2) {
        await handleSplitFreeWallet(newPage);
      } else if (id === 3) {
        await handleDepositHistory(newPage);
      } else if (id === 4) {
        await handleMyReInvestment(newPage);
      } else if (id === 6) {
        await handleMyInvestment(newPage);
      } else if (id === 7) {
        await handleMyReInvestment(newPage);
      }
    }
  };

  const handleNext = async (id) => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (id === 0) {
        await handleMyReInvestment(newPage);
      } else if (id === 1) {
        await handleLeftFreeCoreHistory(newPage);
      } else if (id === 2) {
        await handleSplitFreeWallet(newPage);
      } else if (id === 3) {
        await handleDepositHistory(newPage);
      } else if (id === 4) {
        await handleMyReInvestment(newPage);
      } else if (id === 6) {
        await handleMyInvestment(newPage);
      } else if (id === 7) {
        await handleMyReInvestment(newPage);
      }
    }
  };

  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     const newPage = currentPage + 1;
  //     setCurrentPage(newPage);
  //     handleRankReward(newPage); // Fetch data for the next page
  //   }
  // };

  const MakeDepositModalData = [
    {
      id: 0,
      label1: "Split Wallet :",
      value: splitWallet?.toFixed(2) ?? 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "SW",
    },
    {
      id: 1,
      label1: "Left Free Core :",
      value: userDetails?.[11]
        ? (Number(userDetails[11]) / 1e18)?.toFixed(2)
        : 0.0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "LFPOP",
    },
    {
      id: 2,
      label1: "Left Split Wallet :",
      value: leftSplitWallet?.toFixed(2) || 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "LSW",
    },
    {
      id: 6,
      label1: "My Investment :",
      value:
        (Number(userInfo?.depositWallet ?? 0) - Number(reInvest ?? 0)).toFixed(
          2
        ) ?? 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "MI",
    },
    {
      id: 7,
      label1: "My Re-investment :",
      value: reInvest?.toFixed(2) ?? 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "MRI",
    },
    {
      id: 3,
      label1: "Total Investment :",
      value:
        Number(userDetails[5]) / 1e18 > 0
          ? (Number(userDetails[5]) / 1e18)?.toFixed(2)
          : 0,
      label2: "",
      buttonText: "Deposit History",
      image: DAOIcon,
      name: "TI",
    },
    {
      id: 4,
      label1: "Total withdrawn :",
      value: totalWithdrawn?.toFixed(2) ?? 0,
      label2: "",
      buttonText: "Withdraw History",
      image: DAOIcon,
      name: "TW",
    },

    {
      id: 5,
      label1: "Balance :",
      value: balance?.toFixed(2) ?? 0,
      label2: "Request withdraw:",
      buttonText: "Withdraw ",
      image: DAOIcon,
      name: "B",
      text: "**In the event of an unsuccessful withdrawal resulting in a zero balance display, re-initiate the withdrawal process, disregarding the current balance state. This will re-trigger the pending withdrawal request, facilitating the successful transfer of funds to your designated wallet address*",
    },
  ];

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

            {!userExist && walletAddress && (
              <form className="maincontform authFalse">
                <p>You need to register before deposition</p>
                <button className="maindescbut">Register Now</button>
                <div className="modaldash" style={{ top: "200px" }}></div>
              </form>
            )}

            {userExist && (
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
                          value={inputPin}
                          // value={
                          //   userInfo.securityPin ? userInfo.securityPin : ""
                          // }
                          onChange={(e) => setInputPin(e.target.value)}
                        />

                        {errors.pin && <p className="error">{errors.pin}</p>}
                      </div>
                    </>
                  ) : (
                    <div className="deposit-input-container">
                      <input
                        type="text"
                        value={`Main Wallet : ${mainInput}`}
                        readOnly
                      />
                      <input
                        type="text"
                        value={`Free Core : ${freeWallet}`}
                        readOnly
                      />
                      <input
                        type="text"
                        value={`Split Wallet : ${splitInput}`}
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
                                <img src={item.image} alt="" />
                                <span
                                  class="userTotalDeposits"
                                  id="freeCoinPer"
                                >
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
                                      resetpage(0);
                                      setViewSplitwalletTable(item.id);
                                      handleMyReInvestment(currentPage);
                                    } else if (item?.id === 1) {
                                      resetpage(1);
                                      setViewLeftFreeCoreTable(item.id);
                                      handleLeftFreeCoreHistory(currentPage);
                                    } else if (item?.id === 2) {
                                      resetpage(2);
                                      setViewLeftSplitWalletTable(item.id);
                                      handleSplitFreeWallet(currentPage);
                                    } else if (item?.id === 3) {
                                      resetpage(3);
                                      await handleDepositHistory(currentPage);
                                      setViewDepositHistoryTable(item.id);
                                    } else if (item?.id === 4) {
                                      resetpage(4);
                                      setViewTotalWithdrawTable(item.id);
                                      handleMyReInvestment(currentPage);
                                    } else if (item?.id === 6) {
                                      resetpage(6);
                                      setViewMyInvestmentTable(item.id);
                                      handleMyInvestment(currentPage);
                                    } else if (item?.id === 7) {
                                      resetpage(7);
                                      setViewMyReInvestmentTable(item.id);
                                      handleMyReInvestment(currentPage);
                                    }
                                    // else {
                                    //   setTableview(item.id);
                                    // }
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
                                            if (
                                              userInfo?.securityPin ==
                                              inputPinWithdwaw
                                            ) {
                                              setIsWithdraw(true);
                                              inputWithdraws();
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
                                        <div className="deposit-input-container">
                                          <input
                                            type="text"
                                            value={`Transfer to wallet (Core) : ${transferToWallet?.toFixed(
                                              2
                                            )}`}
                                            readOnly
                                          />
                                          <input
                                            type="text"
                                            value={`Transfer to Split Wallet(Core) : ${transferToSplitWallet?.toFixed(
                                              2
                                            )}`}
                                            readOnly
                                          />
                                          <input
                                            type="text"
                                            value={`Re-Invest(Core) : ${reinvestwallet?.toFixed(
                                              2
                                            )} `}
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
                                              onClick={handleWithdraw}
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

                      {viewSplitwalletTable === item.id && item.id === 0 && (
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
                                      Credit Amount
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
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
                                {dataTable?.data?.length > 0 && (
                                  <tbody className="table-body">
                                    {dataTable?.data?.map((user, index) => (
                                      <tr className="" key={index}>
                                        <td>
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>
                                          {user?.splitBalance?.toFixed(2)}
                                        </td>
                                        <td>
                                          {moment(user.createdAt).format(
                                            "M/D/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                        <td>
                                          {`Withdrawal Request Of ${(
                                            user?.splitBalance +
                                            user?.topupBalance +
                                            user?.wallet
                                          ).toFixed(2)}`}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </table>

                              {dataTable?.data?.length === 0 && (
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
                                <IoPlayBackSharp />
                              </a>
                              <a
                                className={`k-link k-pager-nav ${
                                  currentPage === 1 ? "k-state-disabled" : ""
                                }`}
                                aria-controls="DataTables_Table_0"
                                onClick={() => handlePrevious(item.id)}
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
                                onClick={() => handleNext(item.id)}
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
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoMdFastforward />
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
                        </>
                      )}
                      {viewDepositHistoryTable === item.id && item.id === 3 && (
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
                                      Address
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Amount
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Required Core
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Main Core
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Free Core
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Split Core
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      InvestOn
                                    </th>
                                  </tr>
                                </thead>
                                {dataTable?.data?.length > 0 && (
                                  <tbody className="table-body">
                                    {dataTable?.data?.map((user, index) => (
                                      <tr key={index}>
                                        <td>
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{user?.user}</td>
                                        <td>{user?.amount?.toFixed(2)}</td>
                                        <td>{user?.amount?.toFixed(2)}</td>
                                        <td>
                                          {(
                                            user?.amount - user?.offAmount
                                          ).toFixed(2)}
                                        </td>
                                        <td>{user?.level?.toFixed(2)}</td>
                                        <td>{user?.splitWallet?.toFixed(2)}</td>
                                        <td>
                                          {moment(user.createdAt).format(
                                            "M/D/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}

                                {/* <tbody className="table-body">
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>mdo</td>
                                  </tr>
                                </tbody> */}
                              </table>

                              {dataTable?.data?.length === 0 && (
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
                                <IoPlayBackSharp />
                              </a>
                              <a
                                className={`k-link k-pager-nav ${
                                  currentPage === 1 ? "k-state-disabled" : ""
                                }`}
                                aria-controls="DataTables_Table_0"
                                onClick={() => handlePrevious(item.id)}
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
                                onClick={() => handleNext(item.id)}
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
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoMdFastforward />
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
                        </>
                      )}

                      {viewLeftFreeCoreTable === item.id && item.id === 1 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewLeftFreeCoreTable("")}
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
                                      Used For
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Debit Amount
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Dated
                                    </th>
                                  </tr>
                                </thead>
                                {dataTable?.data?.length > 0 && (
                                  <tbody className="table-body">
                                    {dataTable?.data?.map((user, index) => (
                                      <tr key={index}>
                                        <td>
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{user?.user}</td>
                                        <td>{user?.level?.toFixed(2)}</td>
                                        <td>
                                          {moment(user.createdAt).format(
                                            "M/D/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </table>

                              {dataTable?.data?.length === 0 && (
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
                                <IoPlayBackSharp />
                              </a>
                              <a
                                className={`k-link k-pager-nav ${
                                  currentPage === 1 ? "k-state-disabled" : ""
                                }`}
                                aria-controls="DataTables_Table_0"
                                onClick={() => handlePrevious(item.id)}
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
                                onClick={() => handleNext(item.id)}
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
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoMdFastforward />
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
                        </>
                      )}

                      {viewLeftSplitWalletTable === item.id &&
                        item.id === 2 && (
                          <>
                            <div className="table-container">
                              <div
                                className="d-flex align-items-center justify-content-center"
                                onClick={() => setViewLeftSplitWalletTable("")}
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
                                        Used For
                                      </th>
                                      <th
                                        role="columnheader"
                                        data-field="SNO"
                                        data-title="Name"
                                        class="k-header"
                                      >
                                        Debit Amount
                                      </th>

                                      <th
                                        role="columnheader"
                                        data-field="Name"
                                        data-title="Name"
                                        class="k-header"
                                      >
                                        Dated
                                      </th>
                                    </tr>
                                  </thead>
                                  {dataTable?.data?.length > 0 && (
                                    <tbody className="table-body">
                                      {dataTable?.data?.map((user, index) => (
                                        <tr key={index}>
                                          <td>
                                            {(currentPage - 1) * itemsPerPage +
                                              index +
                                              1}
                                          </td>
                                          <td>{user?.user}</td>
                                          <td>
                                            {user?.splitWallet?.toFixed(2)}
                                          </td>
                                          <td>
                                            {moment(user.createdAt).format(
                                              "M/D/YYYY h:mm:ss A"
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  )}
                                </table>

                                {dataTable?.data?.length === 0 && (
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
                                  <IoPlayBackSharp />
                                </a>
                                <a
                                  className={`k-link k-pager-nav ${
                                    currentPage === 1 ? "k-state-disabled" : ""
                                  }`}
                                  aria-controls="DataTables_Table_0"
                                  onClick={() => handlePrevious(item.id)}
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
                                  onClick={() => handleNext(item.id)}
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
                                  <IoCaretForwardOutline />
                                </a>
                                <a
                                  class="k-link k-pager-nav k-state-disabled"
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="3"
                                  tabindex="0"
                                  id="DataTables_Table_0_next"
                                >
                                  <IoMdFastforward />
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
                          </>
                        )}

                      {viewMyInvestmentTable === item.id && item.id === 6 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewMyInvestmentTable("")}
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
                                      Amount
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Dated
                                    </th>
                                  </tr>
                                </thead>
                                {dataTable?.data?.length > 0 && (
                                  <tbody className="table-body">
                                    {dataTable?.data?.map((user, index) => (
                                      <tr key={index}>
                                        <td>
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>{user?.amount?.toFixed(2)}</td>
                                        <td>
                                          {moment(user.createdAt).format(
                                            "M/D/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </table>

                              {dataTable?.data?.length === 0 && (
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
                                <IoPlayBackSharp />
                              </a>
                              <a
                                className={`k-link k-pager-nav ${
                                  currentPage === 1 ? "k-state-disabled" : ""
                                }`}
                                aria-controls="DataTables_Table_0"
                                onClick={() => handlePrevious(item.id)}
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
                                onClick={() => handleNext(item.id)}
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
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoMdFastforward />
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
                        </>
                      )}
                      {viewMyReInvestmentTable === item.id && item.id === 7 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewMyReInvestmentTable("")}
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
                                      Amount
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Dated
                                    </th>
                                  </tr>
                                </thead>
                                {dataTable?.data?.length > 0 && (
                                  <tbody className="table-body">
                                    {dataTable?.data?.map((user, index) => (
                                      <tr key={index}>
                                        <td>
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>
                                          {user?.topupBalance?.toFixed(2)}
                                        </td>
                                        <td>
                                          {moment(user.createdAt).format(
                                            "M/D/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </table>

                              {dataTable?.data?.length === 0 && (
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
                                <IoPlayBackSharp />
                              </a>
                              <a
                                className={`k-link k-pager-nav ${
                                  currentPage === 1 ? "k-state-disabled" : ""
                                }`}
                                aria-controls="DataTables_Table_0"
                                onClick={() => handlePrevious(item.id)}
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
                                onClick={() => handleNext(item.id)}
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
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoMdFastforward />
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
                        </>
                      )}
                      {viewTotalWithdrawTable === item.id && item.id === 4 && (
                        <>
                          <div className="table-container">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setViewTotalWithdrawTable("")}
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
                                      Amount(CORE)
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Re-Invest(CORE)
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Wallet(CORE)
                                    </th>
                                    <th
                                      role="columnheader"
                                      data-field="SNO"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Split-Wallet(CORE)
                                    </th>

                                    <th
                                      role="columnheader"
                                      data-field="Name"
                                      data-title="Name"
                                      class="k-header"
                                    >
                                      Date
                                    </th>
                                  </tr>
                                </thead>
                                {dataTable?.data?.length > 0 && (
                                  <tbody className="table-body">
                                    {dataTable?.data?.map((user, index) => (
                                      <tr key={index}>
                                        <td>
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </td>
                                        <td>
                                          {(
                                            user?.topupBalance +
                                            user?.wallet +
                                            user?.splitBalance
                                          ).toFixed(2)}
                                        </td>
                                        <td>
                                          {user?.topupBalance?.toFixed(2)}
                                        </td>
                                        <td>{user?.wallet?.toFixed(2)}</td>
                                        <td>
                                          {user?.splitBalance?.toFixed(2)}
                                        </td>
                                        <td>
                                          {moment(user.createdAt).format(
                                            "M/D/YYYY h:mm:ss A"
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </table>

                              {dataTable?.data?.length === 0 && (
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
                                <IoPlayBackSharp />
                              </a>
                              <a
                                className={`k-link k-pager-nav ${
                                  currentPage === 1 ? "k-state-disabled" : ""
                                }`}
                                aria-controls="DataTables_Table_0"
                                onClick={() => handlePrevious(item.id)}
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
                                onClick={() => handleNext(item.id)}
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
                                <IoCaretForwardOutline />
                              </a>
                              <a
                                class="k-link k-pager-nav k-state-disabled"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx="3"
                                tabindex="0"
                                id="DataTables_Table_0_next"
                              >
                                <IoMdFastforward />
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
