import React, { useState } from "react";
import { BASE_URL, themecolor } from "../utils/constant";
import { useApiHandler } from "../utils/useApiHandler";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-bootstrap";

function JobCard({ data }) {
  const apiHandler = useApiHandler();

  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplied = async () => {
    setIsLoading(true);
    const payload = {
      jobId: data?._id,
      userId: localStorage.getItem("userId"),
      adminId: data?.createdBy,
      jobName: data?.title,
      companyName: data.companyName,
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "candidate/applyjob",
      data: payload,
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      setIsApplied(true);
      toast.success(response?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="border rounded p-2">
      <Toaster />
      <div className="fw-medium">{data?.title}</div>
      <div className="text-secondary" style={{ fontSize: "13px" }}>
        {data.companyName}
      </div>
      <div style={{ fontSize: "12px" }}>
        <div className="d-flex gap-2">
          <div className="fw-medium">Skills : </div>
          <div className="d-flex gap-2">
            {data?.skills &&
              data.skills?.map((item) => <div key={item}>{item}</div>)}
          </div>
        </div>
        <div>
          <span className="fw-medium">Location :</span> {data?.location}
        </div>
        <div>
          <span className="fw-medium">Experience :</span> {data?.experience} yrs
        </div>
        <div>
          <span className="fw-medium">Salary :</span> {data?.salary}
        </div>
      </div>
      {isLoading ? (
        <div className="text-end">
          <Spinner size="sm" />
        </div>
      ) : (
        <>
          {isApplied ? (
            <div
              className="p-1 fw-medium text-end"
              style={{ color: "#44ce42" }}
            >
              Applied
            </div>
          ) : (
            <div
              onClick={handleApplied}
              className="p-1 fw-medium pointer text-end"
              style={{ color: themecolor.primary }}
            >
              Apply
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobCard;
