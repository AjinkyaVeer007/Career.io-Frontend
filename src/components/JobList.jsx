import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useJobList } from "../utils/useJobList";
import { useSelector } from "react-redux";

function JobList() {
  const jobs = useSelector((state) => state.jobData.data);

  const jobList = useJobList();

  useEffect(() => {
    jobList();
  }, []);
  return (
    <div>
      <div className="fw-medium mb-3">Category List</div>
      <ListGroup>
        {jobs.length ? (
          jobs.map((job) => (
            <ListGroup.Item>
              <div>
                <div className="fw-medium">{job?.title}</div>
                <div className="text-secondary" style={{ fontSize: "13px" }}>
                  {job?.companyName}
                </div>
                <div style={{ fontSize: "12px" }}>
                  <div className="d-flex gap-2">
                    <div className="fw-medium">Skills : </div>
                    <div className="d-flex gap-2">
                      {job?.skills &&
                        job?.skills.map((skill) => <div>{skill}</div>)}
                    </div>
                  </div>
                  <div>
                    <span className="fw-medium">Location :</span>{" "}
                    {job?.location}
                  </div>
                  <div>
                    <span className="fw-medium">Experience :</span>{" "}
                    {job?.experience} yrs
                  </div>
                  <div>
                    <span className="fw-medium">Salary :</span> {job?.salary}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-danger">No Job Found</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default JobList;
