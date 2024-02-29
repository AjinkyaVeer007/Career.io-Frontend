import React from "react";
import Nav from "react-bootstrap/Nav";
import { useLocation, useNavigate } from "react-router-dom";

function CustomNavtabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const navTabs = [
    {
      id: 1,
      name: "Create Job Categories",
      navigate: "/main/admin/createjobs/category",
    },
    {
      id: 2,
      name: "Job Listing",
      navigate: "/main/admin/createjobs/list",
    },
  ];
  return (
    <Nav fill variant="tabs" defaultActiveKey={location.pathname}>
      {navTabs &&
        navTabs.map((tab) => (
          <Nav.Item key={tab?.id}>
            <Nav.Link
              onClick={() => navigate(tab?.navigate)}
              eventKey={tab?.navigate}
            >
              {tab?.name}
            </Nav.Link>
          </Nav.Item>
        ))}
    </Nav>
  );
}

export default CustomNavtabs;
