import React, { useEffect } from "react";
import english from "../assets/LanguageImage/english.webp";
import Russia from "../assets/LanguageImage/Russia.png";
import china from "../assets/LanguageImage/china.png";
import spanish from "../assets/LanguageImage/Spain.webp";
import arabic from "../assets/LanguageImage/arebic.png";
import Turkish from "../assets/LanguageImage/Turkish.png";
import farsi from "../assets/LanguageImage/farsi.jpg";

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
          <img src={english} alt="English" />
        </a>

        <a
          href="#"
          data-lang="fa"
          className="intohi langwrap langwrap_fa flag_link taj"
          onClick={() => handleFlagClick("fa")}
        >
          <img src={farsi} alt="Farsi" />
        </a>

        <a
          href="#"
          data-lang="ru"
          className="intohi langwrap langwrap_ru flag_link rus"
          onClick={() => handleFlagClick("ru")}
        >
          <img src={Russia} alt="Russian" />
        </a>

        <a
          href="#"
          data-lang="zh"
          className="intohi langwrap langwrap_zh flag_link zh"
          onClick={() => handleFlagClick("zh")}
        >
          <img src={china} alt="Chinese" />
        </a>

        <a
          href="#"
          data-lang="es"
          className="intohi langwrap langwrap_es flag_link es"
          onClick={() => handleFlagClick("es")}
        >
          <img src={spanish} alt="Spanish" />
        </a>

        <a
          href="#"
          data-lang="ar"
          className="intohi langwrap langwrap_ar flag_link ara"
          onClick={() => handleFlagClick("ar")}
        >
          <img src={arabic} alt="Arabic" />
        </a>

        <a
          href="#"
          data-lang="tr"
          className="intohi langwrap langwrap_tr flag_link tur"
          onClick={() => handleFlagClick("tr")}
        >
          <img src={Turkish} alt="Turkish" />
        </a>
      </div>
    </div>
  );
};

export default LanguageSelector;
