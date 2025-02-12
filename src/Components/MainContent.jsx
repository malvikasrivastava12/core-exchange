import React, { useState, useEffect } from "react";
// import "../../src/styles/navbar.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPrint, FaSearch } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import LogoWhite from "../assets/Images/ForeX.png";
import DAOIcon from "../assets/Images/Core_Exchange_Logo_favicon.png";
import usericon from "../assets/Images/user.png";

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
  const day10 = userInfo?.timestamp * 1000 + 10 * 24 * 60 * 60 * 1000;
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
      label: `${
        Date.now() > userInfo?.firstDepositAt * 1000 + 7 * 24 * 60 * 60 * 1000
          ? "4x"
          : "2X"
      } B (C — 50) TIME`,
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
                {/* <div className="dash1"></div> */}
                {/* <div className="dash2"></div>
                <div className="dash3"></div>
                <div className="dash4"></div> */}
                {/* <div className="perfection">perfection in details</div> */}
              </div>
              <div className="mainbackwrap">
                <div className="mainbackdesc" data-aos="fade-left">
                  <h1>Reliable investments with</h1>
                  <img src={LogoWhite} className="mainico" alt="Tron Full" />
                  <h1>
                    Register for free and start earning Forex Fusion rewards
                    instantly
                  </h1>
                  <div className="maindesc">
                    <div className="maindesctext">
                      <span>
                        <FaRegCheckCircle color="#83d8f1" /> Blockchain
                        decentralized and anonymous platform
                      </span>
                      <span>
                        <FaRegCheckCircle color="#83d8f1" /> Totally secure
                        income based on{" "}
                        {/* <img src={DAOIcon} alt="DAO Smart-Contract" /> DAO */}
                        smart-contract
                      </span>
                      <span>
                        <FaRegCheckCircle color="#83d8f1" /> Smart-contract
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
                          // onClick={() => handleRegister()}
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
                          href=""
                          className="maindesclink"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "white" }}
                        >
                          Check Current State Forex Fusion smart-contract
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content clearfix">
        <div className="mainabout" id="about">
          <div data-aos="fade-up">
            <h2 className="we-will-multipy-div">
              We will <span className="gt">multiply</span> your funds{" "}
              <span className="gt">unlimited</span>
              <small>without any risks</small>
            </h2>
          </div>
          <div className="wrap clearfix">
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
                Forex Fusion offers high-yield investments with increasing
                profits based on the base interest rate, smart contract balance
                bonus, and personal hold-bonus. Earn up to full profit, with
                additional daily referral rewards. The longer you hold, the more
                you earn!
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
                {/* <a href="#" target="_blank" rel="noopener noreferrer">
                  <h3 style={{ color: "#83d8f1", fontWeight: "bold" }}>
                    See FORE Scan
                  </h3>
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <h3 style={{ color: "#83d8f1", fontWeight: "bold" }}>
                    See FORE Coin at Coin Market Cap
                  </h3>
                </a> */}
                <h3 style={{ color: "#83d8f1", fontWeight: "bold" }}>
                  Secure & Reliable
                  <br />
                  with Smart Contracts
                </h3>
                Forex Fusion prioritizes security and transparency with
                smart-contract technology. Our powerful investment model ensures
                sustainable earnings, growing continuously through smart
                contract bonuses and personal hold rewards. Maximize your
                profits effortlessly with a system designed for long-term
                financial success!
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
                  <h4>Get FORE </h4>
                  We recommend to use:{" "}
                  <b style={{ color: "#83d8f1" }}>Token Pocket</b> /{" "}
                  <b style={{ color: "#83d8f1" }}>MetaMask</b> browsers
                  extensions.
                  <br /> You can get FORE coins via popular exchangers.
                  <a
                    href="#"
                    data-remodal-target="tron"
                    className="maindescbut"
                    onClick={toggleShowDAOModal}
                  >
                    How to get FORE
                  </a>
                </div>
                <div className="stepsblock ">
                  <h4>Must have some FORE for fee</h4>
                  Empowering users through a decentralized investment model,
                  Forex Fusion ensures transparent fee distribution and
                  user-driven growth. Built on advanced blockchain technology,
                  it revolutionizes the way you engage with forex and crypto
                  investments, offering a secure, scalable, and community-driven
                  financial ecosystem.
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
              <div className="bigstepline"></div>
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <div className="icosteps2">
                  <img src={usericon} alt="" />
                </div>
                <form className="maincontform">
                  <label>Your FORE wallet address:</label>
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
                    value={walletAddress}
                    style={{ width: "95%" }}
                    readOnly
                  />
                  <a
                    href="#"
                    data-remodal-target="wallet"
                    className="maindescbut"
                    style={{ width: "95%" }}
                  >
                    Check wallet statistics
                  </a>
                </form>
              </div>
              <div
                className="stepslinewrap stepslinewrapright "
                data-aos="fade-right"
                style={{ paddingTop: "20px" }}
              >
                <h3>Step #2: Get FORE earnings</h3>
                <div className="stepsblock stepsblockfull">
                  <h4>Earn Forex Fusion (FOREX) Rewards Instantly!</h4>
                  Start earning Forex Fusion (FOREX) rewards instantly! Our Free
                  Referral Rewards Program lets you maximize your earnings
                  effortlessly.
                  <br />
                  <br />
                  Simply register for free and claim your welcome rewards.
                  Additionally, take advantage of our referral program, where
                  you continue to earn through your growing network. The more
                  you share, the more you earn!
                  {/* <span>
                    Start earning Forex Fusion (FOREX) rewards from the moment
                    you join! Our Free Referral Rewards Program is designed to
                    help you maximize your income effortlessly.
                  </span> */}
                  <br />
                  {/* <br />
                  <FaRegCheckCircle /> Get 20 FREE FOREX Coins just by
                  registering!
                  <br />
                  <br />
                  <FaRegCheckCircle /> Unlock Additional Earnings through our
                  15-level referral program:
                  <br />
                  <br />
                  <FaRegCheckCircle /> Direct Team Reward – Earn 2 FOREX from
                  every level up to 15 levels.
                  <br />
                  <br /> */}
                  <a
                    href="#"
                    data-remodal-target="wallet"
                    className="maindescbut"
                    // onClick={toggleWalletStatisticsModal}
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
                <h3>
                  Step #3: Unlock the Power of Elite Growth Plan with Forex
                  Fusion
                </h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>Get your FORE Program</h4>
                  <FaRegCheckCircle /> Grow your wealth with consistent daily
                  returns on your investment.
                  <br />
                  <br />
                  <FaRegCheckCircle /> Leverage Team Growth – Receive earnings
                  again and again from your network
                  <br />
                  <br />
                  <FaRegCheckCircle /> Decentralized & Transparent – Powered by
                  smart contract technology
                  <br />
                  <br />
                </div>
              </div>
            </div>
            <div className="stepsline" data-aos="fade-up">
              <div className="bigstepline"></div>
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap stepslinewrapright ">
                <h3>Step #4:Unlock Power Earnings with Forex Fusion</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>Income with Forex Fusion</h4>
                  Forex Fusion’s Power Earnings Program offers a unique
                  opportunity to earn weekly rewards based on the expansion of
                  your network. As your business structure grows, your earnings
                  increase, allowing you to maximize your passive income. The
                  program ensures higher returns as more direct connections are
                  made, with no limits on earnings and payouts extending to
                  unlimited levels. With its smart distribution system, Forex
                  Fusion provides a stable and scalable income stream, making it
                  easier than ever to achieve financial growth.
                  {/* <FaRegCheckCircle /> Magic Income will be distributed Weekly
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
                  <br /> */}
                </div>
              </div>
            </div>

            <div className="stepsline" data-aos="fade-up">
              {/* <div className="bigstepline"></div> */}
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <h3>Step #5: Take Advantage of the Pre-Launching Bonanza</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4> Exclusive Pre-Launch Offer – Limited Time!</h4>
                  <FaRegCheckCircle /> Earn direct income from your active
                  referrals' first deposit package.
                  <br />
                  <br />
                  <FaRegCheckCircle /> Offer valid for a limited period from
                  your top-up day.
                  <br />
                  <br />
                  <FaRegCheckCircle /> Maximize early earnings and gain a strong
                  financial start.
                  <br />
                  <br />
                  <FaRegCheckCircle /> No limits on direct rewards during the
                  promotional period.
                  <br />
                  <br />
                  Join Forex Fusion now and take full advantage of this
                  limited-time opportunity!
                </div>
              </div>
            </div>

            {/* <div className="stepsline" data-aos="fade-up">
              <div className="bigsteplinecic1"></div>
              <div className="stepslinewrap ">
                <h3>Step #6: Get Rank and Reward</h3>
                <div className="stepsblock stepsblockfull2">
                  <h4>Get your rank and reward</h4>
                  <FaRegCheckCircle />
                  &nbsp;1st Star Requires 250 Core (Self ID), 500 Core (Direct
                  Business), and 5,000 Core (Team Business), offering 5 Core
                  daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp;2nd Star Requires 500 Core (Self ID), 1,000 Core (Direct
                  Business), and 10,000 Core (Team Business), offering 10 Core
                  daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp;3rd Star Requires 1,000 Core (Self ID), 2,000 Core
                  (Direct Business), and 20,000 Core (Team Business), offering
                  20 Core daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp; 4th Star Requires 2,000 Core (Self ID), 4,000 Core
                  (Direct Business), and 40,000 Core (Team Business), offering
                  40 Core daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp; 5th Star Requires 4,000 Core (Self ID), 8,000 Core
                  (Direct Business), and 80,000 Core (Team Business), offering
                  80 Core daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp;6th Star Requires 8,000 Core (Self ID), 16,000 Core
                  (Direct Business), and 1,60,000 Core (Team Business), offering
                  160 Core daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp;7th Star Requires 16,000 Core (Self ID), 32,000 Core
                  (Direct Business), and 3,20,000 Core (Team Business), offering
                  320 Core daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp; 8th Star Requires 32,000 Core (Self ID), 64,000 Core
                  (Direct Business), and 6,40,000 Core (Team Business), offering
                  640 Core daily for 50 days.
                  <br />
                  <br />
                  <FaRegCheckCircle />
                  &nbsp; Offer valid for 50 days from your TOP-UP Day.
                  <br />
                  <br />
                </div>
              </div>
            </div> */}
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
