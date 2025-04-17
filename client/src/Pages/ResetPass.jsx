import React, { useState } from "react";
import logo from "../logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../TranslationContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPass() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { translations, direction } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false); // 👀 State for password visibility
  const [showPassword2, setShowPassword2] = useState(false); // 👀 State for password visibility

  // Extract email or token from URL query (backend should provide a token in the email link)
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleResetPassword = async () => {
    setError(""); // Reset errors

    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    const otp = sessionStorage.getItem("otp"); // ✅ Retrieve OTP stored in sessionStorage

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/reset`, {
        email, // The email linked to the reset request
        newPassword: password,
        otp,
      });
      // Clear OTP from sessionStorage after use
      sessionStorage.removeItem("otp");

      setError("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Password Reset Error:", err);
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Mobile Design: Background Image */}
      <div className="absolute !top-0 left-0 w-full !h-2/3 sm:h-1/2 lg:hidden">
        <img
          className="w-full h-full object-cover"
          src="\assets\Untitled-1-25.jpg"
          alt=""
        />
      </div>
      <div className="hidden lg:flex lg:justify-center lg:items-center lg:gap-10 lg:!py-3">
        <div className="img w-1/2 !px-4">
          <img
            className="w-full h-200 object-cover rounded-3xl !mx-8"
            src="\assets\Untitled-1-25.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-200 !p-20 rounded-lg">
          <h1 className="text-3xl font-bold !mb-4">{translations.resetpass}</h1>
          <p className="text-lg !mb-10">{translations.enternewpass}</p>
          <div className="w-full">
            <div className="relative flex items-center !border !border-black/50 rounded-md !mb-7 !p-3">
              <input
                className={`${
                  direction === "ltr" ? "pl-12 pr-10" : "pl-10 pr-12"
                } bg-transparent  w-full`}
                type={showPassword1 ? "text" : "password"}
                name="password"
                value={password}
                placeholder={translations.newpass}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={`${
                  direction === "ltr" ? "right-4!" : "left-4!"
                }absolute cursor-pointer z-20 hover:text-black`}
                onClick={togglePasswordVisibility1}
              >
                {showPassword1 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="relative flex items-center !border !border-black/50 rounded-md !mb-7 !p-3">
              <input
                className={`${
                  direction === "ltr" ? "pl-12 pr-10" : "pl-10 pr-12"
                } bg-transparent  w-full`}
                type={showPassword2 ? "text" : "password"}
                name="password"
                value={confirmPassword}
                placeholder={translations.confirmpass}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className={`${
                  direction === "ltr" ? "right-4!" : "left-4!"
                }absolute cursor-pointer z-20 hover:text-black`}
                onClick={togglePasswordVisibility2}
              >
                {showPassword2 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer"
            >
              {translations.resetpass}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Design*/}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !px-10 !py-20 sm:p-10! !w-full !mx-auto lg:hidden">
        <h1 className="text-center text-2xl font-bold !mb-3">
          {translations.resetpass}
        </h1>
        <p className="text-center !text-md !mb-8">
          {translations.enternewpass}
        </p>
        <div>
          <div className="relative flex items-center !border !border-black/50 rounded-md !mb-7 !p-3">
            <input
              className={`${
                direction === "ltr" ? "pl-12 pr-10" : "pl-10 pr-12"
              } bg-transparent  w-full`}
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={password}
              placeholder={translations.newpass}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={`${
                direction === "ltr" ? "right-4!" : "left-4!"
              }absolute cursor-pointer z-20 hover:text-black`}
              onClick={togglePasswordVisibility1}
            >
              {showPassword1 ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="relative flex items-center !border !border-black/50 rounded-md !mb-7 !p-3">
            <input
              className={`${
                direction === "ltr" ? "pl-12 pr-10" : "pl-10 pr-12"
              } bg-transparent  w-full`}
              type={showPassword2 ? "text" : "password"}
              name="password"
              value={confirmPassword}
              placeholder={translations.confirmpass}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className={`${
                direction === "ltr" ? "right-4!" : "left-4!"
              }absolute cursor-pointer z-20 hover:text-black`}
              onClick={togglePasswordVisibility2}
            >
              {showPassword2 ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
          >
            {translations.resetpass}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
