import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IoWarning } from "react-icons/io5";
import "../src/styles/navbar.css";
// import "./css/adaptive.css";
// import "./css/all.css";
// import "./css/all2.css";
// import "./css/style.css";
// import "./css/flip.min.css";
// // import "./css/bootstrap.min.css";
// import "./css/animation.css";

import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";
import LanguageSelector from "./Components/LanguageSelector";
import SocialMediaLinks from "./Components/SocialMediaLinks";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import WarningModel from "./model/WarningModel";

function App() {
  const [showWarningModal, setShowWarningModal] = useState(false);

  const closeModal = () => {
    setShowWarningModal(false);
  };
  useEffect(() => {
    const lastShown = localStorage.getItem("warningModalLastShown");
    const now = new Date().getTime();
    const sixHoursInMs = 6 * 60 * 60 * 1000;

    if (!lastShown || now - parseInt(lastShown) > sixHoursInMs) {
      setShowWarningModal(true);
      localStorage.setItem("warningModalLastShown", now.toString());
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <LanguageSelector />
        <Navbar />
        <MainContent />
        <Footer />
        <SocialMediaLinks />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                fontWeight: "bold",
                backgroundColor: "#f0f8ff",
                color: "#333",
              },
            },
            error: {
              style: {
                fontWeight: "bold",
                backgroundColor: "#ffe5e5",
                color: "#900",
              },
            },
            loading: {
              style: {
                fontWeight: "bold",
                backgroundColor: "#fffbe5",
                color: "#555",
                border: "1px solid #ffd700",
              },
            },
          }}
        />

        {showWarningModal && (
          <WarningModel
            showWarningModal={showWarningModal}
            closeModal={() => closeModal()}
          />
        )}
      </Provider>
    </>
  );
}

export default App;
