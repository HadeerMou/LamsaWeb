import React, { useEffect, useState } from "react";
import "./dshusers.css";
import DASHHeader from "./DashboardComponents/dashHeader";
import DashSidebar from "./DashboardComponents/dashSidebar";
import { useTranslation } from "../TranslationContext";
import axios from "axios";

function DshUsers() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });

  const [updatedUser, setUpdatedUser] = useState({
    phone: "",
  });

  const { translations } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched users data:", response.data.dat); // Debugging line

      // Ensure users is always an array
      setUsers(Array.isArray(response.data.data) ? response.data.data : []);
      console.log("Fetched Users:", response.data); // Debugging
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Ensure users is always an array, even on error
    }
  };

  // Fetch user by ID
  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      console.log(response.data); // Handle the fetched user data
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

  // Create a new user
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token if stored in localStorage

      const response = await axios.post(`${API_BASE_URL}/users`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authentication token
          "Content-Type": "application/json",
        },
      });

      setUsers([...users, response.data]);

      setNewUser({
        email: "",
        password: "",
        username: "",
        phone: "",
      });

      setShowCreateUser(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      await axios.delete(`${API_BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authentication token
        },
      });

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open edit modal
  const handleEditClick = (user) => {
    setEditingUser(user);
    setUpdatedUser({ phone: user.phone });
  };

  // Update user
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.put(
        `${API_BASE_URL}/users/${editingUser.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include authentication token
            "Content-Type": "application/json",
          },
        }
      );

      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedUser } : user
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="wrap-container">
      <DashSidebar
        OpenSidebar={() => setOpenSidebarToggle(!openSidebarToggle)}
        openSidebarToggle={openSidebarToggle}
      />
      <div className="middle-container">
        <DASHHeader
          OpenSidebar={() => setOpenSidebarToggle(!openSidebarToggle)}
        />
        <main>
          <div className="customers">
            <h2 className="cutomerstitle">{translations.cutomerstitle}</h2>
            <table>
              <thead>
                <tr>
                  <th>{translations.userid}</th>
                  <th>{translations.name}</th>
                  <th>{translations.email}</th>
                  <th>{translations.number}</th>
                  <th>{translations.action}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <button
                          className="edit"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          {translations.delete}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="showall" onClick={fetchUsers}>
              {translations.showall}
            </button>
          </div>
          <button
            className="addprod"
            onClick={() => setShowCreateUser(!showCreateUser)}
          >
            {showCreateUser ? "Close" : "Create User"}
          </button>

          {/* Create User Form */}
          {showCreateUser && (
            <div className="create-user-form">
              <h3>Create New User</h3>
              <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
              <button onClick={handleCreateUser}>Create User</button>
            </div>
          )}

          {/* Edit User Modal */}
          {editingUser && (
            <div className="edit-user-modal">
              <h3>Edit User</h3>
              <input
                type="text"
                placeholder="Phone"
                value={updatedUser.phone}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, phone: e.target.value })
                }
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default DshUsers;
