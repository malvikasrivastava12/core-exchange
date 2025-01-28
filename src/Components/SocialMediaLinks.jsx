import React from "react";
import whatsapp from "../assets/SocialMediaImages/whatsapp.webp";
import youtube from "../assets/SocialMediaImages/youtube.png";
import telegram from "../assets/SocialMediaImages/telegram.webp";
import facebook from "../assets/SocialMediaImages/facebook.png";
import twitter from "../assets/SocialMediaImages/Twitter2.webp";
import instagram from "../assets/SocialMediaImages/instagram.jpg";
import threads from "../assets/SocialMediaImages/threads.png";
const SocialMediaLinks = () => {
  return (
    <div className="langblockk">
      <a
        href="#"
        title="WhatsApp"
        target="_blank"
        className="langwrapp langwrap_en"
        rel="noopener noreferrer"
      >
        <img src={whatsapp} alt="WhatsApp" />
      </a>
      <a
        href="https://youtube.com/@coreexhangeofficial?si=AXhAUNu6Mcz9ctwM"
        target="_blank"
        title="Youtube"
        className="langwrapp langwrap_fa"
        rel="noopener noreferrer"
      >
        <img src={youtube} alt="Youtube" />
      </a>
      <a
        href="https://t.me/coreexchangeoffcial"
        target="_blank"
        title="Telegram"
        className="langwrapp langwrap_ru"
        rel="noopener noreferrer"
      >
        <img src={telegram} alt="Telegram" />
      </a>
      <a
        href="#"
        target="_blank"
        title="Facebook"
        className="langwrapp langwrap_zh"
        rel="noopener noreferrer"
      >
        <img src={facebook} alt="Facebook" />
      </a>
      {/* <a
        href="#"
        target="_blank"
        title="Dailymotion"
        className="langwrapp langwrap_es"
        rel="noopener noreferrer"
      >
        <img
          src="https://maticverious.com/images/flags/dailymo.jpg"
          alt="Dailymotion"
        />
      </a> */}
      <a
        href="#"
        target="_blank"
        title="X"
        className="langwrapp langwrap_ar"
        rel="noopener noreferrer"
      >
        <img src={twitter} alt="X" />
      </a>
      {/* <a
        href="#"
        target="_blank"
        title="Koo"
        className="langwrapp langwrap_tr"
        rel="noopener noreferrer"
      >
        <img
          src="https://maticverious.com/images/flags/kooap.jpg?v=2.0"
          alt="Koo"
        />
      </a> */}
      <a
        href="https://www.instagram.com/coreexhangeofficial/?igsh=MWdqNDcwcmkzdzVrcA%3D%3D#"
        target="_blank"
        title="Instagram"
        className="langwrapp langwrap_tr"
        rel="noopener noreferrer"
      >
        <img src={instagram} alt="Instagram" />
      </a>
      <a
        href="#"
        target="_blank"
        title="Threads"
        className="langwrapp langwrap_tr"
        rel="noopener noreferrer"
      >
        <img src={threads} alt="Threads" />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
