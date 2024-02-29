import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CustomButton from "./CustomButton";
import { BASE_URL, skills, themecolor } from "../utils/constant";
import Select from "react-select";
import { useCategoryList } from "../utils/useCategoryList";
import { useSelector } from "react-redux";
import { useApiHandler } from "../utils/useApiHandler";
import toast, { Toaster } from "react-hot-toast";
import { useJobList } from "../utils/useJobList";

function JobForm() {
  const categories = useSelector((state) => state.categoriesData.data);

  const getCategoriesList = useCategoryList();
  const apiHandler = useApiHandler();
  const jobList = useJobList();

  const [categoryData, setCategoryData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    skills: [],
    category: [],
    experience: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategories = () => {
    let options = [];
    if (!categories.length) {
      return;
    }

    for (let i = 0; i < categories.length; i++) {
      let newObj = {
        label: categories[i].name,
        value: categories[i]._id,
      };

      options.push(newObj);
    }

    setCategoryData(options);
  };

  const handleJobPost = async () => {
    let skillsArray = [];
    let categoryArray = [];

    for (let i = 0; i < form.skills.length; i++) {
      skillsArray.push(form.skills[i].value);
    }

    for (let j = 0; j < form.category.length; j++) {
      categoryArray.push(form.category[j].value);
    }
    const payload = {
      title: form.title,
      companyName: form.companyName,
      location: form.location,
      skills: skillsArray,
      category: categoryArray,
      experience: form.experience,
      description: form.description,
      salary: form.salary,
      createdBy: localStorage.getItem("userId"),
    };

    const apiData = {
      method: "post",
      url: BASE_URL + "admin/createjob",
      data: payload,
    };

    const response = await apiHandler(apiData);

    if (response?.status) {
      setForm({
        title: "",
        companyName: "",
        location: "",
        skills: [],
        category: [],
        experience: "",
        description: "",
        salary: "",
      });
      toast.success("Job uploaded successfully");
      jobList();
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    handleCategories();
  }, [categories]);
  return (
    <>
      <Toaster />
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Job Title</Form.Label>
        <Form.Control
          placeholder="Enter job title"
          onChange={handleChange}
          value={form.title}
          name="title"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Company Name</Form.Label>
        <Form.Control
          placeholder="Enter company name"
          onChange={handleChange}
          value={form.companyName}
          name="companyName"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Job Location</Form.Label>
        <Form.Control
          placeholder="Enter job location"
          onChange={handleChange}
          value={form.location}
          name="location"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Skills</Form.Label>
        <Select
          options={skills}
          isMulti
          value={form.skills}
          onChange={(data) => setForm((prev) => ({ ...prev, skills: data }))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Category</Form.Label>
        <Select
          options={categoryData}
          isMulti
          value={form.category}
          onChange={(data) => setForm((prev) => ({ ...prev, category: data }))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Experience</Form.Label>
        <Form.Control
          placeholder="Enter required experience"
          onChange={handleChange}
          value={form.experience}
          name="experience"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Job Description</Form.Label>
        <Form.Control
          placeholder="Enter job description"
          onChange={handleChange}
          value={form.description}
          name="description"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Job Salary</Form.Label>
        <Form.Control
          placeholder="Enter job salary"
          onChange={handleChange}
          value={form.salary}
          name="salary"
        />
      </Form.Group>
      <div>
        <CustomButton
          name={"Create"}
          bgColor={themecolor.primary}
          color={"#fff"}
          handleClick={handleJobPost}
        />
      </div>
    </>
  );
}

export default JobForm;
