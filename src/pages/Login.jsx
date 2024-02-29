import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { BASE_URL, themecolor } from "../utils/constant";
import { RiLoginCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useApiHandler } from "../utils/useApiHandler";

function Login() {
  const navigate = useNavigate();
  const apiHandler = useApiHandler();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const data = {
      email: form.email,
      password: form.password,
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "user/login",
      data: data,
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      localStorage.setItem("token", response?.token);
      localStorage.setItem("userId", response?.data?._id);
      localStorage.setItem("userType", response?.data?.userType);

      if (response?.data?.userType === "admin") {
        navigate("/main/admin/applications");
      } else {
        navigate("/main/dashboard");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="row g-0 justify-content-center mt-5">
      <Toaster />
      <div className="col-10 col-lg-4 col-md-5">
        <div className="border rounded p-3">
          <div className="fs-3 fw-bold text-center">Login</div>
          <div className="border-top my-3"></div>
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
          <div className="d-flex justify-content-between mb-3">
            <div
              onClick={() => navigate("/register")}
              style={{ color: themecolor.primary }}
              className="fw-medium pointer"
            >
              New user?
            </div>
            <div
              style={{ color: themecolor.primary }}
              className="fw-medium pointer"
              onClick={() => navigate("/changepassword")}
            >
              Forget password
            </div>
          </div>
          <CustomButton
            name={"Login"}
            bgColor={themecolor.primary}
            color={"#fff"}
            icon={
              isLoading ? (
                <Spinner size="sm" />
              ) : (
                <RiLoginCircleFill size={"20px"} />
              )
            }
            handleClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
