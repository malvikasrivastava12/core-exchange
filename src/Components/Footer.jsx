import React, { useState } from "react";
import Icon from "../assets/Images/Core_Exchange_Logo_favicon.png";
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
              Core Exchange LTD |
              <a href="index.html" style={{ color: "#fd9500" }}>
                https://core-exchange.com/
              </a>
              <br />
              Blockchain investment platform
              <br />
              2024 © All Rights Reserved
            </p>
          </div>

          {/* Footer Block 2 */}
          <div className="footblock">
            <p>
              Smart-contract address:
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fd9500", wordWrap: "break-word" }}
              >
                0x8af8bdBD504a9d302e251a9f6AF4fD5bC3C65b4C
              </a>
            </p>
            <p>
              Powered by
              <img src={Icon} className="footimg" alt="Polygon Logo" />
              DAO blockchain
            </p>
          </div>

          {/* Footer Block 3 */}
          <div className="footblock">
            <a
              href="#"
              style={{ height: "40px", lineHeight: "42px", fontSize: "20px" }}
              className="maindescbut"
              data-remodal-target="invest"
              onClick={toggleMakeDepositModal}
            >
              Make Deposit
            </a>

            <a
              href="#"
              style={{ height: "40px", lineHeight: "42px", fontSize: "20px" }}
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
