/* eslint-disable jsx-a11y/iframe-has-title */
import { createQuery } from "features/customer/contact/contactSlice";
import { getProducts } from "features/product/productSlice";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { Modal } from "react-rainbow-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";


const contactSchema = yup.object({
  name: yup.string().required("Yêu cầu nhập tên"),
  email: yup.string().nullable().email("Email should be valid").required("Yêu cầu nhập Email "),
  mobile: yup.number().default('').nullable().required("Yêu cầu nhập số điện thoại ").typeError("Yêu cầu nhập số điện thoại "),
  comment: yup.string().default('').nullable(),
  productId: yup.number().default('').nullable().required("Yêu cầu nhap vao productId"),
})

const InformPrice = ({
  productId,
  isOpened,
  onClose = () => { },
}) => {
  const dispatch = useDispatch()
  const productState = useSelector((state) => state.product.products);

  const formik = useFormik({
    initialValues: {
      name: "",
      comment: "",
      email: "",
      mobile: ""
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery({
        name: values.name,
        email: values.email,
        comment: values.comment,
        mobile: values.mobile,
        productId: productId
      }))
      formik.resetForm();
      toast.info("Send Enquiry Successfully");
    },
  });
  useEffect(() => {
    dispatch(getProducts(1));
  }, [])
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={onClose}
      style={{
        width: "90%",
      }}
    >
      <div className="contact-wrapper py-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title">Nhận Báo Giá Sản Phẩm</h3>
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
                      <div style={{
                        color: "red",
                        fontSize: 14
                      }}>
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
                      <div style={{
                        color: "red",
                        fontSize: 14
                      }}>
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
                      <div style={{
                        color: "red",
                        fontSize: 14
                      }}>
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div className="">
                      <select
                        id="productId"
                        name="productId"
                        disabled={!!productId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productId || productId}
                        className="form-select"
                        style={{
                          borderRadius: "0.5rem",
                          border: 0,
                        }}
                      >
                        <option value="">Lựa chọn sản phẩm</option>
                        {productState?.map((item, index) => (
                          <option key={index} value={item.productId}>
                            {item?.productName}
                          </option>
                        ))}
                      </select>
                      {formik.touched.productId && formik.errors.productId && (
                        <div style={{
                          color: "red",
                          fontSize: 14
                        }}>{formik.errors.productId}</div>
                      )}
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
                      <div style={{
                        color: "red",
                        fontSize: 14
                      }}>
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <div>
                      <button className="button border-0">Gửi</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">102 Vu Pham Ham</address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel: +84345532150">+84345532150</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:hdhien2002@gmail.com">
                          hdhien2002@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Monday - Friday 10Am-8PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InformPrice;
