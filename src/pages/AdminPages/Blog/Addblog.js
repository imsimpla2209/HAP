/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useCallback, useEffect, useRef, useState } from "react";
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
import { DefaultUpload } from "components/Upload";
import { fetchAllToCL } from "utils/upload";
import blogService from "features/blog/blogService";
import { Button } from "antd";
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
  const { title, content, blogImages } = blogState;
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false);

  const normFile = (e) => {
    // handle event file changes in upload and dragger components
    const fileList = e
    console.log('file', e)
    fileList[0] = { ...fileList[0], saved: false }
    setFiles(fileList)
    return e
  }
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
    formik.values.images = img;
  }, [blogImages]);

  console.log(title);
  console.log(content);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      description: content || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values); // Log the values here
      try {
        setLoading(true);
        if (
          !files?.[0]?.saved || files?.[0]
        ) {
          delete files?.[0]?.saved
          const fileNameList = await fetchAllToCL(files?.map(file => file?.originFileObj))
          values.thumbnail = fileNameList?.[0]?.path
        }
        if (getBlogId !== undefined) {
          const data = { id: getBlogId, blogData: values };

          dispatch(updateBlog(data));
          await blogService.updateBlog(data)
          formik.resetForm();
          toast.success("Sửa Tin Tức thành công")
          setTimeout(() => {
            navigate("/admin/blog-list");
            dispatch(resetState());
            dispatch(resetUploadState());
          }, 100);

        } else {
          await blogService.createBlog(values)
          toast.success("Đăng tải Tin Tức thành công")

          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/blog-list");
            dispatch(resetUploadState());
          }, 100);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra vui lòng thử lại")
      } finally {
        setLoading(false);
      }
    },
  });

  const reactQuillRef = useRef(null);


  const uploadToCloudinary = async (file) => {
    const data = await fetchAllToCL([file], true)
    const url = data?.[0]?.path;
    return url
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadToCloudinary(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);

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
            ref={reactQuillRef}
            onChange={(value) => formik.setFieldValue("description", value)}
            value={formik.values.description}
            placeholder="Bắt Đầu Viết..."
            modules={{
              toolbar: {
                container: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["code-block"],
                  ["clean"],
                ],
                handlers: {
                  image: imageHandler,   // <- 
                },
              },
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
              "code-block",
            ]}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
          <div className="mb-4"></div>
          <div className="form-group">
            <div className="mt-3 py-2 pb-4">
              <p className="fw-bold">Ảnh nền</p>

              <div className="attachments-cn">
                <DefaultUpload normFile={normFile} files={files} maxCount={1}></DefaultUpload>
              </div>
              <p className="my-3 mx-4 ">
                Bạn có thể đính kèm tối đa 1 tệp có kích thước bằng <strong>25MB</strong>{' '}
              </p>
            </div>
          </div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="primary"
            onClick={() => {
              formik.submitForm();
            }}
            loading={loading}
            disabled={loading}
          >
            {getBlogId !== undefined ? "Sửa" : "Thêm"} Tin tức
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
