import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../TranslationContext";

function Signin({ userType }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { translations } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors
    console.log("API Base URL:", import.meta.env.VITE_API_URL);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            userType: userType,
          },
        }
      );

      const token = response.data.data.accessToken;

      // Save token in localStorage
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("userType", userType);

      // Fetch user profile to get the user ID
      if (userType !== "ADMIN") {
        const profileResponse = await axios.get(
          `${API_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userId = profileResponse.data.data.id;
        localStorage.setItem("userId", userId); // Store user ID
      }

      // Redirect based on userType
      if (userType === "ADMIN") {
        navigate("/dashboard"); // Redirect admins
      } else {
        navigate("/"); // Redirect users
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        // API error (backend responded with an error)
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        // Network error (no response)
        setError("No response from server. Check your connection.");
      } else {
        // Other unknown errors
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Mobile Design: Background Image */}
      <div className="absolute !top-0 left-0 w-full !h-1/2 sm:h-1/2 lg:hidden">
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
            {translations.loginTitle}
          </h1>
          <h2 className="text-xl font-bold !mb-6">{translations.signin}</h2>
          <form onSubmit={handleLogin} className="w-full">
            <label className="block font-bold !mb-2" htmlFor="email">
              {translations.email}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block font-bold !mb-2" htmlFor="password">
              {translations.password}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-1 !p-3 w-full"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <Link
              to={"/forgot-password"}
              className="block text-xs !mb-5 text-right hover:text-red-500"
            >
              {translations.forgotpass}
            </Link>
            <button
              type="submit"
              className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer"
            >
              {translations.login}
            </button>
          </form>
          <div className="navto w-full flex gap-4 !mt-1">
            <h5>{translations.noacc}</h5>
            <p
              className="!text-red-500 cursor-pointer font-bold"
              onClick={() => navigate("/signup")}
            >
              {translations.register}
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Design: Sign-in Form */}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !p-10 sm:p-10! !w-full !mx-auto lg:hidden">
        <h1 className="text-center text-2xl! lg:text-3xl! font-bold !mb-4">
          {translations.loginTitle}
        </h1>
        <h2 className="text-center text-lg font-bold !mb-6">
          {translations.login}
        </h2>
        <form onSubmit={handleLogin}>
          <label className="block font-bold !mb-2" htmlFor="email">
            {translations.email}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block font-bold !mb-2" htmlFor="password">
            {translations.password}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-1 !p-3 w-full"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            to={"/forgot-password"}
            className="block text-xs !mb-5 text-right hover:text-red-500"
          >
            {translations.forgotpass}
          </Link>
          {error && <p className="text-red-500 text-sm !mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
          >
            {translations.login}
          </button>
        </form>
        <div className="forgotpass w-full !mt-4"></div>
        <div className="navto w-full flex gap-4 !mt-1">
          <h5>{translations.noacc}</h5>
          <p
            className="!text-red-500 cursor-pointer font-bold"
            onClick={() => navigate("/signup")}
          >
            {translations.register}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
