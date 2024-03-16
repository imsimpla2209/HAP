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
  createUnit,
  getAUnit,
  resetState,
  updateUnit,
} from "../../../features/unit/unitsSlice";
import CustomModal from "../../../components/CustomModal";
// "../../../features/customer/unit/unitSlice"
let schema = yup.object().shape({
  unitName: yup.string().required("Nhập tên đơn vị"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getUnitId = location.pathname.split("/")[3];
  const isEditMode = getUnitId !== undefined;

  const newUnit = useSelector((state) => state.unit.units);

  const { unitName } = newUnit;

  useEffect(() => {
    if (isEditMode) {
      dispatch(getAUnit(getUnitId -1));
    }
  }, [isEditMode, getUnitId, dispatch]);
 
  useEffect(() => {
    if (newUnit && newUnit[getUnitId -1]) {
      formik.setFieldValue("unitName", newUnit[getUnitId -1].unitName);
    }
  }, [newUnit, getUnitId]);

  const formik = useFormik({
    initialValues: {
      unitName: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      console.log("Input data:", values); // Logging the input data
      if (getUnitId !== undefined) {
        const data = { id: getUnitId, unitData: values };
        console.log("Data to be sent:", data); // Logging the data to be sent
        dispatch(updateUnit(data));
        setTimeout(() => {
          navigate("/admin/unit-list");
          dispatch(resetState());
        }, 1000);
      } else {
        console.log("Input data:", values); // Logging the input data
        dispatch(createUnit(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/unit-list");
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 unitname">
        {getUnitId !== undefined ? "Sửa" : "Thêm"} Đơn vị
      </h3>
      <div className="form-group">
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <label htmlFor="unitName">Tên Đơn vị</label>
          <CustomInput
            type="text"
            id="unitName"
            name="unitName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unitName}
          />
          <div className="error">
            {formik.touched.unitName && formik.errors.unitName}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getUnitId !== undefined ? "Sửa" : "Thêm"} Đơn vị
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
