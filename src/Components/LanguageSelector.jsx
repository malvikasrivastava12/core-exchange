import React, { useEffect } from "react";

const LanguageSelector = () => {
  // Function to initialize Google Translate
  useEffect(() => {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  // Handle flag click to change the language
  const handleFlagClick = (lang) => {
    const languageSelect = document.querySelector("select.goog-te-combo");
    if (languageSelect) {
      languageSelect.value = lang;
      languageSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div>
      {/* Google Translate Element */}
      <div id="google_translate_element"></div>

      {/* Flag-based Language Selector */}
      <div className="langblock flag">
        <a
          href="#"
          data-lang="en"
          className="intohi langwrap langwrap_en flag_link eng"
          onClick={() => handleFlagClick("en")}
        >
          <img
            src="https://maticverious.com/images/flags/eng2.svg"
            alt="English"
          />
        </a>

        <a
          href="#"
          data-lang="fa"
          className="intohi langwrap langwrap_fa flag_link taj"
          onClick={() => handleFlagClick("fa")}
        >
          <img
            src="https://maticverious.com/images/flags/irn2.svg"
            alt="Farsi"
          />
        </a>

        <a
          href="#"
          data-lang="ru"
          className="intohi langwrap langwrap_ru flag_link rus"
          onClick={() => handleFlagClick("ru")}
        >
          <img
            src="https://maticverious.com/images/flags/rus2.svg"
            alt="Russian"
          />
        </a>

        <a
          href="#"
          data-lang="zh"
          className="intohi langwrap langwrap_zh flag_link zh"
          onClick={() => handleFlagClick("zh")}
        >
          <img
            src="https://maticverious.com/images/flags/chi25e1f.svg?v=2"
            alt="Chinese"
          />
        </a>

        <a
          href="#"
          data-lang="es"
          className="intohi langwrap langwrap_es flag_link es"
          onClick={() => handleFlagClick("es")}
        >
          <img
            src="https://maticverious.com/images/flags/esp2.svg"
            alt="Spanish"
          />
        </a>

        <a
          href="#"
          data-lang="ar"
          className="intohi langwrap langwrap_ar flag_link ara"
          onClick={() => handleFlagClick("ar")}
        >
          <img
            src="https://maticverious.com/images/flags/ara2.svg"
            alt="Arabic"
          />
        </a>

        <a
          href="#"
          data-lang="tr"
          className="intohi langwrap langwrap_tr flag_link tur"
          onClick={() => handleFlagClick("tr")}
        >
          <img
            src="https://maticverious.com/images/flags/trk2.svg"
            alt="Turkish"
          />
        </a>
      </div>
    </div>
  );
};

export default LanguageSelector;
