import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { BASE_URL, themecolor } from "../utils/constant";
import JobCard from "../components/JobCard";
import { useApiHandler } from "../utils/useApiHandler";
import toast from "react-hot-toast";

function Dashboard() {
  const apiHandler = useApiHandler();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");

  const getAllJobs = async () => {
    const apiData = {
      method: "get",
      url: BASE_URL + "candidate/getjobs",
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      setJobs(response?.data);
      setFilteredJobs(response?.data);
    }
  };

  const handleSearch = () => {
    const filteredData = jobs.filter((item) => {
      return item?.title?.includes(search);
    });

    if (filteredData.length) {
      setFilteredJobs(filteredData);
    } else {
      setFilteredJobs(jobs);
      toast.error("Searched job not available");
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <div className="mt-5">
      <div className="row g-0 justify-content-center mb-3">
        <div className="col-4">
          <Form.Control
            placeholder="Search your job"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="col-2 px-3">
          <CustomButton
            name={"Search"}
            bgColor={themecolor.primary}
            color={"#fff"}
            handleClick={handleSearch}
          />
        </div>
      </div>
      <div className="row g-0 mx-4">
        {jobs.length ? (
          filteredJobs.map((item) => (
            <div className="col-10 col-lg-4 col-md-6 p-2" key={item?._id}>
              <JobCard data={item} />
            </div>
          ))
        ) : (
          <div className="text-danger text-center">No Jobs found</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
