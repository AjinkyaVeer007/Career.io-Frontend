import React, { useEffect, useState } from "react";
import JobApplicationCard from "../components/JobApplicationCard";
import { useApiHandler } from "../utils/useApiHandler";
import { BASE_URL } from "../utils/constant";

function JobApplication() {
  const apiHandler = useApiHandler();

  const [appliedJobs, setAppliedJobs] = useState([]);

  const getAppliedJobs = async () => {
    const apiData = {
      method: "get",
      url:
        BASE_URL +
        "admin/getcandidateappliedjobs/" +
        localStorage.getItem("userId"),
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      setAppliedJobs(response?.data);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);
  return (
    <>
      <div className="text-center my-3 fw-medium">Job Applications</div>
      <div className="row mx-4">
        {appliedJobs.length ? (
          appliedJobs.map((job) => (
            <div className="col-10 col-lg-4 col-md-6 p-2" key={job?._id}>
              <JobApplicationCard data={job} getApi={getAppliedJobs} />
            </div>
          ))
        ) : (
          <div className="text-center my-4 text-danger">No jobs applied</div>
        )}
      </div>
    </>
  );
}

export default JobApplication;
