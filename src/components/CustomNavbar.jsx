import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CustomButton from "./CustomButton";
import { themecolor } from "../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [navLinks, setNavLinks] = useState([]);

  const navLinksAdmin = [
    {
      id: 1,
      name: "Job Applications",
      navigate: "/main/admin/applications",
    },
    {
      id: 2,
      name: "Create Jobs",
      navigate: "/main/admin/createjobs/category",
    },
  ];
  const navLinksCandidate = [
    {
      id: 1,
      name: "Update Info",
      navigate: "/main/resume",
    },
    {
      id: 2,
      name: "Applied Jobs",
      navigate: "/main/appliedjobs",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    localStorage.getItem("userType") === "admin"
      ? setNavLinks(navLinksAdmin)
      : setNavLinks(navLinksCandidate);
  }, []);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand
          className="pointer"
          onClick={() => {
            localStorage.getItem("userType") === "admin"
              ? navigate("/main/admin/applications")
              : navigate("/main/dashboard");
          }}
        >
          Career.io
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav
            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {navLinks &&
              navLinks.map((item) => {
                return (
                  <Nav.Link
                    className="fw-medium"
                    key={item?.id}
                    style={{
                      color: location.pathname.includes(item?.navigate)
                        ? ""
                        : themecolor.primary,
                    }}
                    onClick={() => navigate(item?.navigate)}
                  >
                    {item?.name}
                  </Nav.Link>
                );
              })}
          </Nav>
          <CustomButton
            name={"Logout"}
            bgColor={themecolor.primary}
            color={"#fff"}
            handleClick={handleLogout}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
