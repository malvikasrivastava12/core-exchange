import React from "react";
import { IoClose } from "react-icons/io5"; // Importing a close icon
import GOAOFFER from "../assets/Images/GOAOFFER.jpg";

export default function WarningModel({ closeModal, showWarningModal }) {
  if (!showWarningModal) return null; // Hide modal when not needed

  return (
    <div
      className="remodal-overlay remodal-is-opened"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background
        zIndex: 1000,
      }}
    >
      <div
        className="remodal remodal-is-initialized remodal-is-opened"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Close button positioned top-right over the image */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(255, 255, 255, 0.8)",
            border: "none",
            cursor: "pointer",
            padding: "5px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IoClose size={24} color="black" />
        </button>

        {/* Image */}
        <img
          src={GOAOFFER}
          alt="Warning"
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
