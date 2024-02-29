import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import ChangePassword from "./pages/ChangePassword";
import UploadJobs from "./herosections/UploadJobs";
import JobCategories from "./herosections/JobCategories";
import JobListing from "./herosections/JobListing";
import JobApplication from "./herosections/JobApplication";
import Dashboard from "./herosections/Dashboard";
import UpdateResume from "./herosections/UpdateResume";
import AppliedJobs from "./herosections/AppliedJobs";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/changepassword",
      element: <ChangePassword />,
    },
    {
      path: "/main",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "resume",
          element: <UpdateResume />,
        },
        {
          path: "appliedjobs",
          element: <AppliedJobs />,
        },
        {
          path: "admin/applications",
          element: <JobApplication />,
        },
        {
          path: "admin/createjobs",
          element: <UploadJobs />,
          children: [
            {
              path: "category",
              element: <JobCategories />,
            },
            {
              path: "list",
              element: <JobListing />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
