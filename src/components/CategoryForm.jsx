import React, { useState } from "react";
import { Form } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { BASE_URL, themecolor } from "../utils/constant";
import { useApiHandler } from "../utils/useApiHandler";
import { useCategoryList } from "../utils/useCategoryList";

function CategoryForm() {
  const [category, setCategory] = useState("");

  const apiHandler = useApiHandler();
  const getCategoriesList = useCategoryList();

  const handleCategory = async () => {
    const data = {
      name: category,
      userId: localStorage.getItem("userId"),
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "admin/createcategory",
      data: data,
    };

    const response = await apiHandler(apiData);
    if (response?.status) {
      getCategoriesList();
      setCategory("");
    }
  };
  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label className="fw-medium">Job Category</Form.Label>
        <Form.Control
          placeholder="Enter job category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>
      <div>
        <CustomButton
          name={"Create"}
          bgColor={themecolor.primary}
          color={"#fff"}
          handleClick={handleCategory}
        />
      </div>
    </>
  );
}

export default CategoryForm;
