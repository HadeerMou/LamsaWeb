import React, { useState } from "react";
import DashHome from "./dashHome";
import DASHHeader from "./DashboardComponents/dashHeader";
import DashSidebar from "./DashboardComponents/dashSidebar";

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="wrap-container">
      <DashSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="middle-container">
        <DASHHeader OpenSidebar={OpenSidebar} />
        <DashHome />
      </div>
    </div>
  );
}

export default Dashboard;
