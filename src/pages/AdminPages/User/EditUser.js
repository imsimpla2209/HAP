/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput";

import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getAUser, updateUserProf } from "../../../features/auth/authSlice";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  mobile: yup.string().required("Phone number is required"),
  address: yup.string(),
  city: yup.string(),
  country: yup.string(),
});
const EditUser = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const location = useLocation();
  const userState = useSelector((state) => state?.auth?.info?.getaUser);
  const getUsertId = location.pathname.split("/")[3];
  

console.log(getUsertId)

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    dispatch(getAUser(getUsertId));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      mobile: userState?.mobile,
      address: userState?.address,
      city: userState?.city,
      country: userState?.country,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUserProf(values));
      setEdit(true);
    },
  });

  return (
    <div>
    <form onSubmit={formik.handleSubmit} className="add-product-form">
      <div className="form-group">
        <label htmlFor="firstname">firstname</label>
        <CustomInput
          type="text"
          id="firstname"
          name="firstname"
          onCh={formik.handleChange("firstname")}
          onBlr={formik.handleBlur("firstname")}
          val={formik.values.firstname}
        />
        <div className="error">
          {formik.touched.firstname && formik.errors.firstname}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="lastname">lastname</label>
        <CustomInput
          type="text"
          id="lastname"
          name="lastname"
          onCh={formik.handleChange("lastname")}
          onBlr={formik.handleBlur("lastname")}
          val={formik.values.lastname}
        />
        <div className="error">
          {formik.touched.lastname && formik.errors.lastname}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="mobile">mobile</label>
        <CustomInput
          type="text"
          name="mobile"
          onCh={formik.handleChange("mobile")}
          onBlr={formik.handleBlur("mobile")}
          val={formik.values.mobile}
        />
        <div className="error">
          {formik.touched.mobile && formik.errors.mobile}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="mobile">address </label>
        <CustomInput
          type="text"
          name="address"
          onCh={formik.handleChange("address")}
          onBlr={formik.handleBlur("address")}
          val={formik.values.address}
        />
        <div className="error">
          {formik.touched.address && formik.errors.address}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="mobile">city </label>
        <CustomInput
          type="text"
          name="city"
          onCh={formik.handleChange("city")}
          onBlr={formik.handleBlur("city")}
          val={formik.values.city}
        />
        <div className="error">
          {formik.touched.city && formik.errors.city}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="mobile">country </label>
        <CustomInput
          type="text"
          name="country"
          onCh={formik.handleChange("country")}
          onBlr={formik.handleBlur("country")}
          val={formik.values.country}
        />
        <div className="error">
          {formik.touched.country && formik.errors.country}
        </div>
      </div>

      <button
        className="btn btn-success border-0 rounded-3 my-5"
        type="submit"
      >
        Edit User
      </button>
    </form>
  </div>
  );
};

export default EditUser;
