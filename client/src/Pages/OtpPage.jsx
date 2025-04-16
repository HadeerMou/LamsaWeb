import React, { useEffect, useRef, useState } from "react";
import logo from "../logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../TranslationContext";

function OtpPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { translations } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("input");
  const from = searchParams.get("from"); // Capture source (verification or forgot-password)
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill("")); // Store OTP as an array
  const inputsRef = useRef(new Array(6).fill(null));
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleResendOtp = async (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    try {
      await axios.post(`${API_BASE_URL}/auth/sendotp`, {
        input: email,
        userType: "USER",
      });
      alert("OTP has been resent!");
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    }
  };
  // Handle Input Change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      // Ensure only numbers
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputsRef.current[index + 1].focus(); // Move to the next input
      }
    }
  };

  // Handle Backspace Key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear input
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1].focus(); // Move to previous input
      }
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.includes("")) {
      alert("Please enter the complete OTP.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verifyotp`, {
        input: email,
        otp: otp.join(""), // Convert array to string
        userType: "USER", // Required header
      });

      sessionStorage.setItem("otp", otp.join("")); // ✅ Store OTP in sessionStorage

      // Assuming the response contains user data and a token
      const { user, token } = response.data;

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Save user details
      localStorage.setItem("token", token); // Save authentication token

      alert("OTP Verified Successfully!");
      const storedData = JSON.parse(localStorage.getItem("signupData"));
      if (storedData && from === "signup") {
        try {
          // Final signup request to create the user in the database
          const signupResponse = await axios.post(
            `${API_BASE_URL}/auth/signUp`,
            storedData,
            {
              headers: {
                "Content-Type": "application/json",
                accept: "*/*",
                userType: "USER",
              },
            }
          );

          console.log("User Created:", signupResponse.data);

          // Clear stored data
          localStorage.removeItem("signupData");
          alert("User created successfully! Please log in.");
          navigate("/login");
        } catch (signupError) {
          // ✅ If user already exists, just redirect to login
          if (
            signupError.response?.data?.message.includes("Email already exists")
          ) {
            console.log("User already exists, skipping signup.");
            localStorage.removeItem("signupData");
            navigate("/login");
          } else {
            alert(
              signupError.response?.data?.message ||
                "Signup failed. Please try again."
            );
          }
        }
      } else if (from === "forgot-password") {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setOtp(new Array(6).fill(""));
      console.error("Error verifying OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid OTP. Please try again.");
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
          <h1 className="text-3xl font-bold !mb-4">
            {translations.verifycode}
          </h1>
          <p className="text-lg !mb-10">
            {translations.enter6digit} {email}
          </p>
          <div className="w-full">
            <div className="flex items-center w-3/4 gap-4 !pb-3 !my-3 !mx-auto">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full h-18 text-center text-2xl !border rounded-sm border-gray-300! focus:outline-none! focus:border-black!"
                  placeholder="-"
                />
              ))}
            </div>
            <Link
              onClick={handleResendOtp}
              className="block text-sm text-center !text-black/50 !underline !mb-3"
            >
              {translations.sendagain}
            </Link>
            <button
              onClick={handleVerifyOtp}
              className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
            >
              {translations.continue}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Design*/}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !px-6 !py-20 sm:p-10! !w-full !mx-auto lg:hidden">
        <h1 className="text-center text-2xl font-bold !mb-3">
          {translations.verifycode}
        </h1>
        <p className="text-center text-md !mb-6">
          {translations.enter6digit} {email}
        </p>
        <div className="flex items-center gap-3 !my-3 !mx-auto">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full h-14 text-center !border rounded-sm border-gray-300! focus:outline-none! focus:border-black!"
              placeholder="-"
            />
          ))}
        </div>
        <Link
          onClick={handleResendOtp}
          className="block text-sm text-center !text-black/50 !underline !mb-3"
        >
          {translations.sendagain}
        </Link>
        <button
          onClick={handleVerifyOtp}
          className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
        >
          {translations.continue}
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
