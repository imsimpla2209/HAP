// @ts-nocheck
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as yup from "yup";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import {
  getAUser,
  updateUserPass,
} from "../../features/customer/user/authSlice";

const profileSchema = yup.object({
  oldPassword: yup.string().required("Nhập mật khẩu cũ"),
  newPassword: yup.string().required("Nhập mật khẩu mới"),
});
const UpdatePassword = () => {
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
      oldPassword: userState?.oldPassword,
      newPassword: userState?.newPassword,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUserPass(values));
      setEdit(true);
      // toast.info("Update Password Successfully");
    },
  });
  return (
    <>
      <BreadCrumb title="UpdatePassword" />
      <Container class1="cart-wrapper home-wrapper-2 ">
        <div>
          <Link to="/profile" className="btn btn-secondary">
            Cập nhật thông tin
          </Link>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3"> Cập nhật mật khẩu</h3>
              <FiEdit className="fs-3" onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="ex1" className="form-label">
                  Mật khẩu cũ
                </label>
                <CustomInput
                  type="password"
                  name="oldPassword"
                  placeholder="Mật khẩu cũ"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange("oldPassword")}
                  onBlur={formik.handleBlur("oldPassword")}
                />
                <div className="errors">
                  {formik.touched.oldPassword && formik.errors.oldPassword}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Mật khẩu mới
                </label>
                <CustomInput
                  type="password"
                  name="newPassword"
                  placeholder="Mật khẩu mới"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange("newPassword")}
                  onBlur={formik.handleBlur("newPassword")}
                />
                <div className="errors">
                  {formik.touched.newPassword && formik.errors.newPassword}
                </div>
              </div>

              {edit === false && (
                <>
                  <button type="submit" className="btn btn-primary me-3">
                    Lưu
                  </button>
                </>
              )}
              <div className="py-2"></div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UpdatePassword;
