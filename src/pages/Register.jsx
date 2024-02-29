import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { BASE_URL, themecolor } from "../utils/constant";
import { RiLoginCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useApiHandler } from "../utils/useApiHandler";
import { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const apiHandler = useApiHandler();

  const [form, setForm] = useState({
    name: "",
    userType: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const options = [
    { label: "Admin", value: "admin" },
    { label: "Candidate", value: "candidate" },
  ];

  const handleRegister = async () => {
    setIsLoading(true);
    const data = {
      name: form.name,
      email: form.email,
      userType: form.userType,
      password: form.password,
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "user/register",
      data: data,
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Toaster />
      <div className="row g-0 justify-content-center mt-5">
        <div className="col-10 col-lg-4 col-md-5">
          <div className="border rounded p-3">
            <div className="fs-3 fw-bold text-center">Register</div>
            <div className="border-top my-3"></div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Name</Form.Label>
              <Form.Control
                placeholder="Enter full name"
                type="text"
                onChange={handleChange}
                value={form.name}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">User Type</Form.Label>
              <Select
                options={options}
                onChange={(data) =>
                  setForm((prev) => ({ ...prev, userType: data.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                onChange={handleChange}
                value={form.email}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control
                placeholder="Enter password"
                type="password"
                onChange={handleChange}
                value={form.password}
                name="password"
              />
            </Form.Group>
            <div className="d-flex justify-content-end mb-3">
              <div
                onClick={() => navigate("/")}
                style={{ color: themecolor.primary }}
                className="fw-medium pointer"
              >
                Already have login?
              </div>
            </div>
            <CustomButton
              name={"Register"}
              bgColor={themecolor.primary}
              color={"#fff"}
              handleClick={handleRegister}
              icon={
                isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <RiLoginCircleFill size={"20px"} />
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
