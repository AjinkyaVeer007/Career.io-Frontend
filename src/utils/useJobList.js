import { getJobs } from "../store/jobSlice";
import { BASE_URL } from "./constant";
import { useApiHandler } from "./useApiHandler";
import { useDispatch } from "react-redux";

export const useJobList = () => {
  const apiHandler = useApiHandler();
  const dispatch = useDispatch();
  return async function () {
    const apiData = {
      method: "get",
      url: BASE_URL + "admin/getjobs/" + localStorage.getItem("userId"),
    };

    const response = await apiHandler(apiData);
    if (response?.status) {
      dispatch(getJobs(response?.data));
    }
  };
};
