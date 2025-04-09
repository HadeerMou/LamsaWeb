import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Address({ addressId }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    streetName: "",
    cityId: "",
    countryId: "",
    districtId: "",
    apartmentNumber: "",
    buildingNumber: "",
    isDefault: false,
  });
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCities();
    fetchCountries();

    if (addressId) {
      setIsEditing(true);
      fetchAddresses(addressId);
    }
  }, [addressId]);

  // Fetch districts when city changes
  useEffect(() => {
    if (newAddress.cityId) {
      fetchDistricts(newAddress.cityId);
    }
  }, [newAddress.cityId]);

  const fetchAddresses = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const userId = parseInt(localStorage.getItem("userId")); // Ensure user ID is stored
      console.log("User ID Type:", typeof userId, "Value:", userId);

      const response = await axios.get(
        `${API_BASE_URL}/address/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched Address:", response.data);
      setNewAddress(response.data); // Assuming API returns the full address object
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const addAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Get userId from storage

      if (!token || !userId) {
        alert("Unauthorized to create: Please log in again");
        return;
      }

      const numericUserId = parseInt(userId, 10); // Ensure userId is a number

      if (isNaN(numericUserId)) {
        alert("Invalid user ID. Please log in again.");
        return;
      }

      // Create the address
      const response = await axios.post(`${API_BASE_URL}/address`, newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const createdAddress = response.data;
      setAddresses([...addresses, createdAddress]);

      // Fetch user addresses to check if it's the first one
      const userAddressesResponse = await axios.get(
        `${API_BASE_URL}/address/user/${numericUserId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (userAddressesResponse.data.length === 1) {
        // If this is the first address, set it as default
        await axios.post(
          `${API_BASE_URL}/address/user/${numericUserId}/default/${createdAddress.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setNewAddress((prev) => ({ ...prev, isDefault: true }));
      }

      console.log("Address created successfully!");
      localStorage.setItem("userAddress", JSON.stringify(createdAddress));
      navigate("/profile");
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const updateAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in again");
        return;
      }

      await axios.put(`${API_BASE_URL}/address/${addressId}`, newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Address updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Unauthorized: Please log in again");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/address/user/${userId}/default/${addressId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Default address set successfully!");
      fetchAddresses(userId);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in again");
        return;
      }

      await axios.delete(`${API_BASE_URL}/address/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted address from state
      setAddresses(addresses.filter((address) => address.id !== addressId));
      console.log("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/country`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/district/by-city/${cityId}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue =
      type === "checkbox"
        ? checked
        : ["cityId", "countryId"].includes(name)
        ? Number(value) || ""
        : value;
    const updatedAddress = {
      ...newAddress,
      [name]: updatedValue,
    };

    setNewAddress(updatedAddress);

    if (name === "isDefault" && checked) {
      await setDefaultAddress(newAddress.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateAddress();
    } else {
      await addAddress();
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="title">Address</h2>
      <div className="checkrow">
        <div className="col-75">
          <div className="checkcontainer">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Address</h3>
                  <label>Street Name</label>
                  <input
                    type="text"
                    name="streetName"
                    value={newAddress.streetName}
                    onChange={handleChange}
                    placeholder="542 W. 15th Street"
                    required
                  />
                  <div className="row">
                    <div className="col-25">
                      <label>City Id</label>
                      <select
                        name="cityId"
                        value={newAddress.cityId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-25">
                      <label>Country Id</label>
                      <select
                        name="countryId"
                        value={newAddress.countryId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-25">
                      <label>District Id</label>
                      <select
                        name="districtId"
                        value={newAddress.districtId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option
                            key={district.district_id}
                            value={district.district_id}
                          >
                            {district.districtName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-50">
                        <label>Apartment No</label>
                        <input
                          type="text"
                          name="apartmentNumber"
                          value={newAddress.apartmentNumber}
                          onChange={handleChange}
                          placeholder="5"
                          required
                        />
                      </div>
                      <div className="col-50">
                        <label>Building No</label>
                        <input
                          type="text"
                          name="buildingNumber"
                          value={newAddress.buildingNumber}
                          onChange={handleChange}
                          placeholder="20"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit">
                  {isEditing ? "Update Address" : "Create Address"}
                </button>
              </div>
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newAddress.isDefault}
                />{" "}
                Set as default address
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
