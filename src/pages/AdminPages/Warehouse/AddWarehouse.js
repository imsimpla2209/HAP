/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "antd";
import { getACollection, resetState } from "features/collections/collectionsSlice";
import { createWarehouse, updateWarehouse } from "features/warehouse/warehousesSlice";
import { useFormik } from "formik";
import { React, useEffect, useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput1";
import SelectModelModal from "./SelectModelModal";
import { FaSearch } from "react-icons/fa";
import { Card } from "react-rainbow-components";
import { formatCurrencyVND } from "utils/formator";


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

  const [show, setShow] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const getWarehouseId = location.pathname.split("/")[3];
  console.log(getWarehouseId);
  const collectionState = useSelector((state) => state.collections);
  console.log(collectionState);
  const isEditMode = getWarehouseId !== undefined;
  const { modelId, note, quantity, isImport } = collectionState;

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
          navigate("/admin/warehouse-list");
          dispatch(resetState());
        }, 1000);
      } else {
        console.log(values);
        dispatch(createWarehouse(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/warehouse-list");
        }, 1000);
      }
    },
  });


  useEffect(() => {
    formik.setFieldValue("modelId", selectedModel?.modelId || '')
  }, [selectedModel]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getWarehouseId !== undefined ? "Sửa" : "Thêm"} Nhật Kí kho
      </h3>
      <SelectModelModal show={show} hide={() => { setShow(false) }} setSelectedRowKeys={(model) => {
        setSelectedModel(model)
        setShow(false)
      }} />
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit} className="add-warehouse-form">
          <div className="form-group">
            <label htmlFor="modelId">Mẫu</label>
            {!selectedModel ? <Button
              type="primary"
              shape="round"
              icon={<FaSearch />}
              onClick={() => {
                setShow(true);
              }}
            >
              Chọn mẫu
            </Button> :
              <Card size="small" title={selectedModel?.modelName || 'Mẫu không tên'}

                style={{ width: 300 }}
              >
                <div className="mx-4">
                  <p><span className="text-muted">
                    Giá bán buôn:</span> {formatCurrencyVND(selectedModel?.primaryPrice)}</p>
                  <p><span className="text-muted">
                    Giá bán lẻ:</span> {formatCurrencyVND(selectedModel?.secondaryPrice)}</p>
                  <p><span className="text-muted">Còn lại:</span> {selectedModel?.quantity || 0} cái</p>
                </div>
                <Button type="danger" style={{ float: 'right' }} icon={<FormOutlined />} onClick={() => {
                  setShow(true);
                }}>
                  <>Chọn lại mẫu</>
                </Button>
              </Card>}
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
