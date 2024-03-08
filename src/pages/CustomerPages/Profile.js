// @ts-nocheck
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAUser, updateUserProf } from "../../features/customer/user/authSlice";
import { FiEdit } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const profileSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  mobile: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),

  address: yup.string(),
  city: yup.string(),
  country: yup.string(),
});
const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const location = useLocation();
  const userState = useSelector((state) => state?.auth?.info?.getaUser);
  const getUsertId = location.pathname.split("/")[2];

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    dispatch(getAUser(getUsertId));
  };

  console.log(getUsertId);
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
      toast.info("Update Profile Successfully");
    },
  });
  return (
    <>
      <BreadCrumb title="Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <FiEdit className="fs-3" onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="ex1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  id="ex1"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  disable={edit}
                />
                <div className="errors">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ex2"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  disable={edit}
                />
                <div className="errors">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ex3" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="ex3"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  disable={edit}
                />
                <div className="errors">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Country
                </label>
                <select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                  className="form-control form-select"
                  id="country"
                  disable={edit}
                >
                  <option value="" selected disabled>
                    Select Country
                  </option>
                  <option value="Vietnam">Viet nam</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  disable={edit}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                  disable={edit}
                />
              </div>
              {edit === false && (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
