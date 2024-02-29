import React, { useState } from "react";
import RejectApplicationModal from "./RejectApplicationModal";
import { useApiHandler } from "../utils/useApiHandler";
import { BASE_URL } from "../utils/constant";

function JobApplicationCard({ data, getApi }) {
  const [showModal, setShowModal] = useState(false);

  const apiHandler = useApiHandler();

  const handleToggleModal = () => setShowModal(!showModal);

  const handleClick = async (payload) => {
    const apiData = {
      method: "put",
      url: BASE_URL + "admin/updateapplicationstatus/" + data?._id,
      data: payload,
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      getApi();
    }
  };

  return (
    <div className="border rounded p-2">
      <div>
        <span className="fw-medium">Name : </span>
        {data?.userInfo?.name}
      </div>
      <div>
        <span className="fw-medium">Designation : </span>
        {data?.userInfo?.designation}
      </div>
      <div>
        <span className="fw-medium">Experience : </span>
        {data?.userInfo?.experience} yrs
      </div>
      <div>
        <span className="fw-medium">Current CTC : </span>
        {data?.userInfo?.currentCtc}
      </div>
      <div>
        <span className="fw-medium">Expected CTC : </span>
        {data?.userInfo?.expectedCtc}
      </div>
      <div>
        <span className="fw-medium">Applied for : </span>
        {data?.jobId?.title}
      </div>
      <div>
        <span className="fw-medium">Applied company : </span>
        {data?.jobId?.companyName}
      </div>
      {data?.isShortlisted && (
        <div
          style={{ fontSize: "14px", color: "#44ce42" }}
          className="fw-medium pointer text-center my-2"
        >
          Shortlisted
        </div>
      )}
      {data?.isRejected && (
        <div
          style={{ fontSize: "14px", color: "red" }}
          className="fw-medium pointer text-center my-2"
        >
          Rejected
        </div>
      )}
      {!data?.isRejected && !data?.isShortlisted ? (
        <div className="d-flex align-items-center justify-content-center gap-3 px-2 gap-2 my-3">
          <div
            style={{ fontSize: "13px", color: "#44ce42" }}
            className="fw-medium text-decoration-underline pointer"
            onClick={() => handleClick({ isShortlisted: true })}
          >
            Accept
          </div>
          <div
            style={{ fontSize: "13px", color: "red" }}
            className="fw-medium text-decoration-underline pointer"
            onClick={handleToggleModal}
          >
            Reject
          </div>
        </div>
      ) : (
        ""
      )}

      <RejectApplicationModal
        show={showModal}
        handletoggle={handleToggleModal}
        postApi={handleClick}
        getApi={getApi}
      />
    </div>
  );
}

export default JobApplicationCard;
