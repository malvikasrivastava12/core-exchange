import React, { useState } from "react";
import Icon from "../assets/Images/ForeXFavicon.png";
import DepositModel from "../model/DepositModel";
import { useSelector } from "react-redux";
import { base_url } from "../Helper/config";
import WalletStatisticModal from "../model/WalletStatisticModal";
const Footer = () => {
  const { wallet, userExist, userInfo } = useSelector((state) => state.login);
  const walletAddress = wallet.address;
  const [showMakeDepositModal, setShowMakeDepositModal] = useState(false);
  const [showWalletStatisticsModal, setShowWalletStatisticsModal] =
    useState(false);
  const toggleMakeDepositModal = () =>
    setShowMakeDepositModal(!showMakeDepositModal);
  const toggleWalletStatisticsModal = () =>
    setShowWalletStatisticsModal(!showWalletStatisticsModal);
  const referralLink = `${base_url}/?ref=${walletAddress}`;
  const [isFetch, setIsFetch] = useState(false);
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
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footerwrap">
          {/* Footer Block 1 */}
          <div className="footblock">
            <a href="#" className="footlogo">
              <img src={Icon} alt="Logo" />
            </a>
            <p>
              Copyrights:
              <br />
              Forex Fusion LTD |
              <a href="index.html" style={{ color: "#fd9500" }}>
                {/* https://core-exchange.com/ */}
              </a>
              <br />
              Blockchain investment platform
              <br />
              2025 © All Rights Reserved
            </p>
          </div>

          {/* Footer Block 2 */}
          <div className="footblock">
            <p>
              Smart-contract address:
              <a
                href="https://scan.coredao.org/address/0x7a51DAF63E620DC00be296A2c237aE47Dd3B31A6"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fd9500", wordWrap: "break-word" }}
              >
                {/* 0x7a51DAF63E620DC00be296A2c237aE47Dd3B31A6 */}
              </a>
            </p>
            <p>
              Powered by DAO blockchain
              {/* <img src={Icon} className="footimg" alt="Polygon Logo" /> */}
            </p>
          </div>

          {/* Footer Block 3 */}
          <div className="footblock">
            <a
              href="#"
              style={{ height: "40px", lineHeight: "42px", fontSize: "18px" }}
              className="maindescbut"
              data-remodal-target="invest"
              onClick={toggleMakeDepositModal}
            >
              Make Deposit
            </a>

            <a
              href="#"
              style={{ height: "40px", lineHeight: "42px", fontSize: "18px" }}
              className="maindescbut"
              data-remodal-target="wallet"
              onClick={toggleWalletStatisticsModal}
            >
              Wallet statistic
            </a>
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
        />
      )}
    </footer>
  );
};

export default Footer;
