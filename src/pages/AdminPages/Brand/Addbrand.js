// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import { React, useEffect, useState } from "react";
// import CustomInput from "../../../components/CustomInput";
// import "react-quill/dist/quill.snow.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createBrand,
//   getABrand,
//   resetState,
//   updateBrand,
// } from "../../../features/admin/admin-brand/brandSlice";

// let schema = yup.object().shape({
//   title: yup.string().required("Title Brand is Required"),
// });

// const Addbrand = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const getBrandId = location.pathname.split("/")[3];
//   const newBrand = useSelector((state) => state.brand);
//   const {
//     brandName,
//   } = newBrand;

//   useEffect(() => {
//     if (getBrandId !== undefined) {
//       dispatch(getABrand(getBrandId));
//       formik.values.title = brandName;
//     }
//   }, [getBrandId]);


//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: brandName || "",
//     },
//     validationSchema: schema,

//     onSubmit: (values) => {
//       if (getBrandId !== undefined) {
//         const data = { id: getBrandId, brandData: values };
//         dispatch(updateBrand(data));
//         setTimeout(() => {
//           navigate("/admin/brand-list")
//           dispatch(resetState());
//         }, 1000);
//       } else {
//         dispatch(createBrand(values));
//         formik.resetForm();
//         setTimeout(() => {
//           navigate("/admin/brand-list")
//           dispatch(resetState());
//         }, 1000);
//       }
//     },
//   });
//   return (
//     <div>
//       <h3 className="mb-4 title">
//         {getBrandId !== undefined ? "Edit" : "Add"} Brand
//       </h3>
//       <div className="form-group">
//         <form onSubmit={formik.handleSubmit} className="add-blog-form">
//         <label htmlFor="title">Brand Title</label>
//           <CustomInput
//             type="text"
//             id="title"
//             name="title"
//             onCh={formik.handleChange("title")}
//             onBlr={formik.handleBlur("title")}
//             val={formik.values.title}
//           />
//           <div className="error">
//             {formik.touched.title && formik.errors.title}
//           </div>
//           <button
//             className="btn btn-success border-0 rounded-3 my-5"
//             type="submit"
//           >
//             {getBrandId !== undefined ? "Edit" : "Add"} Brand
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addbrand;
