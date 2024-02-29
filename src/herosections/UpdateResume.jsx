import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { BASE_URL, themecolor } from "../utils/constant";
import { useApiHandler } from "../utils/useApiHandler";
import toast, { Toaster } from "react-hot-toast";

function UpdateResume() {
  const apiHandler = useApiHandler();
  const [form, setForm] = useState({
    name: "",
    designation: "",
    experience: "",
    location: "",
    currentCtc: "",
    expectedCtc: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    const data = new FormData();
    data.append("userId", localStorage.getItem("userId"));
    data.append("name", form.name);
    data.append("designation", form.designation);
    data.append("experience", form.experience);
    data.append("currentCtc", form.currentCtc);
    data.append("location", form.location);
    data.append("expectedCtc", form.expectedCtc);
    data.append("file", form.resume);

    const apiData = {
      method: "post",
      url: BASE_URL + "candidate/userinfo",
      data: data,
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      toast.success(response?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="row g-0 justify-content-center mt-5 pb-5">
      <Toaster />
      <div className="col-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            onChange={handleChange}
            value={form.name}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full designation"
            onChange={handleChange}
            value={form.designation}
            name="designation"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter experience in years"
            onChange={handleChange}
            value={form.experience}
            name="experience"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            onChange={handleChange}
            value={form.location}
            name="location"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Current CTC</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your current CTC"
            onChange={handleChange}
            value={form.currentCtc}
            name="currentCtc"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Expected CTC</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your expected CTC"
            onChange={handleChange}
            value={form.expectedCtc}
            name="expectedCtc"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Resume</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, resume: e.target.files[0] }))
            }
          />
        </Form.Group>
        <div>
          <CustomButton
            name={"Upload"}
            bgColor={themecolor.primary}
            color={"#fff"}
            icon={isLoading && <Spinner size="sm" />}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateResume;
