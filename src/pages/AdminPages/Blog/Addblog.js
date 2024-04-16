/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import {
  delImg,
  resetUploadState,
  uploadImg,
} from "../../../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlog,
  getABlog,
  resetImgBlogState,
  resetState,
  updateBlog,
} from "../../../features/blog/blogSlice";

// import { getBlogcats } from "../../../features/admin/blogcat/blogcatSlice";
import { resetImgProductState } from "../../../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Nhập tên bài"),
  description: yup.string().required("Nhập nội dung bài đăng"),
});
const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  console.log(getBlogId);
  const imgState = useSelector((state) => state.upload.images);
  // const bCatState = useSelector((state) => state.blogcat.blogcats);
  const blogState = useSelector((state) => state.blog);
  console.log(blogState);
  const imgBlogState = useSelector((state) => state.blog.blogImages);
  const { blogName, blogDesc, blogImages } = blogState;

  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   dispatch(getBlogcats());
  // }, []);
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  const img = [];

  useEffect(() => {
    imgState.forEach((i) => {
      img.push({
        public_id: i.public_id,
        url: i.url,
      });
    });

    formik.setValues({
      ...formik.values,
      images: [...img],
    });
  }, [imgState]);

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  const handleDrop = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
    formik.setValues({
      ...formik.values,
      images: [...formik.values.images],
    });
  };

  console.log(blogName);
  console.log(blogDesc);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      images: blogImages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values); // Log the values here
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-list");
          dispatch(resetState());
          dispatch(resetUploadState());
        }, 1000);
      } else {
        console.log(values);
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-list");
          dispatch(resetUploadState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Sửa" : "Thêm"} Tin tức
      </h3>
      <div className="mt-4">
        <label htmlFor="title">Tiêu đề</label>
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <CustomInput
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
          <div className="mb-4"></div>
          <label htmlFor="description">Mô tả</label>
          <ReactQuill
            theme="snow"
            id="description"
            name="description"
            onChange={(value) => formik.setFieldValue("description", value)}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
          <div className="mb-4"></div>
          <div className="form-group">
            <div className="upload-form bg-white border-1 p-5 text-center">
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Thả đính kèm vào đây
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="">
              {imgState && imgState.length > 0 && (
                <div className="showimages d-flex flex-wrap gap-3">
                  {imgState.map((image, index) => (
                    <div className=" position-relative" key={index}>
                      <button
                        type="button"
                        onClick={() => dispatch(delImg(image.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={image.url} alt="" width={200} height={200} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Sửa" : "Thêm"} Tin tức
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
