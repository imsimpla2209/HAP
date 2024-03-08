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
} from "../../../features/admin/upload/uploadSlice";
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
} from "../../../features/admin/blog/blogSlice";

import { getBlogcats } from "../../../features/admin/blogcat/blogcatSlice";
import { resetImgProductState } from "../../../features/admin/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  bcategories: yup.string().required("Category is Required"),
});
const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.blogcat.blogcats);
  const blogState = useSelector((state) => state.blog);
  const imgBlogState = useSelector((state) => state.blog.blogImages);
  const { blogName, blogDesc, blogCategory, blogImages } = blogState;

  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBlogcats());
  }, []);
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


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      bcategories: blogCategory || "",
      images: blogImages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
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
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <CustomInput
            type="text"
            id="title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <label htmlFor="bcategories">Category</label>
          <select
            name="bcategories"
            onChange={formik.handleChange("bcategories")}
            onBlur={formik.handleBlur("bcategories")}
            value={formik.values.bcategories}
            className="form-control py-3  mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCatState.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.title}
                </option>
              ))}
          </select>
          {formik.touched.blogcat && formik.errors.blogcat && (
            <div className="error">{formik.errors.blogcat}</div>
          )}
          <label htmlFor="description">Description</label>
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
          <div className="form-group">
            <div className="upload-form bg-white border-1 p-5 text-center">
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {getBlogId === undefined ? (
              <div className="showimages d-flex flex-wrap gap-3">
                {imgState?.map((i, j) => {
                  return (
                    <div className=" position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(delImg(i.public_id));
                        }}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                  );
                })}
              </div>
            ) : (
              imgBlogState === null || (
                <div className="showimages d-flex flex-wrap gap-3">
                  {imgBlogState?.map((i, j) => {
                    return (
                      <div className=" position-relative" key={j}>
                        <button
                          type="button"
                          onClick={() => {
                            // dispatch(resetImgProductState());
                            dispatch(resetImgBlogState());
                            dispatch(delImg(i.public_id));
                          }}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px" }}
                        ></button>
                        <img src={i.url} alt="" width={200} height={200} />
                      </div>
                    );
                  })}
                  {imgState?.map((i, j) => {
                    return (
                      <div className=" position-relative" key={j}>
                        <button
                          type="button"
                          onClick={() => dispatch(delImg(i.public_id))}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px" }}
                        ></button>
                        <img src={i.url} alt="" width={200} height={200} />
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
