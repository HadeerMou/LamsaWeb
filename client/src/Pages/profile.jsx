import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../TranslationContext";
import useProducts from "../Hooks/useProducts";
import useOrders from "../Hooks/useOrders";
import { useCurrency } from "../CurrencyContext";
import axios from "axios";

function Profile({ toggleCartVisibility, cart, totalQuantity }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const { translations, language } = useTranslation();
  const [visibleDiv, setVisibleDiv] = useState("first"); // "first" or "second"
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order
  const [cancelingOrder, setCancelingOrder] = useState(null);
  const { products, fetchProductDetails } = useProducts();
  const { orders, fetchOrders } = useOrders();
  const { selectedCurrency, convertAmount } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [locationNames, setLocationNames] = useState({
    city: "",
    district: "",
    country: "",
  });

  useEffect(() => {
    const fetchLocationNames = async () => {
      if (userAddress) {
        try {
          const { cityId, districtId, countryId } = userAddress;

          const requests = [];

          if (cityId) {
            requests.push(
              axios
                .get(`${API_BASE_URL}/cities/${cityId}`)
                .then((res) => ({ city: res.data.name }))
            );
          }
          if (districtId) {
            requests.push(
              axios
                .get(`${API_BASE_URL}/district/${districtId}`)
                .then((res) => ({ district: res.data.districtName }))
            );
          }
          if (countryId) {
            requests.push(
              axios
                .get(`${API_BASE_URL}/country/${countryId}`)
                .then((res) => ({ country: res.data.name }))
            );
          }
          // Wait for all API calls to resolve
          const results = await Promise.all(requests);
          // Merge results into locationNames state
          setLocationNames((prevState) => ({
            ...prevState,
            ...Object.assign({}, ...results),
          }));
        } catch (error) {
          console.error("Error fetching location names:", error);
        }
      }
    };

    fetchLocationNames();
  }, [userAddress]); // Runs when userAddress changes

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const storedAddress = JSON.parse(
          localStorage.getItem(`userAddress_${userData.id}`)
        );
        if (storedAddress) {
          setUserAddress(storedAddress);
          return; // Avoid unnecessary API call
        }

        const response = await axios.get(
          `${API_BASE_URL}/address/user/${userData.id}/default`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.Addresses) {
          setUserAddress(response.data.Addresses); // Store the correct address object
          localStorage.setItem(
            `userAddress_${userData.id}`,
            JSON.stringify(response.data.Addresses)
          );
        } else {
          console.error("No address found in response.");
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
      }
    };

    fetchDefaultAddress();
  }, [userData?.id]);
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;
    try {
      setCancelingOrder(orderId);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedOrder((prevOrder) =>
        prevOrder ? { ...prevOrder, status: "CANCELLED" } : null
      );

      if (response.status === 201) {
        alert("Order has been cancelled successfully.");
        fetchOrders(); // Refresh order list after cancellation
      }
    } catch (error) {
      alert("Failed to cancel the order. Please try again.");
    }
  };

  // Fetch product details when orders are available
  useEffect(() => {
    if (Array.isArray(orders) && orders.length > 0) {
      fetchProductDetails(orders);
    }
  }, [orders]); // Runs whenever `orders` change

  // Retrieve address from local storage on component mount
  useEffect(() => {
    const storedAddress = JSON.parse(
      localStorage.getItem(`userAddress_${userData?.id}`)
    );
    if (storedAddress) {
      setUserAddress(storedAddress);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        });

        if (isMounted) {
          setUserData(response.data.data);
          fetchOrders();
        }
      } catch (err) {
        if (isMounted) setError("Failed to load profile.");
        console.error("Profile Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    fetchProductDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem(`userAddress_${userData?.id}`);
    setUserData(null);
    setUserAddress(null);
    navigate("/login");
  };

  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-red-300 text-white !py-6 !px-4 text-center">
          <h1 className="text-2xl font-bold">{translations.myprofile}</h1>
        </div>
        {/* Profile Info */}
        <div className="max-w-4xl !mx-auto bg-white shadow-md rounded-lg !mt-6 !p-6">
          <h2 className="text-xl font-bold !mb-4">{translations.accinfo}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600! font-medium">{translations.name}</p>
              <p className="text-gray-800!">{userData?.username}</p>
            </div>
            <div>
              <p className="text-gray-600! font-medium">{translations.email}</p>
              <p className="text-gray-800!">{userData?.email}</p>
            </div>
            <div>
              <p className="text-gray-600! font-medium">
                {translations.number}
              </p>
              <p className="text-gray-800!">{userData?.phone}</p>
            </div>
            <div>
              <p className="text-gray-600! font-medium">
                {translations.address}
              </p>
              <p className="text-gray-800!">
                {userAddress &&
                locationNames.city &&
                locationNames.district &&
                locationNames.country
                  ? `${userAddress.streetName}, ${locationNames.district}, ${locationNames.city}, ${locationNames.country}`
                  : "No address found"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile/addresses")}
            className="!mt-6 bg-blue-600! text-white !py-2 !px-4 rounded hover:bg-blue-700! cursor-pointer"
          >
            {translations.editprof}
          </button>
        </div>
        {/* Order History */}
        <div className="max-w-4xl !mx-auto bg-white shadow-md rounded-lg !mt-6 !p-6">
          <h2 className="text-xl font-bold !mb-4">{translations.ordhistory}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="!py-2 px-4!">{translations.orderId}</th>
                  <th className="!py-2 px-4!">{translations.date}</th>
                  <th className="!py-2 px-4!">{translations.total}</th>
                  <th className="!py-2 px-4!">{translations.status}</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <p>{translations.noOrd}</p>
                ) : (
                  orders.map((order) => {
                    const totalOrderPrice = convertAmount(
                      order.orderItems.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                    );
                    return (
                      <tr
                        key={order.id}
                        className="!border-t"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="!py-2 !px-4">{order.id}</td>
                        <td className="!py-2 !px-4">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td className="!py-2 !px-4">
                          {selectedCurrency === "egp"
                            ? `${translations.egp}`
                            : "$"}{" "}
                          {totalOrderPrice.toFixed(2)}
                        </td>
                        <td
                          className={`!py-2 !px-4 ${
                            order.status === "DELIVERED"
                              ? "text-green-600"
                              : order.status === "PENDING"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.status}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Account Settings */}
        <div className="max-w-4xl !mx-auto bg-white shadow-md rounded-lg !mt-6 !p-6">
          <h2 className="text-xl font-bold !mb-4">
            {translations.accsettings}
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="!bg-red-300 text-white !py-2 !px-4 rounded hover:bg-gray-900! cursor-pointer"
            >
              {translations.changpass}
            </button>
            {/*  <button className="!bg-red-600 text-white !py-2 !px-4 rounded hover:bg-red-700! cursor-pointer">
              Delete Account
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
