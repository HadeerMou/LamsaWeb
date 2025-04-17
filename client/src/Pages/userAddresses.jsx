import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useTranslation } from "../TranslationContext";

function UserAddresses({ toggleCartVisibility, cart, totalQuantity }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [userAddresses, setUserAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { translations } = useTranslation();

  useEffect(() => {
    fetchUserAddresses();
    fetchLocations();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      if (!cityId) return;

      const response = await axios.get(
        `${API_BASE_URL}/district/by-city/${cityId}`
      );
      setDistricts(response.data); // Ensure districts are set correctly
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchUserAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      // Fetch cities before fetching addresses
      const cityResponse = await axios.get(`${API_BASE_URL}/cities`);
      const citiesData = cityResponse.data;
      setCities(citiesData); // Ensure cities are set before mapping

      // Fetch cities before fetching addresses
      const countryResponse = await axios.get(`${API_BASE_URL}/country`);
      const countryData = countryResponse.data;
      setCountries(countryData); // Ensure cities are set before mapping

      // Fetch user addresses
      const response = await axios.get(
        `${API_BASE_URL}/address/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const districtMap = {};
      for (const address of response.data) {
        if (
          address.Addresses.cityId &&
          !districtMap[address.Addresses.cityId]
        ) {
          try {
            const districtResponse = await axios.get(
              `${API_BASE_URL}/district/by-city/${address.Addresses.cityId}`
            );
            districtMap[address.Addresses.cityId] = districtResponse.data;
          } catch (error) {
            console.error(
              "Error fetching districts for city:",
              address.Addresses.cityId,
              error
            );
            districtMap[address.Addresses.cityId] = [];
          }
        }
      }

      // Map addresses with city names
      const mappedAddresses = response.data.map((address) => {
        const city = citiesData.find(
          (c) => c.id === Number(address.Addresses.cityId)
        );
        const country = countryData.find(
          (cn) => cn.id === Number(address.Addresses.countryId)
        );
        const districtList = districtMap[address.Addresses.cityId] || [];
        const district = districtList.find(
          (d) => d.district_id === address.Addresses.districtId
        );

        return {
          ...address,
          locationNames: {
            city: city ? city.name : "N/A",
            country: country ? country.name : "N/A",
            district: district ? district.districtName : "N/A",
          },
        };
      });

      setUserAddresses(mappedAddresses);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  const fetchLocations = async (cityId = null) => {
    try {
      const [cityRes, countryRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/cities`),
        axios.get(`${API_BASE_URL}/country`),
      ]);

      setCities(cityRes.data);
      setCountries(countryRes.data);

      if (cityId) {
        const districtRes = await axios.get(
          `${API_BASE_URL}/district/by-city/${cityId}`
        );
        setDistricts(districtRes.data);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`${translations.deleteAdd}`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleShowModal = (type, address = null) => {
    setModalType(type);
    setSelectedAddress(address);
    setShowModal(true);

    if (address && address.Addresses?.cityId) {
      fetchDistricts(address.Addresses.cityId); // Fetch districts for the city
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const addressData = {
      streetName: formData.get("streetName"),
      isDefault: formData.get("isDefault") === "on",
      apartmentNumber: formData.get("apartmentNumber"),
      buildingNumber: formData.get("buildingNumber"),
      countryId: parseInt(formData.get("countryId"), 10) || null,
      cityId: parseInt(formData.get("cityId"), 10) || null,
      districtId: formData.get("districtId") || null,
    };
    const isDefault = formData.get("isDefault") === "on";

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in and try again.");
      return;
    }
    let addressId = null;

    try {
      if (modalType === "edit" && selectedAddress) {
        await axios.put(
          `${API_BASE_URL}/address/${selectedAddress.addressId}`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        addressId = selectedAddress.addressId;
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/address`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        addressId = response.data.addressId;
      }
      if (isDefault && addressId) {
        const userId = localStorage.getItem("userId"); // Assuming you store userId locally
        if (!userId) {
          alert("User ID not found.");
          return;
        }

        // Remove current default address (if any)
        await axios.delete(`${API_BASE_URL}/address/user/${userId}/default`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set the new address as default
        await axios.post(
          `${API_BASE_URL}/address/user/${userId}/default/${addressId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowModal(false);
      fetchUserAddresses();
    } catch (error) {
      console.error("Error saving address:", error.response?.data || error);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header
          toggleCartVisibility={toggleCartVisibility}
          cart={cart}
          totalQuantity={totalQuantity}
        />
        <main className="flex-grow">
          <div className="container mx-auto! my-4!">
            <h1 className="text-2xl font-bold mb-4!">
              {translations.alladdresses}
            </h1>
            <button
              className="bg-black! text-white px-4! py-2! rounded cursor-pointer"
              onClick={() => handleShowModal("add")}
            >
              {translations.addaddress}
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3!">
              {userAddresses.length > 0 ? (
                userAddresses.map((item, index) => (
                  <div key={index} className="shadow-md p-4! rounded">
                    <p>
                      <strong>{translations.street}:</strong>{" "}
                      {item.Addresses?.street || "N/A"}
                    </p>
                    <div className="flex justify-between mt-2!">
                      <p>
                        <strong>{translations.apartmentno}:</strong>{" "}
                        {item.Addresses?.apartmentNumber || "N/A"}
                      </p>
                      <p>
                        <strong>{translations.buildingno}:</strong>{" "}
                        {item.Addresses?.buildingNumber || "N/A"}
                      </p>
                    </div>
                    <p>
                      <strong>{translations.district}:</strong>{" "}
                      {item.locationNames.district || "N/A"}
                    </p>
                    <div className="flex justify-between mt-2!">
                      <p>
                        <strong>{translations.city}:</strong>{" "}
                        {item.locationNames.city}
                      </p>
                      <p>
                        <strong>{translations.country}:</strong>{" "}
                        {item.locationNames.country || "N/A"}
                      </p>
                    </div>
                    {item.isDefault && (
                      <p className="text-green-500">✅ Default</p>
                    )}
                    <div className="flex justify-between mt-4!">
                      <button
                        className="bg-yellow-500! text-white px-3! py-1! rounded cursor-pointer"
                        onClick={() => handleShowModal("edit", item)}
                      >
                        {translations.edit}
                      </button>
                      <button
                        className="bg-red-500! text-white px-3! py-1! rounded cursor-pointer"
                        onClick={() => handleDelete(item.addressId)}
                      >
                        {translations.delete}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-3">No addresses found.</p>
              )}
            </div>
            <button
              className="bg-gray-500! text-white px-4! py-2! rounded mt-2! cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {translations.backtoprof}
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6! rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4!">
                  <h2 className="text-xl font-bold">
                    {modalType === "edit"
                      ? `${translations.updateAdd}`
                      : `${translations.addaddress}`}
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    ✖
                  </button>
                </div>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-4!">
                    <label className="block text-black! text-sm font-medium mb-1!">
                      {translations.street}
                    </label>
                    <input
                      type="text"
                      name="streetName"
                      defaultValue={
                        selectedAddress?.Addresses?.streetName || ""
                      }
                      required
                      className="w-full border! rounded px-3! py-2!"
                    />
                  </div>
                  <div className="mb-4!">
                    <label className="block text-sm font-medium mb-1!">
                      {translations.apartmentno}
                    </label>
                    <input
                      type="text"
                      name="apartmentNumber"
                      defaultValue={
                        selectedAddress?.Addresses?.apartmentNumber || ""
                      }
                      required
                      className="w-full border! rounded px-3! py-2!"
                    />
                  </div>
                  <div className="mb-4!">
                    <label className="block text-sm font-medium mb-1!">
                      {translations.buildingno}
                    </label>
                    <input
                      type="text"
                      name="buildingNumber"
                      defaultValue={
                        selectedAddress?.Addresses?.buildingNumber || ""
                      }
                      required
                      className="w-full border! rounded px-3! py-2!"
                    />
                  </div>
                  <div className="mb-4!">
                    <label className="block text-sm font-medium mb-1!">
                      {translations.country}
                    </label>
                    <select
                      name="countryId"
                      defaultValue={selectedAddress?.Addresses?.countryId || ""}
                      onChange={(e) =>
                        fetchCities(parseInt(e.target.value, 10))
                      }
                      required
                      className="w-full border! rounded px-3! py-2!"
                    >
                      <option value="">{translations.selectCountry}</option>
                      {countries.map((cn) => (
                        <option key={cn.id} value={cn.id}>
                          {cn.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4!">
                    <label className="block text-sm font-medium mb-1!">
                      {translations.city}
                    </label>
                    <select
                      name="cityId"
                      defaultValue={selectedAddress?.Addresses?.cityId || ""}
                      onChange={(e) =>
                        fetchDistricts(parseInt(e.target.value, 10))
                      }
                      required
                      className="w-full border! rounded px-3! py-2!"
                    >
                      <option value="">{translations.selectCity}</option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4!">
                    <label className="block text-sm font-medium mb-1!">
                      {translations.district}
                    </label>
                    <select
                      name="districtId"
                      required
                      className="w-full border! rounded px-3! py-2!"
                    >
                      <option value="">{translations.selectDistrict}</option>
                      {districts.map((d) => (
                        <option key={d.district_id} value={d.district_id}>
                          {d.districtName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4!">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isDefault"
                        defaultChecked={selectedAddress?.isDefault}
                        className="mr-2! ml-2!"
                      />
                      {translations.defaultadd}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500! text-white px-4! py-2! rounded w-full cursor-pointer"
                  >
                    {modalType === "edit"
                      ? `${translations.updateAdd}`
                      : `${translations.createAdd}`}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default UserAddresses;
