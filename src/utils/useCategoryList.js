import { getCategories } from "../store/categorySlice";
import { BASE_URL } from "./constant";
import { useApiHandler } from "./useApiHandler";
import { useDispatch } from "react-redux";

export const useCategoryList = () => {
  const apiHandler = useApiHandler();
  const dispatch = useDispatch();
  return async function () {
    const apiData = {
      method: "get",
      url: BASE_URL + "admin/getcategories/" + localStorage.getItem("userId"),
    };

    const response = await apiHandler(apiData);
    if (response?.status) {
      dispatch(getCategories(response?.data));
    }
  };
};
