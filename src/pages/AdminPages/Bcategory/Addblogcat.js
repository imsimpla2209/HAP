/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogcats,
  getABlogcat,
  resetState,
  updateBlogcat,
} from "../../../features/admin/blogcat/blogcatSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title Category is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogcatId = location.pathname.split("/")[3];

  const newBlogcat = useSelector((state) => state.blogcat);
  const { isSuccess, isError, isLoading, createdBlogcat, blogcatName } =
    newBlogcat;

  useEffect(() => {
    if (getBlogcatId !== undefined) {
      dispatch(getABlogcat(getBlogcatId));
      formik.values.title = blogcatName;
    }
  }, [getBlogcatId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogcatName || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (getBlogcatId !== undefined) {
        const data = { id: getBlogcatId, blogcatData: values };
        dispatch(updateBlogcat(data));
        setTimeout(() => {
          navigate("/admin/blog-category-list");
          dispatch(resetState());
        }, 1000);
      } else {
        dispatch(createBlogcats(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-category-list");
          dispatch(resetState());
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogcatId !== undefined ? "Sửa" : "Thêm"} Danh Mục Bài Viết
      </h3>
      <div className="form-group">
        <form action="" onSubmit={formik.handleSubmit} className="add-product-form">
          <label htmlFor="title">Tên</label>
          <CustomInput
            type="text"
            id="title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogcatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
