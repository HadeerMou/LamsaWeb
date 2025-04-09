import React, { useState } from "react";
import logo from "../logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ResetPass() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract email or token from URL query (backend should provide a token in the email link)
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

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

      // Show success message
      alert("Password updated successfully! Please log in.");

      // Redirect to login
      navigate("/user-login");
    } catch (err) {
      console.error("Password Reset Error:", err);
      setError(err.response?.data?.message || "Failed to reset password.");
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
          <h1 className="text-3xl font-bold !mb-4">Reset Password</h1>
          <p className="text-lg !mb-10">
            Please enter a new password to update your password
          </p>
          <div className="w-full">
            <input
              className="input bg-transparent !border !border-black/50 rounded-md !mb-7 !p-3 w-full"
              type="password"
              name="password"
              placeholder="New Password"
            />
            <input
              className="input bg-transparent !border !border-black/50 rounded-md !mb-7 !p-3 w-full"
              type="password"
              name="password"
              placeholder="Confirm New Password"
            />
            <button className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer">
              Reset Password
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Design*/}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !px-10 !py-20 sm:p-10! !w-full !mx-auto lg:hidden">
        <h1 className="text-center text-2xl font-bold !mb-3">Reset Password</h1>
        <p className="text-center !text-md !mb-8">
          Please enter a new password to update your password
        </p>
        <div>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-7 !p-3 w-full"
            type="password"
            name="password"
            placeholder="New Password"
          />
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-7 !p-3 w-full"
            type="password"
            name="password"
            placeholder="Confirm New Password"
          />
          <button className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
