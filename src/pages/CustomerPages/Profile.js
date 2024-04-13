// @ts-nocheck
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "react-rainbow-components";
import CustomInput from "../../components/CustomInput";
import {
  getAUser,
  updateUserPass,
  updateUserProf,
  getUserProfile,
} from "../../features/customer/user/authSlice";
import { FiEdit } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const profileSchema = yup.object({
  firstName: yup.string().required("Nhập họ"),
  lastName: yup.string().required("Nhập tên"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
  address: yup.string(),
  dob: yup.string(),
  gender: yup.string(),
});
const Profile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const location = useLocation();
  const userState = useSelector((state) => state?.auth?.userInfor);
  const getUsertId = location.pathname.split("/")[2];
  const [dob, setDob] = useState(userState?.dob || "");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    dispatch(getUserProfile());
  };

  const handleDobChange = (value) => {
    setDob(value);
    formik.setFieldValue("dob", value);
  };

  console.log(userState)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName,
      lastName: userState?.lastName,
      phoneNumber: String(userState?.phoneNumber) || "",
      address: userState?.address,
      dob: dob,
      gender: userState?.gender,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUserProf(values));
      setEdit(true);
      // toast.info("Update Password Successfully");
    },
  });
  return (
    <>
      <BreadCrumb title="Thông tin cá nhân" />
      <Container class1="cart-wrapper home-wrapper-2 ">
        <div>
          <Link to="/update-password" className="btn btn-secondary">
            Cập nhật mật khẩu
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
                  Họ
                </label>
                <CustomInput
                  type="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  disabled={edit}
                />
                <div className="errors">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Tên
                </label>
                <CustomInput
                  type="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  disabled={edit}
                />
                <div className="errors">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="ex3" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="phoneNumber"
                  className="form-control"
                  id="ex3"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange("phoneNumber")}
                  onBlur={formik.handleBlur("phoneNumber")}
                  disabled={edit}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Ngày sinh
                </label>
                <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
                  <DatePicker
                    id="datePicker-1"
                    value={dob}
                    onChange={handleDobChange}
                    formatStyle="large"
                    disabled={edit}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                  className="form-control form-select"
                  id="gender"
                  disabled={edit}
                >
                  <option value="" selected disabled>
                    Chọn giới tính
                  </option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="ex2" className="form-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  disabled={edit}
                />
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

export default Profile;
