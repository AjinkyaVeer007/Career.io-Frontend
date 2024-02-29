import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const useApiHandler = () => {
  const navigate = useNavigate();

  return async function (data) {
    // access-token
    const Header = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      let response;
      if (data?.method === "get" || data?.method === "delete") {
        response = await axios[data?.method](data?.url, Header);
      } else {
        response = await axios[data?.method](data?.url, data?.data, Header);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      let errorCode = error?.response?.status;
      if (errorCode === 401) {
        navigate("/");
      }
    }
  };
};
