import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useApiHandler } from "../utils/useApiHandler";
import { BASE_URL } from "../utils/constant";

function AppliedJobs() {
  const apiHandler = useApiHandler();

  const [appliedjobs, setAppliedJobs] = useState([]);

  const getAppliedJobs = async () => {
    const apiData = {
      method: "get",
      url:
        BASE_URL + "candidate/getappliedjobs/" + localStorage.getItem("userId"),
    };

    const response = await apiHandler(apiData);

    console.log(response);

    if (response?.status) {
      setAppliedJobs(response?.data);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);
  return (
    <div>
      <div className="fw-medium text-center my-3">Your Applied Jobs</div>
      <div className="mx-4">
        <Table responsive>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Reason of rejection</th>
            </tr>
          </thead>
          <tbody>
            {appliedjobs.length ? (
              appliedjobs.map((job) => (
                <tr key={job?._id}>
                  <td>{job?.jobId?.title}</td>
                  <td>{job?.jobId?.companyName}</td>
                  <td>{job?.jobId?.location}</td>
                  <td>
                    {!job?.isShortlisted && !job?.isRejected
                      ? "Under Review"
                      : job?.isRejected
                      ? "Rejected"
                      : "Shortlisted"}
                  </td>
                  <td>{job?.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-danger">
                  No jobs applied
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AppliedJobs;
