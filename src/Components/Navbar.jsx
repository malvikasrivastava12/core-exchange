// import "../../src/styles/navbar.css";
import React, { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import DollarImage from "../assets/Images/dollar.png";
import { useAccount } from "wagmi";
import { base_url } from "../Helper/config";
import toast from "react-hot-toast";
import { Depositfn, UserDetailsfn } from "../Helper/Web3";
import { isUserExist } from "../Helper/Web3";
import { setUserExist, setUserInfo, setWallet } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import DepositModel from "../model/DepositModel";
import WalletStatisticModal from "../model/WalletStatisticModal";
import { getUserInfo } from "../Helper/Api_function";
import classNames from "classnames";

const Navbar = () => {
  const dispatch = useDispatch();
  const { address, isConnected, chainId, chain } = useAccount();
  const { wallet, userExist, userInfo } = useSelector((state) => state.login);
  const walletAddress = wallet.address;
  const [showMakeDepositModal, setShowMakeDepositModal] = useState(false);
  const [showWalletStatisticsModal, setShowWalletStatisticsModal] =
    useState(false);
  const [showWithDrawalModal, setShowWithDrawalModal] = useState(false);
  const [userReferer, setUserReferer] = useState("");
  const [tableview, setTableview] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [amt, setAmt] = useState("");
  const [adr, setAdr] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});
  const [isDepositMode, setIsDepositMode] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [freeWallet, setFreeWallet] = useState(0);
  const [mainInput, setMainInput] = useState(0);
  const [splitInput, setSplitInput] = useState(0);
  const [rank, setRank] = useState(0);
  const [levelPaid, setLevelPaid] = useState({});
  const referralLink = `${base_url}/?ref=${walletAddress}`;
  const toggleMakeDepositModal = () =>
    setShowMakeDepositModal(!showMakeDepositModal);
  const toggleWalletStatisticsModal = () =>
    setShowWalletStatisticsModal(!showWalletStatisticsModal);

  useEffect(() => {
    console.log(userInfo?.securityPin);
    setInputPin(userInfo?.securityPin);
  }, [userInfo?.securityPin]);

  const toggleWithdrawalModal = () =>
    setShowWithDrawalModal(!showWithDrawalModal);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the referral link.");
      });
  };
  const handleCancel = () => {
    setInputAddress("");
    setInputAmount("");
    setInputPin("");

    setIsDepositMode(false);
  };
  useEffect(() => {
    if (address) {
      dispatch(
        setWallet({
          address: address,
          isConnected: isConnected,
          chainId: chainId,
          chain: chain,
        })
      );
      isUserExist(address)
        .then((res) => {
          dispatch(setUserExist(res));
        })
        .catch((error) => {
          console.log(error, "IsUserExit Error");
        });
      getUserInfo(address)
        .then((res) => {
          if (res?.status === 200) {
            dispatch(setUserInfo(res?.data));
          } else {
            dispatch(setUserInfo({}));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      UserDetailsfn(address).then((res) => {
        // console.log("UserDetailsfn response", res);
        setUserDetails(res);
        console.log(res[10], res[9], "::::::::::");
        if (Number(res[10]) == 10) {
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
    }
  }, [dispatch, address, isFetch]);

  const handleIsDeposit = () => {
    const newErrors = { amt: "", adr: "", pin: "" };

    if (!inputAmount) {
      newErrors.amt = "Transaction amount is required.";
      // newErrors.adr = "";
      // newErrors.adr = "";
    }
    console.log(inputAddress, "inputAddress");
    if (!inputAddress) {
      // newErrors.amt = newErrors.amt != "" ? newErrors.amt : "";
      newErrors.adr = "Address is required.";
    }
    if (!inputPin) {
      // newErrors.amt = newErrors.adr != "" ? newErrors.adr : "";
      newErrors.pin = "Security Pin  is required.";
    }
    console.log(newErrors, "newErrors");
    setErrors(newErrors);

    // Exit if there are errors
    if (newErrors.amt != "" || newErrors.adr != "" || newErrors.pin != "") {
      setTimeout(() => {
        setErrors({ amt: "", adr: "", pin: "" });
      }, 3000);
      return;
    }
    setIsDepositMode(true);
    // setInputAmount(`Main-Core : ${userInfo?.splitWallet ?? 0}`);
    // setInputAddress(`Free-Core : ${userInfo?.airdropWallet ?? 0}`);
    // setInputPin(`Split-Wallet : ${userInfo?.splitWallet ?? 0}`);
  };
  const handleDeposit = async () => {
    const newErrors = { amt: "", adr: "", pin: "" };

    if (!inputAmount) {
      newErrors.amt = "Transaction amount is required.";
      // newErrors.adr = "";
    }
    console.log(inputAddress, "inputAddress");
    if (!inputAddress) {
      // newErrors.amt = newErrors.amt != "" ? newErrors.amt : "";
      newErrors.adr = "Address is required.";
    }
    if (!inputPin) {
      // newErrors.amt = newErrors.adr != "" ? newErrors.adr : "";
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
        // const res = await isUserExist(address);
        if (!userExist) {
          toast.error("Please register Your self");
          return;
        }
        // setUserExit(res);
        await Depositfn(0, inputAmount);
        setIsLoader(false);
        setIsFetch(!isFetch);
        console.log(userExist, "isUserExist");
      } catch (e) {
        setIsLoader(false);

        console.log("error", e);
      }
    }
  };
  const handleAmountInputChange = (event) => {
    setInputAmount(event.target.value);
  };

  const MakeDepositModalData = [
    {
      label1: "Split Wallet :",
      value: userInfo?.splitWallet ?? 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "SW",
    },
    {
      label1: "Left Free Core:",
      value: Number(userDetails[12]) > 0 ? Number(userDetails[12]) : 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "LFPOP",
    },
    {
      label1: "Left Split Wallet :",
      value: 0,
      label2: "Click to View :",
      buttonText: "View History",
      image: DAOIcon,
      name: "LSW",
    },
    // {
    //   label1: "My Investment :",
    //   value: userInfo?.firstDepositAmount ?? 0,
    //   label2: "Click to View :",
    //   buttonText: "View History",
    //   image: DAOIcon,
    //   name: "MI",
    // },
    // {
    //   label1: "My Re-investment :",
    //   value:
    //     (userInfo?.depositWallet ?? 0) - (userInfo?.firstDepositAmount ?? 0),
    //   label2: "Click to View :",
    //   buttonText: "View History",
    //   image: DAOIcon,
    //   name: "MRI",
    // },
    {
      label1: "Total Investment :",
      value: Number(userDetails[5]) > 0 ? Number(userDetails[5]) / 1e18 : 0,
      label2: "",
      buttonText: "Deposit History",
      image: DAOIcon,
      name: "TI",
    },
    {
      label1: "Total withdrawn :",
      value: 0,
      label2: "",
      buttonText: "Withdraw History",
      image: DAOIcon,
      name: "TW",
    },
    {
      label1: "Balance:",
      value: userInfo?.walletBalance ?? 0,
      label2: "Request withdraw:",
      buttonText: "Withdraw ",
      image: DAOIcon,
      name: "B",
      text: "**In the event of an unsuccessful withdrawal resulting in a zero balance display, re-initiate the withdrawal process, disregarding the current balance state. This will re-trigger the pending withdrawal request, facilitating the successful transfer of funds to your designated wallet address*",
    },
  ];

  const walletStatisticModalData = [
    {
      id: 0,
      label: "Total Free Core:",
      value: Number(userDetails[10]) > 0 ? Number(userDetails[10]) : 0,
      label2: "Request to get :",
      buttonText: rank,

      text: "Click Get button, and you will get instantly your today pool earnings as a single transaction. Your personal hold-bonus will be reseted.",
    },
    {
      id: 1,
      label: "Level Team:",
      heading: "All/Paid",
      value: userInfo?.levelBonus ?? 0,
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
      id: 6,
      label: "Offer:",
      value: 0,
      label2: "Offer History:",
      buttonText: "Offer History",
      image: DAOIcon,
    },
    {
      id: 7,
      label: "C50 Flushed:",
      value: 0,
      label2: "C50 Flushed History:",
      buttonText: "C50 Flushed History",
      image: DAOIcon,
    },

    {
      id: 8,
      label: "C50 Income:",
      value: 0,
      label2: "Recent Days Income Total:",
      buttonText: "F50 Income History",
      image: DAOIcon,
    },

    {
      id: 9,
      label: "Magic Income:",
      value: userInfo?.magicIncome ?? 0,
      label2: "Magic Income History:",
      buttonText: "Magic Income History",
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
      value: 0,
      label2: "All Earning History:",
      buttonText: "All Earning History",
      image: DAOIcon,
    },

    {
      id: 12,
      label: "Total Withdrawn:",
      value: userInfo?.withdrawalReward ?? 0,
      label2: "Withdraw History:",
      buttonText: "View History",
      image: DAOIcon,
    },
  ];

  const [isShrunk, setIsShrunk] = useState(false);

  const [showElement, setShowElement] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && window.innerWidth <= 420) {
        setShowElement(false);
      } else {
        setShowElement(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div className="wrapper">
        <div
          className={`cbp-af-header ${isShrunk ? "cbp-af-header-shrink" : ""}`}
        >
          <div className="cbp-af-inner">
            <nav>
              <a href="#about" className="scrollto">
                About us
              </a>

              <a href="#investments" className="scrollto">
                Investments
              </a>

              <a href="#" className="colorchange">
                <FaTrophy /> Contest
              </a>
              {showElement && (
                <a href="#" className="mainlogo">
                  <img src={DAOIcon} alt="Company Logo" />
                </a>
              )}

              <a
                href="#"
                id="depositDeal"
                onClick={toggleMakeDepositModal}
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                <FaDonate /> Make deposit
              </a>

              <a
                href="#"
                id="wallet_static"
                onClick={toggleWalletStatisticsModal}
              >
                <FaWallet /> Wallet statistic
              </a>

              {/* <a href="#" id="makepayout" onClick={toggleWithdrawalModal}>
                <FaWallet /> Withdrawal
              </a> */}
            </nav>
          </div>
        </div>
      </div>
      {showMakeDepositModal && (
        <DepositModel
          userReferer={userReferer}
          referralLink={referralLink}
          tableview={tableview}
          toggleMakeDepositModal={() => toggleMakeDepositModal()}
          walletAddress={walletAddress}
          userExist={userExist}
          inputAmount={inputAmount}
          handleAmountInputChange={handleAmountInputChange}
          inputAddress={inputAddress}
          setInputAddress={setInputAddress}
          isLoader={isLoader}
          handleDeposit={() => handleDeposit()}
          MakeDepositModalData={MakeDepositModalData}
          handleCopy={() => handleCopy()}
          setTableview={setTableview}
          errors={errors}
          setInputPin={setInputPin}
          handleIsDeposit={handleIsDeposit}
          handleCancel={handleCancel}
          isDepositMode={isDepositMode}
          mainInput={mainInput}
          freeWallet={freeWallet}
          splitInput={splitInput}
        />
      )}
      {showWalletStatisticsModal && (
        <WalletStatisticModal
          toggleWalletStatisticsModal={() => toggleWalletStatisticsModal()}
          walletAddress={walletAddress}
          handleCopy={() => handleCopy()}
          referralLink={referralLink}
          walletStatisticModalData={walletStatisticModalData}
          tableview={tableview}
          setTableview={setTableview}
          isFetch={isFetch}
          setIsFetch={setIsFetch}
          setLevelPaid={setLevelPaid}
        />
      )}
      {showWithDrawalModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content remodal remodal-is-initialized remodal-is-opened"
              style={{ backgroundColor: "#1f1f1f" }}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Withdrawal Now
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={toggleWithdrawalModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                <div className="row">
                  <div className="col-lg-6">
                    <div>Balance:</div>
                    <div className="dollar-img-container">
                      <img
                        src="https://maticverious.com/images/flags/dollar.png"
                        alt="dollar"
                        style={{ width: "25%" }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>Request withdraw:</div>
                    <div className="withdrawbtn-container">
                      <button className="withdrawbtn">Withdraw</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                "*In the event of an unsuccessful withdrawal resulting in a zero
                balance display, re-initiate the withdrawal process,
                disregarding the current balance state. This will re-trigger the
                pending withdrawal request, facilitating the successful transfer
                of funds to your designated wallet address.".
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
