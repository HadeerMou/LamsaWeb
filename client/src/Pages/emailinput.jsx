import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../TranslationContext";

function EmailInput() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { translations } = useTranslation(); // Assuming you have a translation context
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Determine the page type based on the URL
  const isVerification = location.pathname.includes("email-verification");
  const isForgotPassword = location.pathname.includes("forgot-password");

  const handleInput = async () => {
    setError(""); // Reset errors

    if (!input.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      console.log("Entered Email:", input);
      let apiEndpoint = "";

      if (isVerification) {
        apiEndpoint = `${API_BASE_URL}/auth/sendotp`;
      } else if (isForgotPassword) {
        apiEndpoint = `${API_BASE_URL}/auth/forget`;
      }

      if (!apiEndpoint) {
        throw new Error("Invalid request type");
      }

      // Use "input" key in request body to match backend expectation
      const requestBody = { input: input };

      const response = await axios.post(apiEndpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("OTP Sent Successfully:", response.data);

      // Store email in localStorage for persistence
      localStorage.setItem("inputForOtp", input);

      // Corrected navigate function
      navigate(
        `/otp?input=${encodeURIComponent(input)}&from=${
          isForgotPassword ? "forgot-password" : "email-verification"
        }`
      );
    } catch (err) {
      console.error("Error sending OTP:", err);
      const errorMessage = err.response?.data?.message || "Failed to send OTP";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
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
          <h1 className="text-3xl font-bold !mb-4">
            {translations.emailverify}
          </h1>
          <p className="text-lg !mb-10">{translations.enteremail} </p>
          <div className="w-full">
            <label className="block font-bold !mb-2" htmlFor="email">
              {translations.email}
            </label>
            <input
              className="input bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="email"
              placeholder="email@example.com"
            />
            {error && <p className="error">{error}</p>}
            <button
              onClick={handleInput}
              className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer"
            >
              {translations.sendcode}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Design*/}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !px-10 !py-20 sm:p-10! !w-full !mx-auto lg:hidden">
        <h1 className="text-center text-2xl font-bold !mb-3">
          {translations.emailverify}
        </h1>
        <p className="text-center !text-md !mb-8">{translations.enteremail} </p>
        <div>
          <label className="block font-bold !mb-2" htmlFor="email">
            {translations.email}
          </label>
          <input
            className="bg-transparent !border !border-black/50 rounded-md !mb-7 !p-3 w-full"
            type="text"
            name="email"
            placeholder="email@example.com"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleInput}
            className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
          >
            {translations.sendcode}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailInput;
