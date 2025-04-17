import React, { useState } from "react";
import { useEffect } from "react";
import { BsJustify } from "react-icons/bs";
import { useTranslation } from "../../TranslationContext";

function DASHHeader({ OpenSidebar }) {
  const { translations, changeLanguage, language } = useTranslation(); // Using translation context
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    changeLanguage(newLanguage); // Update language in context
  };
  // State to track if dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, check if dark mode is already saved in localStorage (optional)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme-variables");
    }
  }, []);

  // Toggle the theme when the user clicks the button
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove("dark-theme-variables");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme-variables");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <header className="flex items-center justify-between bg-white shadow lg:px-6! lg:py-4! py-2! px-3! w-full">
      <div className="flex items-center space-x-4!">
        <BsJustify
          className="text-2xl cursor-pointer lg:hidden"
          onClick={OpenSidebar}
        />
        <div>
          <p className="text-gray-700">
            Hey, <b>Admin</b>
          </p>
          <small className="text-gray-500">Admin</small>
        </div>
      </div>
      <div className="flex items-center space-x-6!">
        {/* Language Selector */}
        <select
          name="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="border! border-gray-300! rounded-md! px-3! py-1! text-gray-700!"
        >
          <option value="en">{translations.english}</option>
          <option value="ar">{translations.arabic}</option>
        </select>

        {/* Theme Toggler */}
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2! text-gray-700!"
        >
          <i
            className={`fa-solid ${
              isDarkMode ? "fa-moon text-gray-900!" : "fa-sun text-yellow-500!"
            }`}
          ></i>
        </button>
      </div>
    </header>
  );
}

export default DASHHeader;
