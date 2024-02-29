import React from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

function JobListing() {
  return (
    <div className="row g-0 mt-4 pb-5">
      <div className="col-6">
        <div className="row g-0 justify-content-center">
          <div className="col-7">
            <JobForm />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row g-0 justify-content-center">
          <div className="col-7">
            <JobList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
