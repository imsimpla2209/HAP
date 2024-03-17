/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import CustomInput from "../../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getACategory,
  resetState,
  updateCategory,
} from "../../../features/category/categorySlice";
// "../../../features/customer/category/categorySlice"
let schema = yup.object().shape({
  categoryName: yup.string().required("Nhập tên danh mục sản phẩm"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCategoryId = location.pathname.split("/")[3];
  const isEditMode = getCategoryId !== undefined;

  const newCategory = useSelector((state) => state.category.categorys);

  const { categoryName } = newCategory;

  useEffect(() => {
    if (isEditMode) {
      dispatch(getACategory(getCategoryId - 1));
    }
  }, [isEditMode, getCategoryId, dispatch]);

  useEffect(() => {
    if (newCategory && newCategory[getCategoryId - 1]) {
      formik.setFieldValue("categoryName", newCategory[getCategoryId - 1].categoryName);
    }
  }, [newCategory, getCategoryId]);

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      console.log("Input data:", values); // Logging the input data
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        console.log("Data to be sent:", data); // Logging the data to be sent
        dispatch(updateCategory(data));
        setTimeout(() => {
          navigate("/admin/category-list");
          dispatch(resetState());
        }, 1000);
      } else {
        console.log("Input data:", values); // Logging the input data
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/category-list");
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 categoryname">
        {getCategoryId !== undefined ? "Sửa" : "Thêm"} Danh mục sản phẩm
      </h3>
      <div className="form-group">
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <label htmlFor="categoryName">Tên danh mục sản phẩm </label>
          <CustomInput
            type="text"
            id="categoryName"
            name="categoryName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryName}
          />
          <div className="error">
            {formik.touched.categoryName && formik.errors.categoryName}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCategoryId !== undefined ? "Sửa" : "Thêm"} Danh mục sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
