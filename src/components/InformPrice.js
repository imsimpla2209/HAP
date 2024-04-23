/* eslint-disable jsx-a11y/iframe-has-title */
import { getCollections } from "features/collections/collectionsSlice";
import { contactService } from "features/customer/contact/contactService";
import { createQuery } from "features/customer/contact/contactSlice";
import { getUserProfile } from "features/customer/user/authSlice";
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
})

const InformPrice = ({
  productId,
  collection,
  model,
  isOpened,
  onClose = () => { },
}) => {
  const dispatch = useDispatch()
  const productState = useSelector((state) => state.product.products);
  const collectionState = useSelector((state) => state.collections.collections);
  const userState = useSelector((state) => state?.auth?.myProfile);
  const getUser = () => {
    dispatch(getUserProfile());
  };

  useEffect(() => {
    getUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: userState?.lastName + " " + userState?.firstName || "",
      comment: "",
      email: userState?.email || "",
      mobile: userState?.phoneNumber || ""
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      try {
        await contactService.postQuery({
          guestName: values.name,
          email: values.email,
          comment: values.comment,
          phoneNumber: values.mobile,
          productId: productId || null,
          collectionId: collection?.collectionId || null,
          modelId: model?.modelId || null
        })
        formik.resetForm();
        onClose();
        toast.info("Gửi yêu cầu báo giá thành công");
      } catch (error) {
        toast.error("Có lỗi xảy ra vui lòng thử lại");
      }
    },
  });
  useEffect(() => {
    dispatch(getProducts(0));
    dispatch(getCollections());
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
                        disabled={!!productId || !!model || !!collection?.collectionId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productId || productId || model?.modelId || collection?.collectionId}
                        className="form-select"
                        style={{
                          borderRadius: "0.5rem",
                          border: 0,
                        }}
                      >
                        {model && <option value={model?.modelId}>{model?.modelName}</option>}
                        {collection && <option value={collection?.collectionId}>{collection?.collectionName}</option>}
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
                  <h3 className="contact-title mb-4">Liên hệ với chúng tôi</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">Số 2/112 Ngõ Ông Ngoại, đường Nước Phần Lan, Phường Tứ Liên, Quận Tây Hồ, TP. Hà Nội</address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel: +8404866118">+0904.866.118</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:mailto:haanphatxnk@gmail.com">
                          mailto:haanphatxnk@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Thứ 2 - Thứ 6 10Am-8PM</p>
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
