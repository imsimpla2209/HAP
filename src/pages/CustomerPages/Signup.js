import { authService } from "features/customer/user/authService";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import BreadCrumb from "../../components/BreadCrumb";
import CustomInput from "../../components/CustomInput";
import Meta from "../../components/Meta";
import { message } from "antd";

const signUpSchema = yup.object({
  firstname: yup.string().required("Yêu cầu nhập tên"),
  lastname: yup.string().required("Yêu cầu nập họ"),
  email: yup.string().nullable().email("Email nhập không đúng định dạng").required("Yêu cầu nhập email"),
  password: yup
    .string()
    .required("Password is requird")
    .min(8, "Password must be at least 8 characters long"),
});

function Signup() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      // dispatch(registerUser(values));
      try {
        await authService.register(values);
        navigate("/login");
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: `Đăng ký tài khoản thất bại!\n Chi tiết: ${error.message}`,
        });
      }
    },
  });
  useState(() => {
    if (authState.createdUser !== null && authState.isError === false) {
      navigate("/login");
    }
  }, [authState]);
  return (
    <>
      <Meta title={"Đăng ký"} />
      <BreadCrumb title="Đăng ký" />
      <div className="login-wrapper py-2Sign Up-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center">Login</h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <CustomInput
                      type="text"
                      name="firstname"
                      placeholder="Tên"
                      className="form-control"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div>
                    <CustomInput
                      type="text"
                      name="lastname"
                      placeholder="Họ"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                  <div>
                    <CustomInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="mt-1">
                    <CustomInput
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                    <div className="error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
