/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import "./Login.css";
import CustomInput from "../../../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be required")
      .required("Email is Required"),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  useEffect(() => {
    if (!user == null || isSuccess) {
      window.location.reload();
      navigate("admin");
    }
  }, [user, isLoading, isError, isSuccess]);
  return (
    <>
      <div className="login animated bounceInDown">
        <div className="container">
          <form name="form1" className="box" onSubmit={formik.handleSubmit}>
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Sign in to your account.</h5>
            <h1 className="error text-center">
              {message.message === "Rejected" ? "You are not an Admin" : ""}
            </h1>
            <CustomInput
              classname="input"
              type="text"
              label="Email"
              id="email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <h5 style={{ color: "red" }}>{formik.errors.email}</h5>
            ) : null}
            <CustomInput
              classname="input"
              type="password"
              name="password"
              label="Password"
              id="password"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <h5 style={{ color: "red" }}>{formik.errors.password}</h5>
            ) : null}
            <button type="submit" value="Login" className="btn1">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
