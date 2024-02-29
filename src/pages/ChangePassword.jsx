import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { BASE_URL, themecolor } from "../utils/constant";
import { RiLoginCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useApiHandler } from "../utils/useApiHandler";
import toast, { Toaster } from "react-hot-toast";

function ChangePassword() {
  const navigate = useNavigate();
  const apiHandler = useApiHandler();

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const data = {
      ...form,
    };
    const apiData = {
      method: "put",
      url: BASE_URL + "user/changepassword",
      data: data,
    };
    const response = await apiHandler(apiData);

    if (response?.status) {
      toast.success(response?.message);
      navigate("/");
    }
  };

  return (
    <div className="row g-0 justify-content-center mt-5">
      <Toaster />
      <div className="col-10 col-lg-4 col-md-5">
        <div className="border rounded p-3">
          <div className="fs-3 fw-bold text-center">Change Password</div>
          <div className="border-top my-3"></div>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Registered Email</Form.Label>
            <Form.Control
              placeholder="Enter registered"
              type="email"
              value={form.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">New Password</Form.Label>
            <Form.Control
              placeholder="Enter new password"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
          </Form.Group>
          <div className="d-flex justify-content-end mb-3">
            <div
              style={{ color: themecolor.primary }}
              className="fw-medium pointer"
              onClick={() => navigate("/")}
            >
              Back to login
            </div>
          </div>
          <CustomButton
            name={"Update"}
            bgColor={themecolor.primary}
            color={"#fff"}
            icon={<RiLoginCircleFill size={"20px"} />}
            handleClick={handleChangePassword}
          />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
