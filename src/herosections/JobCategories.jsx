import React from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

function JobCategories() {
  return (
    <div className="row g-0 mt-4 pb-5">
      <div className="col-6">
        <div className="row g-0 justify-content-center">
          <div className="col-7">
            <CategoryForm />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row g-0 justify-content-center">
          <div className="col-7">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCategories;
