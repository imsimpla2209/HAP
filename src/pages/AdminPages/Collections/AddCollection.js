/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput";
import { DefaultUpload } from "components/Upload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createCollection, getACollection, resetState, updateCol } from "features/collections/collectionsSlice";
import { fetchAllToCL } from "utils/upload";


let schema = yup.object().shape({
  collectionName: yup.string().required("Nhập tên bài"),
  description: yup.string().required("Nhập nội dung bài đăng"),
});
const AddCollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCollectionId = location.pathname.split("/")[3];
  console.log(getCollectionId);
  const collectionState = useSelector((state) => state.collections);
  console.log(collectionState);
  const isEditMode = getCollectionId !== undefined;
  const { collectionName, Description } = collectionState;
  const [files, setFiles] = useState([])
  const normFile = (e) => {
    // handle event file changes in upload and dragger components
    const fileList = e
    console.log('file', e)
    fileList[0] = { ...fileList[0], saved: false }
    setFiles(fileList)
    return e
  }
  useEffect(() => {
    if (isEditMode) {
      dispatch(getACollection(getCollectionId));
    }
  }, [isEditMode, getCollectionId, dispatch]);

  useEffect(() => {
    if (getCollectionId !== undefined) {
      dispatch(getACollection(getCollectionId));

    } else {
      dispatch(resetState());
    }
  }, [getCollectionId]);

  useEffect(() => {
    if (collectionState.thumbnail) {
      console.log(collectionState.thumbnail)
      setFiles([
        {
          url: collectionState.thumbnail,
          saved: true,
        },
      ]);
    }
  }, [collectionState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      collectionName: collectionName || "",
      description: Description || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values); // Log the values here
      console.log(getCollectionId)
      if (
        !files?.[0]?.saved && files?.[0]
      ) {
        delete files?.[0]?.saved
        const fileNameList = await fetchAllToCL(files?.map(file => file?.originFileObj))
        values.thumbnail = fileNameList?.[0]?.path
      }
      if (getCollectionId !== undefined) {
        const data = { id: getCollectionId, colData: values };
        dispatch(updateCol(data));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/collection-list");
          dispatch(resetState());
        }, 1000);
      } else {
        console.log(values);
        dispatch(createCollection(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/collection-list");
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCollectionId !== undefined ? "Sửa" : "Thêm"} bộ sản phẩm
      </h3>
      <div className="mt-4">
        <label htmlFor="collectionName">Tên bộ sản phẩm</label>
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <CustomInput
            type="text"
            id="collectionName"
            name="collectionName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.collectionName}
          />
          {formik.touched.collectionName && formik.errors.collectionName && (
            <div className="error">{formik.errors.collectionName}</div>
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
          <div className="mt-3 py-2 pb-4">
            <p className="fw-bold">Ảnh nền</p>

            {/* <div className="attachments-cn">
              <p className="pt-2 px-5 text-center">
                Thả hoặc{' '}
                <label htmlFor="file" className="upw-c-cn me-1" style={{ cursor: 'pointer' }}>
                  Đăng tải
                </label>
                Hình ảnh (tuỳ chọn)
                <DefaultUpload normFile={normFile} files={files} maxCount={1} />
              </p>
            </div>
            <p className="my-3 mx-4 ">
              Bạn có thể đính kèm tối đa 10 tệp có kích thước bằng <strong>25MB</strong>{' '}
            </p> */}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCollectionId !== undefined ? "Sửa" : "Thêm"} bộ sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
