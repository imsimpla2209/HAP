/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { ColorPicker } from "antd";
import CustomInput from "../../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  getAColor,
  resetState,
  updateColor,
} from "../../../features/color/colorsSlice";
import tinycolor from "tinycolor2"; // Import tinycolor2 library

const schema = yup.object().shape({
  colorName: yup.string().required("Nhập tên Màu"),
  image: yup.string(),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split("/")[3];
  const isEditMode = getColorId !== undefined;

  const newColor = useSelector((state) => state.color.colors);

  useEffect(() => {
    if (isEditMode) {
      dispatch(getAColor(getColorId));
    }
  }, [isEditMode, getColorId, dispatch]);

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  const colorState = useSelector((state) => state.color);
  const { colorName, image } = colorState;
  useEffect(() => {
    formik.setValues({
      ...formik.values,
      colorName: colorState.colorName || "",
      image: colorState.image || "#D8DD78",
    });
  }, [colorState]);

  const formik = useFormik({
    initialValues: {
      colorName: colorName|| "",
      image: image || "#D8DD78", // Set initial value for image field
    },
    validationSchema: schema,

    onSubmit: (values) => {
      console.log("Input data:", values); // Logging the input data
      const data = { id: getColorId, colorData: values };
      console.log("Data to be sent:", data); // Logging the data to be sent

      if (getColorId !== undefined) {
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
      }

      setTimeout(() => {
        navigate("/admin/color-list");
        dispatch(resetState());
      }, 1000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 colorname">
        {getColorId !== undefined ? "Sửa" : "Thêm"} Màu
      </h3>
      <div className="form-group">
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <label htmlFor="colorName">Tên Màu</label>
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
          <div className="py-2">
          <label htmlFor="colorName">Màu</label>
          <ColorPicker
            value={formik.values.image} // Set the value to reflect the picked color
            onChange={(color) => {
              const hexColor = color.toHexString();
              formik.setFieldValue("image", hexColor); // Set hex value to image field
            }}
          />
          </div>
          
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Sửa" : "Thêm"} Màu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
