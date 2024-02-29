import React from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";

function Layout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
}

export default Layout;
