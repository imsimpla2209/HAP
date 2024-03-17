import { Button } from "antd";
import { getUnits } from "features/unit/unitsSlice";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput1";
import { getColors } from "../../../features/color/colorsSlice";
import {
  createModel,
  getAModel,
  resetImgModelState,
  resetState,
  updateModel
} from "../../../features/models/modelsSlice";
import {
  delImg,
  resetUploadState,
  uploadImg
} from "../../../features/upload/uploadSlice";
import "../Product/addproduct.css";
import { DefaultUpload } from "components/Upload";

let schema = yup.object().shape({
  modelName: yup.string().required("Hãy điền tên cho mẫu"),
  description: yup.string().required("Hãy điền mô tả cho mẫu"),
  specification: yup.string().required("Thông số mẫu là cần thiết"),
  primaryPrice: yup.number().required("Nhập giá bán lẻ cho mẫu"),
  secondaryPrice: yup.number().required("Nhập giá bán buôn cho mẫu"),
  colorId: yup.string(),
  unitId: yup.string(),
  available: yup.number(),
});

const AddModel = (
  {
    onAddModel,
    isModal,
    editedModal,
    onEditModel,
    idx,
  }
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getModelId = location.pathname.split("/")[3];
  const unitsState = useSelector((state) => state.unit.units);
  const colorsState = useSelector((state) => state.color.colors);
  const imgProductState = useSelector((state) => state.product.productImages);
  const imgState = useSelector((state) => state.upload.images);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([])

  const modelState = useSelector((state) => state.model);
  const {
    description,
    modelName,
    specification,
    primaryPrice,
    secondaryPrice,
    colorId,
    unitId,
    modelImages,
    productId,
    available,
    attachments
  } = modelState || editedModal || {};

  useEffect(() => {
    dispatch(getColors());
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    if (getModelId !== undefined) {
      dispatch(getAModel(getModelId));
      img.push(modelImages);
      setFiles(attachments || [])
    } else {
      dispatch(resetState());
    }
  }, [getModelId]);

  const normFile = (e) => {
    // handle event file changes in upload and dragger components
    const fileList = e
    console.log('file', e)
    setFiles(fileList)
    return e
  }

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
  }, [modelImages]);

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
      modelName: modelName || "",
      description: description || "",
      specification: specification || "",
      primaryPrice: primaryPrice || "",
      secondaryPrice: secondaryPrice || "",
      productId: productId || "",
      colorId: colorId || "",
      available: available || "",
      unitId: unitId || "",
      images: modelImages || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      const modelData = {
        modelName: values.modelName,
        unitId: Number(values.unitId),
        description: values.description,
        specification: values.specification,
        primaryPrice: Number(values.primaryPrice),
        secondaryPrice: Number(values.secondaryPrice),
        colorId: Number(values.colorId),
        available: Number(values.available),
        attachments: files || [],
      }
      if (isModal) {
        formik.resetForm();
        if (editedModal) {
          onEditModel && onEditModel(idx, { modelData, modelId: editedModal?.modelId });
        }
        else onAddModel && onAddModel(modelData);
      }
      else {
        if (getModelId !== undefined) {
          const data = {
            id: getModelId,
            modelData,
          };
          dispatch(updateModel(data));
          setTimeout(() => {
            onAddModel ? onAddModel(modelData) : navigate("/admin/product-list");
            dispatch(resetUploadState());
            dispatch(resetState());
          }, 300);
        } else {
          dispatch(createModel(modelData));
          formik.resetForm();
          setTimeout(() => {
            onAddModel ? onAddModel(modelData) : navigate("/admin/product-list");
            dispatch(resetUploadState());
            dispatch(resetState());
          }, 1000);
        }
      }
    },
  });

  console.log("modelData", files);

  useEffect(() => {
    return () => {
      dispatch(resetState());
      dispatch(resetImgModelState());
      formik.resetForm();
    }
  }, []);

  return (
    <div className="">
      <h3 className="modelName">Nhập Mẫu Vật</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="add-model-form">
          <div className="form-group">
            <label htmlFor="modelName">Tên mẫu</label>
            <CustomInput
              type="text"
              name="modelName"
              onCh={formik.handleChange("modelName")}
              onBlr={formik.handleBlur("modelName")}
              val={formik.values.modelName?.toString()}
            />
            <div className="error">
              {formik.touched.modelName && formik.errors.modelName}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              // onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error">{formik.errors.description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="specification">Thông Số Kỹ Thuật</label>
            <ReactQuill
              theme="snow"
              name="specification"
              onChange={formik.handleChange("specification")}
              // onBlur={formik.handleBlur("specification")}
              value={formik.values.specification}
            />
            <div className="error">
              {formik.touched.specification && formik.errors.specification}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="primaryPrice">Giá Bán Lẻ</label>
            <CustomInput
              type="text"
              name="primaryPrice"
              onCh={formik.handleChange("primaryPrice")}
              onBlr={formik.handleBlur("primaryPrice")}
              val={formik.values.primaryPrice.toString()}
            />
            <div className="error">
              {formik.touched.primaryPrice && formik.errors.primaryPrice}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="secondaryPrice">Giá Bán Buôn</label>
            <CustomInput
              type="text"
              name="secondaryPrice"
              onCh={formik.handleChange("secondaryPrice")}
              onBlr={formik.handleBlur("secondaryPrice")}
              val={formik.values.secondaryPrice.toString()}
            />
            <div className="error">
              {formik.touched.secondaryPrice && formik.errors.secondaryPrice}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="unitId">Đơn vị</label>
            <select
              name="unitId"
              onChange={formik.handleChange("unitId")}
              onBlur={formik.handleBlur("unitId")}
              value={formik.values.unitId}
              className="form-select"
              id=""
            >
              <option value="">
                Chọn đơn vị tính
              </option>
              {unitsState?.map((category, index) => (
                <option key={index} value={category.unitId}>
                  {category.unitName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="colorId">Màu sắc</label>
            <select
              id="colorId"
              name="colorId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.colorId}
              className="form-select"
            >
              <option value="">Lựa chọn màu sắc</option>
              {colorsState?.map((category, index) => (
                <option key={index} value={category.colorId}>
                  {category.colorName}
                </option>
              ))}
            </select>
            {formik.touched.colorId && formik.errors.colorId && (
              <div className="error">{formik.errors.colorId}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="available">Số lượng hàng</label>
            <CustomInput
              type="number"
              name="available"
              onCh={formik.handleChange("available")}
              onBlr={formik.handleBlur("available")}
              val={formik.values.available.toString()}
            />
            <div className="error">
              {formik.touched.available && formik.errors.available}
            </div>
          </div>
          <div className="mt-3 py-2 pb-4">
            <p className="fw-bold">Đính kèm</p>

            <div className="attachments-cn">
              <p className="pt-2 px-5 text-center">
                Thả hoặc{' '}
                <label htmlFor="file" className="upw-c-cn me-1" style={{ cursor: 'pointer' }}>
                  Đăng tải
                </label>
                Tệp hoặc hình ảnh (tuỳ chọn)
                <DefaultUpload normFile={normFile} files={files?.map(f => f?.path || f)}></DefaultUpload>
              </p>
            </div>
            <p className="my-3 mx-4 ">
              Bạn có thể đính kèm tối đa 10 tệp có kích thước bằng <strong>25MB</strong>{' '}
            </p>
          </div>
          <div className="form-group">
            <div className="upload-form bg-white border-1 p-5 text-center">
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Kéo và thả một số tệp vào đây hoặc nhấp để chọn tệp
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {getModelId === undefined ? (
              <div className="showimages d-flex flex-wrap gap-3">
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
            ) : (
              imgProductState === null || (
                <div className="showimages d-flex flex-wrap gap-3">
                  {imgProductState?.map((i, j) => {
                    return (
                      <div className=" position-relative" key={j}>
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(resetImgModelState());
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

          <Button
            className="border-0 rounded-3 my-5"
            type="primary"
            onClick={() => {
              formik.submitForm();
            }}
          // disabled={!!formik.errors}
          >
            {getModelId !== undefined || editedModal ? "Sửa" : "Thêm"} Mẫu
          </Button>
        </form>
      </div>
    </div>
  );
};

export { AddModel };
