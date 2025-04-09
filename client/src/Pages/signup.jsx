import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ handleVerifyOtp }) {
  const navigate = useNavigate();
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
    setLoading(true);
    setError("");

    try {
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
    <div className="relative flex flex-col min-h-screen">
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
          <h1 className="text-3xl font-bold !mb-4">Welcome to LAMSA</h1>
          <h2 className="text-xl font-bold !mb-6">Sign up</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <label className="block font-bold !mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="username"
            />
            <label className="block font-bold !mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="email@example.com"
            />
            <label className="block font-bold !mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="password"
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
            <label className="block font-bold !mb-2" htmlFor="phone">
              Phone number
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder="(e.g. 0123456789)"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer"
            >
              Sign up
            </button>
          </form>
          <div className="text-center !mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                className="text-red-500 cursor-pointer font-bold"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Design: Sign-up Form */}
      <div className="relative !mt-auto bg-white rounded-t-4xl shadow-lg !p-10 !sm:p-10 w-full mx-auto lg:hidden">
        <h1 className="text-center text-2xl font-bold !mb-4">
          Welcome to LAMSA
        </h1>
        <h2 className="text-center text-lg font-bold !mb-6">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label className="block font-bold !mb-1" htmlFor="username">
            Username
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="username"
          />
          <label className="block font-bold !mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="email@example.com"
          />
          <label className="block font-bold !mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="At least 6 characters"
          />
          <label className="block font-bold !mb-1" htmlFor="phone">
            Phone number
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-3 !p-2 w-full"
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="(e.g. 0123456789)"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
          >
            Sign up
          </button>
        </form>
        <div className="text-center !mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-red-500 cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
