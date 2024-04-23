/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createQuery } from "../../features/customer/contact/contactSlice";
import { toast } from "react-toastify";
import { getUserProfile } from "features/customer/user/authSlice";


const contactSchema = yup.object({
  name: yup.string().required("Yêu cầu nhập tên"),
  email: yup.string().nullable().email("Email should be valid").required("Yêu cầu nhập Email "),
  mobile: yup.number().default('').nullable().required("Yêu cầu nhập số điện thoại "),
  comment: yup.string().default('').nullable().required("Yêu cầu nhập bình luận"),
})

const Contact = () => {
  const dispatch = useDispatch()

  const userState = useSelector((state) => state?.auth?.myProfile);
  const getUser = () => {
    dispatch(getUserProfile());
  };

  useEffect(() => {
    getUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: userState?.lastName || "" + " " + userState?.firstName || "",
      comment: "",
      email: userState?.email || "",
      mobile: userState?.phoneNumber || ""
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery({
        name: values.name,
        email: values.email,
        comment: values.comment,
        mobile: values.mobile
      }))
      formik.resetForm();
      toast.info("Send Enquiry Successfully");
    },
  });
  return (
    <>
      <Meta title={"Liên hệ"} />
      <BreadCrumb title="Liên hệ" />
      <div className="contact-wrapper py-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                width="600"
                height="450"
                className="border-0 w-100"
                loading="lazy"
                allowfullscreen=""
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.219151143882!2d105.83283957505729!3d21.0639075805942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aa50d6218a27%3A0x2f730346a4edc086!2zMTEyIE5nLiA1NiBQLiBU4bupIExpw6puLCBU4bupIExpw6puLCBUw6J5IEjhu5MsIEjDoCBO4buZaSAxMDAwMDAsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1712633926060!5m2!1sen!2s"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title">Liên hệ</h3>
                  <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        placeholder="Tên"
                        className="form-control"
                        name="name"
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                      />
                      <div className="errors">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                      <div className="errors">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="số điện thoại"
                        className="form-control"
                        name="mobile"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                      <div className="errors">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div>
                      <textarea
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        row="10"
                        placeholder="Bình luận"
                        name="comment"
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      ></textarea>
                      <div className="errors">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <div>
                      <button className="button border-0">Gửi</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Hãy liên lạc với chúng tôi</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">Số 2/112 Ngõ Ông Ngoại, đường Nước Phần Lan, Phường Tứ Liên, Quận Tây Hồ, TP. Hà Nội</address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel: +8404866118">0904.866.118</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:hdhien2002@gmail.com">
                          haanphatxnk@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Thứ 2 - Thứ 7, 10am-8pm</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
