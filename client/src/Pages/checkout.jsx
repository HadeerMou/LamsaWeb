import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/header";
import { IoCartOutline } from "react-icons/io5";
import { useTranslation } from "../TranslationContext";

export default function Checkout({ toggleCartVisibility, totalQuantity }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { translations } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardname: "",
    cardnumber: "",
    expmonth: "",
    expyear: "",
    cvv: "",
    sameadr: true,
  });

  const fetchLocationName = async (id, type) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${type}/${id}`);
      if (type === "district") {
        return response.data.districtName;
      }
      return response.data.name; // Assuming API returns { name: "City Name" }
    } catch (error) {
      console.error(`Error fetching ${type} name:`, error);
      return "";
    }
  };

  /*   const fetchDefaultAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Unauthorized: Please log in again");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/address/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const defaultAddr = response.data.find((address) => address.isDefault);
      console.log("API Response:", response.data);

      if (defaultAddr) {
        setDefaultAddress(defaultAddr);
        setDefaultAddressId(defaultAddr.id);
        console.log("Fetched Default Address:", defaultAddr);

        // Fetch names for city, country, and district
        const country = await fetchLocationName(
          defaultAddr.Addresses.countryId,
          "country"
        );
        const city = await fetchLocationName(
          defaultAddr.Addresses.cityId,
          "cities"
        );
        const district = await fetchLocationName(
          defaultAddr.Addresses.districtId,
          "district"
        );

        setCountryName(country);
        setCityName(city);
        setDistrictName(district);
        console.log("Fetched Names:", { country, city, district });
      } else {
        alert("No default address found. Please set one in your profile.");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error fetching default address:", error);
    }
  };

  useEffect(() => {
    fetchDefaultAddress();
  }, []); */

  useEffect(() => {
    if (
      defaultAddress &&
      defaultAddress.Addresses &&
      countryName &&
      cityName &&
      districtName
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstname: defaultAddress.fullName || "",
        email: defaultAddress.email || "",
        address:
          `${defaultAddress.Addresses.buildingNumber}, ${defaultAddress.Addresses.streetName}` ||
          "",
        country: countryName,
        city: cityName,
        district: districtName,
        building: defaultAddress.Addresses.buildingNumber || "",
        apartment: defaultAddress.Addresses.apartmentNumber || "",
      }));
    }
    console.log("Updated Default Address:", defaultAddress);
  }, [defaultAddress]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!defaultAddressId) {
      alert(
        "No default address found. Please select an address before proceeding."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        total: totalPrice,
        addressId: defaultAddressId,
        orderItems: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: parseInt(item.price, 10),
        })),
      };

      console.log("Final Address ID:", defaultAddressId);
      console.log("Order Payload:", JSON.stringify(orderData, null, 2));

      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Order placed", response.data);
      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      alert(
        `Failed to place order: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <div className="lg:p-8! !p-4">
        <h2 className="font-bold text-md! sm:text-lg! md:text-xl! lg:text-3xl! !p-2 lg:p-5! !mb-4">
          {translations.checkout}
        </h2>
        <div className="lg:flex">
          <div className="lg:p-5! lg:w-2/3">
            <div className="flex flex-col lg:gap-10">
              <div className="lg:flex gap-5">
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.fullname}
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John M. Doe"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs !mb-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.email}
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs !mb-2"
                  />
                </div>
              </div>
              <div className="lg:flex gap-5">
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.address}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="542 W. 15th Street"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs !mb-3"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.buildingno}
                  </label>
                  <input
                    type="text"
                    name="bulding"
                    value={formData.building}
                    onChange={handleChange}
                    placeholder="10"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs !mb-3"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.apartmentno}
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="6"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs"
                  />
                </div>
              </div>
              <div className="lg:flex gap-5">
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.country}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="New York"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.city}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="!p-2 !mb-1 font-bold">
                    {translations.district}
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="NY"
                    required
                    className="border-b-1! border-gray-500! rounded-sm !p-2 lg:w-xs"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col !p-4 gap-3 lg:w-1/3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm! lg:text-lg!">
                {translations.ordersummary}
              </h4>
              <h4>
                <span className="flex items-center gap-1 text-sm! lg:text-lg!">
                  <IoCartOutline />
                  <b>{cart.length}</b>
                </span>
              </h4>
            </div>

            {cart.map((item) => (
              <p className="prodOrd" key={item.productId}>
                <img src={item.image} alt={item.name} />{" "}
                <span className="price">
                  {item.name} x {item.quantity} - {item.price * item.quantity}
                </span>
              </p>
            ))}

            <hr className="solid min-h-0.5 bg-black/50" />
            <div className="flex justify-between items-center !mt-1">
              <p className="">{translations.subtotal}</p>
              <span className="price">
                <b>${totalPrice.toFixed(2)}</b>
              </span>
            </div>
            <div className="flex justify-between items-center !my-1">
              <p className="">{translations.shipping}</p>
              <span className="price">
                <b>${totalPrice.toFixed(2)}</b>
              </span>
            </div>
            <hr className="solid min-h-0.5 bg-black/20" />

            <div className="flex justify-between items-center">
              <p className="text-black/80! text-lg">{translations.total}</p>
              <span className="price text-lg">
                <b>${totalPrice.toFixed(2)}</b>
              </span>
            </div>
            <button
              type="submit"
              className="!py-3 w-full !mt-8 bg-red-300! rounded-md text-white hover:bg-red-500!"
              onClick={handleSubmit}
            >
              {translations.checkout}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
