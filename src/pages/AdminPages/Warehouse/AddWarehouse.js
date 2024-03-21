/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { createCollection, getACollection, resetState, updateCol } from "features/collections/collectionsSlice";
import { getModels } from "features/models/modelsSlice";
import { useFormik } from "formik";
import { React, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import { createWarehouse, updateWarehouse } from "features/warehouse/warehousesSlice";


let schema = yup.object().shape({
  modelId: yup.string().required("Hãy chọn mẫu"),
  note: yup.string(),
  quantity: yup.number().required("Nhập Số lượng"),
  isImport: yup.boolean(),
});
const AddWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getWarehouseId = location.pathname.split("/")[3];
  console.log(getWarehouseId);
  const collectionState = useSelector((state) => state.collections);
  const modelsState = useSelector((state) => state.models.models);
  console.log(collectionState);
  const isEditMode = getWarehouseId !== undefined;
  const { modelId, note, quantity, isImport } = collectionState;

  useEffect(() => {
    dispatch(getModels());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(getACollection(getWarehouseId));
    }
  }, [isEditMode, getWarehouseId, dispatch]);

  useEffect(() => {
    if (getWarehouseId !== undefined) {
      dispatch(getACollection(getWarehouseId));

    } else {
      dispatch(resetState());
    }
  }, [getWarehouseId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      modelId: modelId || "",
      note: note || "",
      quantity: quantity || "",
      isImport: isImport || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values); // Log the values here
      console.log(getWarehouseId)
      if (getWarehouseId !== undefined) {
        const data = { id: getWarehouseId, warehouseData: values };
        dispatch(updateWarehouse(data));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/collection-list");
          dispatch(resetState());
        }, 1000);
      } else {
        console.log(values);
        dispatch(createWarehouse(values));
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
        {getWarehouseId !== undefined ? "Sửa" : "Thêm"} Nhật Kí kho
      </h3>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit} className="add-warehouse-form">
          <div className="form-group">
            <label htmlFor="modelId">Mẫu</label>
            <select
              id="modelId"
              name="modelId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.modelId}
              className="form-select"
            >
              <option value="">Lựa chọn bộ mẫu cần nhập</option>
              {modelsState?.map((item, index) => (
                <option key={index} value={item.modelId}>
                  {item?.modelName}
                </option>
              ))}
            </select>
            {formik.touched.modelId && formik.errors.modelId && (
              <div className="error">{formik.errors.modelId}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Số lượng</label>
            <CustomInput
              type="number"
              name="quantity"
              onCh={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity?.toString()}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="note">Ghi chú</label>
            <ReactQuill
              theme="snow"
              id="note"
              name="note"
              onChange={(value) => formik.setFieldValue("note", value)}
              value={formik.values.note}
            />
            {formik.touched.note && formik.errors.note && (
              <div className="error">{formik.errors.note}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="isImport">Hàng Nhập</label>
            <input type="checkbox" id='isImport' name='isImport'
              onChange={(e) => { formik.setFieldValue('isImport', e.target.checked) }} />

            {formik.touched.isImport && formik.errors.isImport && (
              <div className="error">{formik.errors.isImport}</div>
            )}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getWarehouseId !== undefined ? "Sửa" : "Thêm"} nhật ký kho
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWarehouse;
