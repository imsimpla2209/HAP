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
  createColor,
  getAColor,
  resetState,
  updateColor,
} from "../../../features/color/colorsSlice";
// "../../../features/customer/color/colorSlice"
let schema = yup.object().shape({
  colorName: yup.string().required("ColorName Product is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split("/")[3];
  const isEditMode = getColorId !== undefined;

  const newColor = useSelector((state) => state.color.colors);

  const { colorName } = newColor;

  useEffect(() => {
    if (isEditMode) {
      dispatch(getAColor(getColorId -1));
    }
  }, [isEditMode, getColorId, dispatch]);
 
  useEffect(() => {
    if (newColor && newColor[getColorId -1]) {
      formik.setFieldValue("colorName", newColor[getColorId -1].colorName);
    }
  }, [newColor, getColorId]);

  const formik = useFormik({
    initialValues: {
      colorName: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      console.log("Input data:", values); // Logging the input data
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        console.log("Data to be sent:", data); // Logging the data to be sent
        dispatch(updateColor(data));
        setTimeout(() => {
          navigate("/admin/color-list");
          dispatch(resetState());
        }, 1000);
      } else {
        console.log("Input data:", values); // Logging the input data
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/color-list");
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 colorname">
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div className="form-group">
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <label htmlFor="colorName">Color Name</label>
          <CustomInput
            type="text"
            id="colorName"
            name="colorName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.colorName}
          />
          <div className="error">
            {formik.touched.colorName && formik.errors.colorName}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
