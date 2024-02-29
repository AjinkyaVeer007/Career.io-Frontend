import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useCategoryList } from "../utils/useCategoryList";
import { useSelector } from "react-redux";

function CategoryList() {
  const categories = useSelector((state) => state.categoriesData.data);
  const getCategoriesList = useCategoryList();

  useEffect(() => {
    getCategoriesList();
  }, []);
  return (
    <div>
      <div className="fw-medium mb-3">Category List</div>
      <ListGroup>
        {categories.length ? (
          categories.map((cat) => (
            <ListGroup.Item key={cat}>{cat?.name}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-danger">No list found</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default CategoryList;
