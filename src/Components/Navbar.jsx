// import "../../src/styles/navbar.css";
import React, { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import DAOIcon from "../assets/Images/ForeXFavicon.png";
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
import { getFetchTeams, getUserInfo } from "../Helper/Api_function";
import classNames from "classnames";

const Navbar = () => {
  const dispatch = useDispatch();
  const { address, isConnected, chainId, chain } = useAccount();
  // const address = "0xe6804548674be4253aaab4f9eeb780e04885efd8";
  const { wallet, userExist, userInfo } = useSelector((state) => state.login);
  const walletAddress = wallet.address;

  const [showWalletStatisticsModal, setShowWalletStatisticsModal] =
    useState(false);
  const [showWithDrawalModal, setShowWithDrawalModal] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  // const [DirectTeam, setDirectTeam] = useState({});

  const referralLink = `${base_url}/?ref=${walletAddress}`;
  const [showMakeDepositModal, setShowMakeDepositModal] = useState(false);
  const toggleMakeDepositModal = () => {
    setShowMakeDepositModal(!showMakeDepositModal);
    setIsFetch(!isFetch);
    // console.log(isFetch, ":::::::::::::::::");
  };
  const toggleWalletStatisticsModal = () =>
    setShowWalletStatisticsModal(!showWalletStatisticsModal);

  // const toggleWithdrawalModal = () =>
  //   setShowWithDrawalModal(!showWithDrawalModal);

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
    }
  }, [dispatch, address, isFetch]);

  const [isShrunk, setIsShrunk] = useState(false);

  const [showElement, setShowElement] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && window.innerWidth <= 400) {
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
                // onClick={toggleMakeDepositModal}
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                <FaDonate /> Make deposit
              </a>

              <a
                href="#"
                id="wallet_static"
                // onClick={toggleWalletStatisticsModal}
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
          referralLink={referralLink}
          toggleMakeDepositModal={() => toggleMakeDepositModal()}
          walletAddress={walletAddress}
          userExist={userExist}
          handleCopy={() => handleCopy()}
          isFetch={isFetch}
          setIsFetch={setIsFetch}
        />
      )}
      {showWalletStatisticsModal && (
        <WalletStatisticModal
          toggleWalletStatisticsModal={() => toggleWalletStatisticsModal()}
          walletAddress={walletAddress}
          handleCopy={() => handleCopy()}
          referralLink={referralLink}
          isFetch={isFetch}
          setIsFetch={setIsFetch}
          userExist={userExist}
        />
      )}
      {/* {showWithDrawalModal && (
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
      )} */}
    </>
  );
};

export default Navbar;
