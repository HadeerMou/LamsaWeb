import React from "react";
import { useTranslation } from "../../TranslationContext";
import { useNavigate } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BiSolidLandscape } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

function DashSidebar({ openSidebarToggle, OpenSidebar }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { translations, language } = useTranslation();
  const navigate = useNavigate();
  return (
    <aside
      className={`fixed top-0 left-0 h-full! bg-white shadow-lg transition-transform transform ${
        openSidebarToggle ? "translate-x-0 w-full" : "-translate-x-full"
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
          icon={<MdDashboard />}
          label={translations.dashboardname}
          onClick={() => navigate("/dashboard")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label={translations.customersname}
          onClick={() => navigate("/dashboard/users")}
        />
        <SidebarItem
          icon={<RiShoppingBag3Fill />}
          label={translations.ordersname}
          onClick={() => navigate("/dashboard/orders")}
        />
        <SidebarItem
          icon={<BiSolidLandscape />}
          label={translations.countries}
          onClick={() => navigate("/dashboard/countries")}
        />
        <SidebarItem
          icon={<FaCity />}
          label={translations.cities}
          onClick={() => navigate("/dashboard/cities")}
        />
        <SidebarItem
          icon={<FaShop />}
          label={translations.productsname}
          onClick={() => navigate("/dashboard/products")}
        />
        <SidebarItem
          icon={<BiCategoryAlt />}
          label={translations.categories}
          onClick={() => navigate("/dashboard/categories")}
        />
        <SidebarItem
          icon={<FaMoneyCheckAlt />}
          label={translations.shippingfees}
          onClick={() => navigate("/dashboard/shippingfees")}
        />
        <SidebarItem
          icon={<RiAdminFill />}
          label={translations.adminname}
          onClick={() => navigate("/dashboard/admins")}
        />
        <SidebarItem
          icon={<IoIosLogOut />}
          label={translations.logout}
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
        className="flex items-center w-full px-4! py-2! gap-4 text-gray-700! hover:bg-red-100! transition-colors! cursor-pointer"
      >
        <span>{icon}</span>
        <span>{label}</span>
      </button>
    </li>
  );
}

export default DashSidebar;
