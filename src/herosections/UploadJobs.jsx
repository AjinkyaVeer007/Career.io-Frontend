import React from "react";
import CustomNavtabs from "../components/CustomNavtabs";
import { Outlet } from "react-router-dom";

function UploadJobs() {
  return (
    <>
      <div className="my-2 px-2">
        <CustomNavtabs />
      </div>
      <Outlet />
    </>
  );
}

export default UploadJobs;
