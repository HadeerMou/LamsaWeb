import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../TranslationContext";

function Signup({ handleVerifyOtp }) {
  const navigate = useNavigate();
  const { translations } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.activeElement.blur();
    setLoading(true);
    setError("");

    try {
      console.log("Sending Data:", formData);
      console.log("API URL:", API_BASE_URL);
      const response = await axios.post(
        `${API_BASE_URL}/auth/signUp`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            userType: "USER",
          },
        }
      );
      console.log("Signup successful:", response.data);
      navigate(
        `/email-verification?email=${encodeURIComponent(formData.email)}`
      );
    } catch (err) {
      if (err.response.data.message == "Email is not verified") {
        navigate(
          `/email-verification?email=${encodeURIComponent(formData.email)}`
        );
      }

      setError(err.response?.data.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex flex-col h-screen">
      {/* Mobile Design: Background Image */}
      <div className="absolute !top-0 left-0 w-full !h-1/3 sm:h-1/2 lg:hidden">
        <img
          className="w-full h-full object-cover"
          src="\assets\Untitled-1-25.jpg"
          alt=""
        />
      </div>
      {/* Large Screen Design: Side-by-Side Layout */}
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
            {translations.registerTitle}
          </h1>
          <h2 className="text-xl font-bold !mb-6">{translations.register}</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <label className="block font-bold !mb-2" htmlFor="username">
              {translations.username}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
            />
            <label className="block font-bold !mb-2" htmlFor="email">
              {translations.email}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
            <label className="block font-bold !mb-2" htmlFor="password">
              {translations.password}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
            <label className="block font-bold !mb-2" htmlFor="phone">
              {translations.number}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(e.g. 0123456789)"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer"
            >
              {translations.register}
            </button>
          </form>
          <div className="text-center !mt-4">
            <p className="text-sm">
              {translations.haveacc}{" "}
              <span
                className="text-red-500 cursor-pointer font-bold"
                onClick={() => navigate("/login")}
              >
                {translations.login}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Design: Sign-up Form */}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !p-10 !sm:p-10 w-full mx-auto lg:hidden">
        <h1 className="text-center text-2xl font-bold !mb-4">
          {translations.registerTitle}
        </h1>
        <h2 className="text-center text-lg font-bold !mb-6">
          {translations.register}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block font-bold !mb-1" htmlFor="username">
            {translations.username}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
          />
          <label className="block font-bold !mb-1" htmlFor="email">
            {translations.email}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
          <label className="block font-bold !mb-1" htmlFor="password">
            {translations.password}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
          />
          <label className="block font-bold !mb-1" htmlFor="phone">
            {translations.number}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(e.g. 0123456789)"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
          >
            {translations.register}
          </button>
        </form>
        <div className="text-center !mt-4">
          <p className="text-sm">
            {translations.haveacc}{" "}
            <span
              className="text-red-500 cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              {translations.login}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
