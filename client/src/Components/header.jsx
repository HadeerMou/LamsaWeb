import logo from "../logo.png";
import "./header.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../TranslationContext"; // Import translation hook
import { Link, useNavigate } from "react-router-dom";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

function Header({ toggleCartVisibility, totalQuantity }) {
  const [cart, setCart] = useState([]); // ✅ Define cart state
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { translations, changeLanguage } = useTranslation(); // Using translation context
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English
  const { selectedCurrency, changeCurrency } = useCurrency(); // Using currency context

  const fetchUserCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data); // Update cart state
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  useEffect(() => {
    setSelectedLanguage(localStorage.getItem("language") || "en");
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    changeLanguage(newLanguage); // Update language in context
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    changeCurrency(newCurrency); // Update Currency in context
  };

  // Simulate login state (replace this with actual login state logic)
  const isLoggedIn = localStorage.getItem("token"); // You can check a token or user data here
  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/profile"); // Navigate to profile if logged in
    } else {
      navigate("/register"); // Navigate to register if not logged in
    }
  };
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };
  let [open, setOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <h2>{translations.lamsa}</h2>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-gray-600 hover:text-gray-800">
              {translations.about}
            </Link>
            <Link to="/paintings" className="text-gray-600 hover:text-gray-800">
              {translations.paintings}
            </Link>
            <Link to="/curtains" className="text-gray-600 hover:text-gray-800">
              {translations.curtains}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800">
              {translations.contact}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <select
              name="lang"
              id="lang"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">{translations.english}</option>
              <option value="ar">{translations.arabic}</option>
            </select>
            <div className="hidden md:flex items-center gap-4">
              {" "}
              {isLoggedIn ? (
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleLogout}
                >
                  {translations.logout}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-red-300 text-white !px-5 !py-2 rounded-md hover:bg-red-700"
                  >
                    {translations.login}
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gray-100 text-gray-700 !px-5 !py-2 rounded-md hover:bg-gray-300"
                  >
                    {translations.register}
                  </Link>
                </>
              )}
            </div>
            <FaUserCircle
              className="text-3xl text-red-300 cursor-pointer"
              onClick={() => navigate("/profile")}
            />
            <CiShoppingCart
              className="text-3xl text-red-300 cursor-pointer"
              onClick={toggleCartVisibility}
            />
          </div>

          <button
            className="flex md:hidden !p-2 !m-2 text-gray-600 !bg-transparent rounded-sm"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full flex flex-col items-center !py-4 !space-y-4 z-50">
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            {translations.about}
          </Link>
          <Link
            to="/paintings"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            {translations.paintings}
          </Link>
          <Link
            to="/curtains"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            {translations.curtains}
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            {translations.contact}
          </Link>

          {/* Mobile Login/Register or Logout */}
          {isLoggedIn ? (
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
            >
              {translations.logout}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-red-300 text-white !px-4 !py-1 rounded-md hover:bg-red-700"
                onClick={() => setOpen(false)}
              >
                {translations.login}
              </Link>
              <Link
                to="/signup"
                className="bg-gray-100 text-gray-700 !px-4 !py-1 rounded-md hover:bg-gray-300"
                onClick={() => setOpen(false)}
              >
                {translations.register}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
