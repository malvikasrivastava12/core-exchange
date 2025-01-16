import React, { useState, useEffect } from "react";
// import "../../src/styles/navbar.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPrint, FaSearch } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import LogoWhite from "../assets/Images/Core_Exchange_Logo.png";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import { ConnectBtn } from "./ConnectButton";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { isUserExist, registerfn } from "../Helper/Web3";
import { getUserInfo } from "../Helper/Api_function";
import { useSelector } from "react-redux";
import Countdown from "react-countdown";
import DAOModal from "../model/DAOModal";
import WalletStatisticModal from "../model/WalletStatisticModal";
import { base_url } from "../Helper/config";
const MainContent = () => {
  const { address, isConnected, chain, chainId } = useAccount();
  const [showWalletStatisticsModal, setShowWalletStatisticsModal] =
    useState(false);
  const toggleWalletStatisticsModal = () =>
    setShowWalletStatisticsModal(!showWalletStatisticsModal);

  const [isFetch, setIsFetch] = useState(false);
  const { wallet, userExist, userInfo } = useSelector((state) => state.login);
  const walletAddress = wallet.address;
  const referralLink = `${base_url}/?ref=${walletAddress}`;
  const day7 =
    userInfo?.isHave2x4X > 0
      ? "Completed"
      : Date.now() > userInfo?.firstDepositAt * 1000 + 7 * 24 * 60 * 60 * 1000
      ? userInfo?.firstDepositAt * 1000 + 100 * 24 * 60 * 60 * 1000
      : userInfo?.firstDepositAt * 1000 + 7 * 24 * 60 * 60 * 1000;

  const currentTime = Date.now();
  const firstDepositTime = userInfo?.firstDepositAt * 1000 || 0;

  let offerPercentage = "0%";
  let day30 = "Completed";

  if (userInfo?.isMagicBooster === true) {
    offerPercentage = "Completed";
  } else if (currentTime < firstDepositTime + 30 * 24 * 60 * 60 * 1000) {
    offerPercentage = "100%";
    day30 = firstDepositTime + 30 * 24 * 60 * 60 * 1000;
  } else if (currentTime < firstDepositTime + 60 * 24 * 60 * 60 * 1000) {
    offerPercentage = "40%";
    day30 = firstDepositTime + 60 * 24 * 60 * 60 * 1000;
  } else if (currentTime < firstDepositTime + 90 * 24 * 60 * 60 * 1000) {
    offerPercentage = "30%";
    day30 = firstDepositTime + 90 * 24 * 60 * 60 * 1000;
  } else if (currentTime < firstDepositTime + 120 * 24 * 60 * 60 * 1000) {
    offerPercentage = "20%";
    day30 = firstDepositTime + 120 * 24 * 60 * 60 * 1000;
  }

  // const day30 =
  //   userInfo?.isMagicBooster === true
  //     ? "Completed"
  //     : userInfo?.firstDepositAt * 1000 + 30 * 24 * 60 * 60 * 1000;
  const day10 = userInfo?.firstDepositAt * 1000 + 10 * 24 * 60 * 60 * 1000;
  const day50 =
    userInfo?.rankReward > 0
      ? "Completed"
      : userInfo?.firstDepositAt * 1000 + 50 * 24 * 60 * 60 * 1000;
  const [con, setCon] = useState(false);
  const [income2XB, setIncome2XB] = useState(0);
  // useEffect(() => {
  //   setIncome2XB(userInfo.isHave2x4X);
  // });
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    window.addEventListener("resize", AOS.refresh);

    return () => {
      window.removeEventListener("resize", AOS.refresh);
    };
  }, []);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDAOModal, setShowDAOModal] = useState(false);

  const toggleShowAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };
  const toggleShowDAOModal = () => {
    setShowDAOModal(!showDAOModal);
  };
  const closeDAOModal = () => {
    setShowDAOModal(false);
  };
  const [userExit, setUserExit] = useState(false);
  const data = new URLSearchParams(window.location.search);
  const ref = data.get("ref");
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
      isUserExist(address)
        .then((res) => {
          setUserExit(res);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  }, [address, con]);
  const handleRegister = async () => {
    try {
      if (!ref) {
        toast.error("Referral address  is not provided");
        return;
      }
      const isRef = await isUserExist(ref);
      const isUser = await isUserExist(address);

      if (isUser) {
        toast.error("You are already registered");
        return;
      }

      if (!isRef) {
        toast.error("Referral Address is not valid");
        return;
      }
      const register = await registerfn(ref);
      if (register) {
        setTimeout(() => {
          setCon(!con);
        }, 1000);
      }
      console.log(register, "::::regitser");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userInfo?.isHave2x4X, "::::DX");
  const timers = [
    {
      label: "2X B (C — 50) TIME",
      id: "f50timer",
      // date: day7,
      date: day7,
    },
    {
      label: "FREE CORE FLAT 40% UT TIME",
      id: "displayfreecore",
      date: day10,
    },
    {
      label: `${offerPercentage} D B OFFER TIME`,
      id: "displaydbtimer",
      date: day30,
    },
    {
      label: "RANK REWARD OFFER TIME",
      id: "displayranktimer",
      date: day50,
    },
  ];

  const [timeRemaining, setTimeRemaining] = useState(
    timers.reduce((acc, timer) => {
      acc[timer.id] = "";
      return acc;
    }, {})
  );

  useEffect(() => {
    const intervals = timers.map((timer) => {
      const countDownDate = new Date(timer.date).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
          clearInterval(interval);
          setTimeRemaining((prev) => ({
            ...prev,
            [timer.id]: "EXPIRED",
          }));
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          const setTimeC =
            timer.date === "Completed"
              ? "Completed"
              : `${days || 0}d ${hours || 0}h ${minutes || 0}m ${
                  seconds || 0
                }s`;
          setTimeRemaining((prev) => ({
            ...prev,
            [timer.id]: setTimeC,
          }));
        }
      }, 1000);

      return interval;
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [timers]);

  return (
    <>
      <div className="content">
        <div className="mainback">
          <div className="wrap">
            <div className="mainscreen">
              <div className="mainbackwrap">
                <div
                  data-offset="30"
                  className="mainphone parallax"
                  style={{ transform: "translate3d(6px, -15px, 0px)" }}
                ></div>
                <div className="dash1"></div>
                <div className="dash2"></div>
                <div className="dash3"></div>
                <div className="dash4"></div>
                <div className="perfection">perfection in details</div>
              </div>
              <div className="mainbackwrap">
                <div className="mainbackdesc" data-aos="fade-left">
                  <h1>Reliable investments with</h1>
                  <img src={LogoWhite} className="mainico" alt="Tron Full" />
                  <h1>
                    Get <span style={{ color: "#fd9500" }}>free 10 </span> Core
                    Rewards by free registration and also get benifit free
                    refferal program up to 11 Levels
                  </h1>
                  <div className="maindesc">
                    <div className="maindesctext">
                      <span>
                        <FaRegCheckCircle color="#fd9500" /> Blockchain
                        decentralized and anonymous platform
                      </span>
                      <span>
                        <FaRegCheckCircle color="#fd9500" /> Totally secure
                        income based on{" "}
                        <img src={DAOIcon} alt="DAO Smart-Contract" /> DAO
                        smart-contract
                      </span>
                      <span>
                        <FaRegCheckCircle color="#fd9500" /> Smart-contract
                        verified and audited by an independent company
                      </span>

                      <div
                        className="maincontform authFalse"
                        id="pinkey"
                        style={{ display: "none" }}
                      >
                        <p style={{ marginBottom: "10px" }}>
                          Specify Deposit and Withdrawal Security Pin
                        </p>

                        <input
                          style={{
                            marginBottom: "10px",
                            border: "solid 5px #fd9500",
                          }}
                          id="pass_key"
                          type="password"
                          maxLength={6}
                          placeholder="New Pass Key"
                          required
                        />

                        <input
                          style={{
                            marginBottom: "10px",
                            border: "solid 5px #fd9500",
                          }}
                          id="conf_key"
                          type="password"
                          maxLength={6}
                          placeholder="Confirm New Pass Key"
                          required
                        />
                      </div>

                      {!address && <ConnectBtn />}
                      {address && !userExit && (
                        <div
                          className="maindescbut"
                          onClick={() => handleRegister()}
                        >
                          Register Now
                        </div>
                      )}

                      {address && userExit && (
                        <div
                          className="maindescbut"
                          onClick={toggleShowAccountModal}
                        >
                          Account Information
                        </div>
                      )}

                      {/* <p id="invsttbutton" className="maindescbut">
                        CV BOT - Beta Launched
                      </p> */}
                      <div className="maindesclink">
                        <a
                          // href="https://polygonscan.com/address/0x24b3f63b74a633c4d972e5b0ce1418e3ccc3f87a"
                          className="maindesclink"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "white" }}
                        >
                          Check Current State CoreExchange smart-contract
                        </a>
                      </div>

                      <div id="rescanDiv" style={{ display: "none" }}>
                        <a
                          href="#"
                          data-remodal-target="rescanbox"
                          id="rescanbox"
                          className="maindescbut"
                        >
                          Rescan
                        </a>
                        <p style={{ color: "white" }}>
                          If MATIC is deducted and ID not registered, PLEASE
                          DON'T MAKE THE PAYMENT AGAIN and rescan your
                          transaction here.
                        </p>
                      </div>

                      <div className="maindesclink"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="mainabout" id="about">
          <div className="wrap">
            <h2 data-aos="fade-up">
              We will <span className="gt">multiply</span> your funds{" "}
              <span className="gt">unlimited</span>
              <small>without any risks</small>
            </h2>
            <div className="mainaboutitemsblock">
              <div className="aboutdashtop"></div>
              <div className="aboutdashbottom"></div>
              <div className="aboutdashleft"></div>
              <div className="aboutdashright"></div>
              <div
                className="mainaboutitem aboutitemgrad1 "
                // data-aos-anchor="#example-anchor"
                // data-aos-offset="500"
                // data-aos-duration="1000"
                //fromLeftOut
                data-aos="fade-right"
              >
                <h3>Unlimited earnings with always growing rates</h3>
                We provide investment conditions with growing percentage,
                depending on basic interest rate, smart-contract total balance
                bonus and personal "hold-bonus". Maximal available profit: +100%
                Core of referral's daily reward
              </div>
              <div
                className="mainaboutitem aboutitemgrad2 "
                data-aos="fade-right"
              >
                <h3>Worldwide legal company with professional team</h3>
                We are the officially registered company with team of trusted
                professionals on blockchain market. We are working 24/7 to
                increase platform popularity and make it truly worldwide. Join
                us and get your profit!
              </div>
              <div className="mainaboutitem2 aboutitemgrad" data-aos="fade-up">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <h3 style={{ color: "#fd9500", fontWeight: "bold" }}>
                    See Core Scan
                  </h3>
                </a>
                <a
                  href="https://coinmarketcap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 style={{ color: "#fd9500", fontWeight: "bold" }}>
                    See Core Coin at Coin Market Cap
                  </h3>
                </a>
                <h3>
                  Reliability of DAO smart-contract.
                  <br />
                  Scam is impossible!
                </h3>
                Smart-contract technology ensures full safety of all
                participants' funds. Nobody can steal funds, or change contract
                functions.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="stepsmainblock" id="steps">
          <div className="wrap">
            <div className="dashtop"></div>
            <h2>
              How to work with platform
              <small>
                simple <span className="gt">3 steps</span> to get earnings
              </small>
            </h2>
            <div className="stepsline" data-aos="fade-right">
              <div className="bigstepline"></div>
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap">
                <h3>Step #1: Sign Up</h3>
                <div className="stepsblock ">
                  <h4>
                    Get <img src={DAOIcon} alt="" /> CORE (DAO)
                  </h4>
                  We recommend to use:{" "}
                  <b style={{ color: "#fd9500" }}>Token Pocket</b> /{" "}
                  <b style={{ color: "#fd9500" }}>MetaMask</b> browsers
                  extensions.
                  <br /> You can get DAO coins via popular exchangers.
                  <a
                    href="#"
                    data-remodal-target="tron"
                    className="maindescbut"
                    onClick={toggleShowDAOModal}
                  >
                    How to get DAO
                  </a>
                </div>
                <div className="stepsblock ">
                  <h4>
                    Must have some <img src={DAOIcon} alt="" /> DAO for fee
                  </h4>
                  Empowering users through decentralized design, distribution,
                  and direction. <b style={{ color: "#fd9500" }}>#CoreDAO </b>{" "}
                  is the 3D blockchain that is changing the way you interact
                  with crypto.
                  <a
                    href="javascript:void(0)"
                    // onClick={() => Register(this)}
                    className="maindescbut"
                  >
                    Sign Up Now
                  </a>
                </div>
              </div>
            </div>

            {/* Step #2 */}
            <div className="stepsline" data-aos="fade-up">
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <div className="icosteps2">
                  <img
                    src="https://corevarious.com/themes/CoreVarious/Content/Site/img/icostep3.png"
                    alt=""
                  />
                </div>
                <form className="maincontform">
                  <label>
                    Your <img src={DAOIcon} alt="" /> DAO wallet address:
                  </label>
                  <input
                    type="text"
                    className="trxWallet authTrue"
                    value=""
                    style={{ display: "none" }}
                    readOnly
                  />
                  <input
                    type="text"
                    className="trxWallet authFalse"
                    placeholder="Connect with your wallet app..."
                    readOnly
                  />
                  <a
                    href="#"
                    data-remodal-target="wallet"
                    className="maindescbut"
                  >
                    Check wallet statistics
                  </a>
                </form>
              </div>
              <div
                className="stepslinewrap stepslinewrapright "
                data-aos="fade-right"
              >
                <h3>Step #2: Get Dao earnings</h3>
                <div className="stepsblock stepsblockfull">
                  <h4>
                    Get your <img src={DAOIcon} alt="" /> DAO every moment
                  </h4>
                  Free Refferal Core Rewards Programme .
                  <br />
                  <br /> Get free 10 Core Coin Reward just by free registration
                  and also get benefit free referral program up to 11 Levels
                  <u>Additional earnings with this program:</u>
                  <br /> Direct team's Reward:{" "}
                  <b style={{ color: "#fd9500" }}>
                    You will get benefit of 1 DAO from every level up to 11
                    Levels
                  </b>
                  <br /> Self - <b style={{ color: "#fd9500" }}>10 Core</b>
                  <br /> Each Level ={" "}
                  <b style={{ color: "#fd9500" }}> 1 Core</b>
                  <a
                    href="#"
                    data-remodal-target="wallet"
                    className="maindescbut"
                    onClick={toggleWalletStatisticsModal}
                  >
                    Your wallet statistics
                  </a>
                </div>
              </div>
            </div>

            {/* Step #3  //fromLeftOut*/}
            <div className="stepsline" data-aos="fade-up">
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <h3>Step #3: Get Benefit of C50</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>
                    Get your <img src={DAOIcon} alt="" /> DAO Program
                  </h4>
                  <FaRegCheckCircle /> Get a Huge Team in{" "}
                  <b style={{ color: "#fd9500" }}>C50 Program</b>
                  <br />
                  <br />
                  <FaRegCheckCircle /> C50 Program is Designed and Developed by
                  Unique and Smart Way from which You will get a Huge Team
                  <br />
                  <br />
                  <FaRegCheckCircle /> You will Receive again and again Earnings
                  from the Team up to 3.33% Daily of your investment
                </div>
              </div>
            </div>
            <div className="stepsline" data-aos="fade-up">
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap stepslinewrapright ">
                <h3>Step #4: Get Benefit of Magic Income</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>
                    <img src={DAOIcon} alt="" /> Magic Income Program
                  </h4>
                  <FaRegCheckCircle /> Magic Income will be distributed Weekly
                  Basis according to your Front Business Legs.
                  <br />
                  <br />
                  <FaRegCheckCircle /> From first leg 0%
                  <br />
                  <br />
                  <FaRegCheckCircle /> From second leg 5%
                  <br />
                  <br />
                  <FaRegCheckCircle /> From third leg 10%
                  <br />
                  <br />
                  <FaRegCheckCircle /> From 4th leg 15%
                  <br />
                  <br />
                  <FaRegCheckCircle /> From 5th and above Legs 20%.
                  <br />
                  <br />
                  <FaRegCheckCircle /> There is no capping in magic income.
                  <br />
                  <br />
                  <FaRegCheckCircle /> It will be distributed up to unlimited
                  Depth of Levels.
                  <br />
                  <br />
                </div>
              </div>
            </div>

            <div className="stepsline" data-aos="fade-up">
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <h3>Step #5: Get Benefit of Pre Launching Bonanza</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>
                    <img src={DAOIcon} alt="" /> Pre Launching Program
                  </h4>
                  <FaRegCheckCircle /> Get 100% Direct income from your Active
                  Direct's Upgraded Package.
                  <br />
                  <br />
                  <FaRegCheckCircle /> Offer valid for 30 days from your TOP-UP
                  Day.
                  <br />
                  <br />
                </div>
              </div>
            </div>

            <div className="stepsline" data-aos="fade-up">
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <h3>Step #6: Get Rank and Reward</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>
                    <img src={DAOIcon} alt="" /> Get your rank and reward
                  </h4>
                  <FaRegCheckCircle />
                  1st Star rank requires 250 Core (Self ID), 500 Core (Direct
                  Business), and 5,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  2nd Star Requires 500 Core (Self ID), 1,000 Core (Direct
                  Business), and 10,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  3rd Star Requires 1,000 Core (Self ID), 2,000 Core (Direct
                  Business), and 20,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  4th Star Requires 2,000 Core (Self ID), 4,000 Core (Direct
                  Business), and 40,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  5th Star Requires 4,000 Core (Self ID), 8,000 Core (Direct
                  Business), and 80,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  6th Star Requires 8,000 Core (Self ID), 16,000 Core (Direct
                  Business), and 1,60,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  7th Star Requires 16,000 Core (Self ID), 32,000 Core (Direct
                  Business), and 3,20,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  8th Star Requires 32,000 Core (Self ID), 64,000 Core (Direct
                  Business), and 6,40,000 Core (Team Business).
                  <br />
                  <br />
                  <FaRegCheckCircle /> Offer valid for 50 days from your TOP-UP
                  Day.
                  <br />
                  <br />
                </div>
              </div>
            </div>
            {showWalletStatisticsModal && (
              <WalletStatisticModal
                toggleWalletStatisticsModal={() =>
                  toggleWalletStatisticsModal()
                }
                walletAddress={walletAddress}
                handleCopy={() => handleCopy()}
                referralLink={referralLink}
                isFetch={isFetch}
                setIsFetch={setIsFetch}
              />
            )}
            {/* MODAL */}
            {showAccountModal && (
              <div
                className="modal fade show "
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="remodal remodal-is-initialized remodal-is-opened"
                  tabIndex="-1"
                >
                  <a
                    // data-remodal-action="close"
                    className="remodal-close"
                    onClick={toggleShowAccountModal}
                    style={{ cursor: "pointer" }}
                  ></a>
                  <h1>Your Account Status</h1>
                  <div className="modaldesc">
                    {timers.map((timer) => (
                      <div className="macblockline" key={timer.id}>
                        <div className="modallineflex">
                          <div>
                            <h3 style={{ fontWeight: "bold" }}>
                              {timer.label}
                            </h3>
                            <div className="modallinewrapvalue">
                              <div id={timer.id}>{timeRemaining[timer.id]}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {showDAOModal && (
              <DAOModal
                showDAOModal={showDAOModal}
                closeDAOModal={() => closeDAOModal()}
              />
            )}
            {/* MODAL */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
