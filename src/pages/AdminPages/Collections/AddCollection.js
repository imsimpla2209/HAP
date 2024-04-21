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
import collectionService from "features/collections/collectionsService";
import { Button } from "antd";


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
      try {
        setLoading(true);
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
          await collectionService.updateCollection(values)
          toast.success("Sửa bộ sản phẩm thành công")
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/collection-list");
            dispatch(resetState());
          }, 100);
        } else {
          console.log(values);
          await collectionService.createCollection(values)
          toast.success("Thêm sản phẩm thành công")

          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/collection-list");
          }, 1000);
        }
      } catch (error) {
        toast.error("Có Lỗi Vui Lòng Thử Lại")
      } finally {
        setLoading(false);
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

            <div className="attachments-cn">
              <DefaultUpload normFile={normFile} files={files} maxCount={1}></DefaultUpload>
            </div>
            <p className="my-3 mx-4 ">
              Bạn có thể đính kèm tối đa 1 tệp có kích thước bằng <strong>25MB</strong>{' '}
            </p>
          </div>
          <Button
            className="btn btn-success border-0 rounded-3 my-5"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={() => {
              formik.submitForm();
            }}
          >
            {getCollectionId !== undefined ? "Sửa" : "Thêm"} bộ sản phẩm
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
