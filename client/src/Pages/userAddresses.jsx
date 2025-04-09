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
  const [locationNames, setLocationNames] = useState({
    city: "",
    district: "",
    country: "",
  });

  const fetchLocationNames = async (address) => {
    if (!address) return {};
    console.log("Address Object:", address.Addresses); // Debugging

    try {
      const { cityId, districtId, countryId } = address.Addresses || {};
      let locationData = {};
      console.log("Address Object:", address.Addresses);
      if (cityId) {
        const cityRes = await axios.get(`${API_BASE_URL}/cities/${cityId}`);
        console.log("City Response:", cityRes.data);
        locationData.city = cityRes.data.name;
      }

      if (districtId) {
        const districtRes = await axios.get(
          `${API_BASE_URL}/district/${districtId}`
        );
        console.log("District Response:", districtRes.data);
        locationData.district = districtRes.data.districtName;
      }

      if (countryId) {
        const countryRes = await axios.get(
          `${API_BASE_URL}/country/${countryId}`
        );
        console.log("Country Response:", countryRes.data);
        locationData.country = countryRes.data.name;
      }

      return locationData; // Return the fetched location names
    } catch (error) {
      console.error("Error fetching location names:", error);
      return {};
    }
  };

  const fetchUserAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        console.error("No token or userId found, user not authenticated.");
        return;
      }
      const response = await axios.get(
        `${API_BASE_URL}/address/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const addresses = response.data || [];

      // Fetch location names for all addresses in parallel
      const updatedAddresses = await Promise.all(
        addresses.map(async (address) => {
          const locationNames = await fetchLocationNames(address);
          return {
            ...address,
            locationNames, // Attach location names to the address object
          };
        })
      );

      setUserAddresses(updatedAddresses);
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserAddresses((prevAddresses) => {
        const updatedAddresses = prevAddresses.filter(
          (item) => item.addressId !== id
        );
        localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));
        return updatedAddresses; // Ensure state updates properly
      });
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/country`);
        setCountries(res.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchCities = async (countryId) => {
    if (!countryId) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/cities`);
      const filteredCities = res.data.filter(
        (city) => city.countryId === countryId
      );
      setCities(filteredCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    if (!cityId) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/district/by-city/${cityId}`);
      setDistricts(res.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleShowModal = (type, address = null) => {
    setModalType(type);
    setSelectedAddress(address);
    setShowModal(true);
    console.log("Selected Address in handleShowModal:", address);

    if (address) {
      setLocationNames({
        city:
          cities.find((c) => c.id === address.Addresses?.cityId)?.name || "",
        district:
          districts.find((d) => d.district_id === address.Addresses?.districtId)
            ?.districtName || "",
        country:
          countries.find((cn) => cn.id === address.Addresses?.countryId)
            ?.name || "",
      });
      fetchCities(address.Addresses?.countryId);
      fetchDistricts(address.Addresses?.cityId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    let id = selectedAddress
      ? Number(selectedAddress?.addressId || selectedAddress?.Addresses?.id)
      : null;

    if (modalType === "edit" && !id) {
      console.error("Error: Address ID is missing.");
      alert("Error: Invalid address ID.");
      return;
    }
    const addressData = {
      streetName: formData.get("streetName"),
      districtId: formData.get("districtId")
        ? formData.get("districtId")
        : null,
      isDefault: formData.get("isDefault") === "on",
      apartmentNumber: formData.get("apartmentNumber"),
      buildingNumber: formData.get("buildingNumber"),
      countryId: formData.get("countryId")
        ? parseInt(formData.get("countryId"), 10)
        : null,
      cityId: formData.get("cityId")
        ? parseInt(formData.get("cityId"), 10)
        : null,
    };
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in and try again.");
      return;
    }
    console.log("Submitting address data:", addressData);
    console.log("Form Data Extracted:", {
      districtId: formData.get("districtId"),
      cityId: formData.get("cityId"),
      countryId: formData.get("countryId"),
    });

    try {
      if (modalType === "edit") {
        let response = await axios.put(
          `${API_BASE_URL}/address/${id}`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Address updated successfully:", response.data);
      } else {
        let response = await axios.post(
          `${API_BASE_URL}/address`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Address added successfully:", response.data);
      }
      fetchUserAddresses();
      fetchUpdatedAddresses();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving address:", error.response?.data || error);
    }
  };

  const fetchUpdatedAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        console.error("User not authenticated.");
        return;
      }
      const response = await axios.get(
        `${API_BASE_URL}/address/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserAddresses(response.data || []);
      localStorage.setItem("userAddresses", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching updated addresses:", error);
    }
  };
  // Call this function after a successful update
  fetchUpdatedAddresses();

  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />

      <div className="container mt-4">
        <h1 className="mb-4">{translations.alladdresses}</h1>

        <Button className="bg-dark" onClick={() => handleShowModal("add")}>
          {translations.addaddress}
        </Button>

        <div className="row mt-3">
          {userAddresses.length > 0 ? (
            userAddresses.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card p-3 mb-3 shadow-sm">
                  <p>
                    <strong>Street:</strong>{" "}
                    {item.Addresses?.streetName || "N/A"}
                  </p>
                  <div className="d-flex justify-content-between me-4">
                    <p>
                      <strong>Apartment no:</strong>{" "}
                      {item.Addresses?.apartmentNumber || "N/A"}
                    </p>
                    <p>
                      <strong>Building no:</strong>{" "}
                      {item.Addresses?.buildingNumber || "N/A"}
                    </p>
                  </div>
                  <p>
                    <strong>District:</strong>{" "}
                    {item.locationNames?.district || "N/A"}
                  </p>
                  <div className="d-flex justify-content-between me-4">
                    <p>
                      <strong>City:</strong> {item.locationNames?.city || "N/A"}
                    </p>
                    <p>
                      <strong>Country:</strong>{" "}
                      {item.locationNames?.country || "N/A"}
                    </p>
                  </div>

                  {item.isDefault && <p className="text-success">✅ Default</p>}

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      onClick={() => handleShowModal("edit", item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.addressId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-3">No addresses found.</p>
          )}
        </div>

        <Button variant="secondary" onClick={() => navigate("/profile")}>
          🔙{translations.backtoprof}
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "edit" ? "Edit Address" : "Add New Address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Street Name</Form.Label>
              <Form.Control
                name="streetName"
                defaultValue={selectedAddress?.Addresses?.streetName || ""}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Apartment Number</Form.Label>
              <Form.Control
                name="apartmentNumber"
                defaultValue={selectedAddress?.Addresses?.apartmentNumber || ""}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Building Number</Form.Label>
              <Form.Control
                name="buildingNumber"
                defaultValue={selectedAddress?.Addresses?.buildingNumber || ""}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="countryId"
                defaultValue={selectedAddress?.Addresses?.countryId || ""}
                onChange={(e) => fetchCities(parseInt(e.target.value, 10))}
                required
              >
                <option>Select Country</option>
                {countries.map((cn) => (
                  <option key={cn.id} value={cn.id}>
                    {cn.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                name="cityId"
                defaultValue={selectedAddress?.Addresses?.cityId || ""}
                onChange={(e) => fetchDistricts(parseInt(e.target.value, 10))}
                required
              >
                <option>Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>District</Form.Label>
              <Form.Control as="select" name="districtId" required>
                <option>Select District</option>
                {districts.map((d) => (
                  <option key={d.district_id} value={d.district_id}>
                    {d.districtName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Set as Default"
                name="isDefault"
                defaultChecked={selectedAddress?.isDefault}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {modalType === "edit" ? "Update Address" : "Add Address"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
}

export default UserAddresses;
