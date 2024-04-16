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

import "./addCoupon.css";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../../../features/admin/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Name Coupon is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const Addcoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);
  const { couponName, couponDiscount, couponExpiry } = newCoupon;

  const changeDateFormet = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(newDate.getDate()).padStart(2, "0"); // Ensure two digits
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        setTimeout(() => {
          navigate("/admin/coupon-list");
          dispatch(resetState());
        }, 1000);
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/coupon-list");
          // dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div className="">
      <h3 className="title">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="add-coupon-form"
        >
          <div className="form-group">
            <label>Coupon Title</label>
            <CustomInput
              type="text"
              id="name"
              name="name"
              onCh={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <div className="form-group">
            <label>Coupon discount</label>
            <CustomInput
              type="number"
              name="discount"
              onCh={formik.handleChange("discount")}
              onBl={formik.handleBlur("discount")}
              val={formik.values.discount}
              label="Enter Discount"
              id="discount"
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
          </div>
          <div className="form-group">
            <label>Coupon Expiry</label>
            <CustomInput
              type="date"
              name="expiry"
              onCh={formik.handleChange("expiry")}
              onBl={formik.handleBlur("expiry")}
              val={formik.values.expiry}
              id="date"
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
