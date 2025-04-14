import React from "react";
import { useTranslation } from "../../TranslationContext";
import { useNavigate } from "react-router-dom";
import { BsJustify } from "react-icons/bs";

function DashSidebar({ openSidebarToggle, OpenSidebar }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { translations } = useTranslation();
  const navigate = useNavigate();
  return (
    <aside
      className={`fixed top-0 left-0 h-full! bg-white shadow-lg transition-transform transform ${
        openSidebarToggle ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-64`}
    >
      <div className="flex items-center justify-between !p-4 border-b">
        <div className="flex items-center space-x-2">
          <BsJustify
            className="text-2xl cursor-pointer lg:hidden"
            onClick={OpenSidebar}
          />{" "}
        </div>
        <div className="sidebar-brand">
          {/* <img
            onClick={() => navigate("/")}
            className="logo"
            src={logo}
            alt=""
          /> */}
        </div>
        <div className="text-xl font-bold text-gray-800">
          <h2>
            LAM<span class="text-red-300">SA</span>
          </h2>
        </div>
      </div>

      <ul className="mt-6! space-y-4!">
        <SidebarItem
          icon="fa-solid fa-border-all"
          label={translations.dashboardname}
          onClick={() => navigate("/dashboard")}
        />
        <SidebarItem
          icon="fa-regular fa-user"
          label={translations.customersname}
          onClick={() => navigate("/dashboard/users")}
        />
        <SidebarItem
          icon="fa-solid fa-money-check-dollar"
          label={translations.ordersname}
          onClick={() => navigate("/dashboard/orders")}
        />
        <SidebarItem
          icon="fa-solid fa-globe"
          label={translations.countries}
          onClick={() => navigate("/dashboard/countries")}
        />
        <SidebarItem
          icon="fa-solid fa-city"
          label={translations.cities}
          onClick={() => navigate("/dashboard/cities")}
        />
        <SidebarItem
          icon="fa-solid fa-bag-shopping"
          label={translations.productsname}
          onClick={() => navigate("/dashboard/products")}
        />
        <SidebarItem
          icon="fa-solid fa-store"
          label={translations.categories}
          onClick={() => navigate("/dashboard/categories")}
        />
        <SidebarItem
          icon="fa-solid fa-dollar-sign"
          label={translations.shippingfees}
          onClick={() => navigate("/dashboard/shippingfees")}
        />
        <SidebarItem
          icon="fa-solid fa-lock"
          label={translations.adminname}
          onClick={() => navigate("/dashboard/admins")}
        />
        <SidebarItem
          icon="fa-solid fa-right-from-bracket"
          label={translations.logoutname}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            localStorage.removeItem("userId");
            navigate("/admin-login");
          }}
        />
      </ul>
    </aside>
  );
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center w-full px-4! py-2! text-gray-700! hover:bg-red-100! transition-colors! cursor-pointer"
      >
        <i className={`${icon} mr-3!`}></i>
        <span>{label}</span>
      </button>
    </li>
  );
}

export default DashSidebar;
