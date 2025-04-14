import React from "react";
import Header from "../Components/header";
import { useNavigate } from "react-router-dom";

function Profile2({ toggleCartVisibility, cart, totalQuantity }) {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main Street, City, Country",
  };

  const orders = [
    { id: 1, date: "2025-04-01", total: "$120.00", status: "Delivered" },
    { id: 2, date: "2025-03-15", total: "$80.00", status: "Processing" },
    { id: 3, date: "2025-03-01", total: "$45.00", status: "Cancelled" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Header
        toggleCartVisibility={toggleCartVisibility}
        cart={cart}
        totalQuantity={totalQuantity}
      />
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gray-800 text-white !py-6 !px-4 text-center">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        {/* Profile Info */}
        <div className="max-w-4xl !mx-auto bg-white shadow-md rounded-lg !mt-6 !p-6">
          <h2 className="text-xl font-bold !mb-4">Account Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600! font-medium">Name</p>
              <p className="text-gray-800!">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600! font-medium">Email</p>
              <p className="text-gray-800!">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600! font-medium">Phone</p>
              <p className="text-gray-800!">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-600! font-medium">Address</p>
              <p className="text-gray-800!">{user.address}</p>
            </div>
          </div>
          <button className="!mt-6 bg-blue-600! text-white !py-2 !px-4 rounded hover:bg-blue-700!">
            Edit Profile
          </button>
        </div>
        {/* Order History */}
        <div className="max-w-4xl !mx-auto bg-white shadow-md rounded-lg !mt-6 !p-6">
          <h2 className="text-xl font-bold !mb-4">Order History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="!py-2 px-4">Order ID</th>
                  <th className="!py-2 px-4">Date</th>
                  <th className="!py-2 px-4">Total</th>
                  <th className="!py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="!border-t">
                    <td className="!py-2 !px-4">{order.id}</td>
                    <td className="!py-2 !px-4">{order.date}</td>
                    <td className="!py-2 !px-4">{order.total}</td>
                    <td
                      className={`!py-2 !px-4 ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Processing"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Account Settings */}
        <div className="max-w-4xl !mx-auto bg-white shadow-md rounded-lg !mt-6 !p-6">
          <h2 className="text-xl font-bold !mb-4">Account Settings</h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="!bg-gray-800 text-white !py-2 !px-4 rounded hover:bg-gray-900! cursor-pointer"
            >
              Change Password
            </button>
            <button className="!bg-red-600 text-white !py-2 !px-4 rounded hover:bg-red-700! cursor-pointer">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile2;
