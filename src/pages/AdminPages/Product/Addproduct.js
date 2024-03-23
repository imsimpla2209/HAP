import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from "antd";
import adminCategoryService from "features/category/categoryService";
import collectionService from "features/collections/collectionsService";
import modelService from "features/models/modelsService";
import { getModels } from "features/models/modelsSlice";
import productService from "features/product/productService";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllToCL } from "utils/upload";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput1";
import {
  getAProduct,
  resetState,
  updateProduct
} from "../../../features/product/productSlice";
import {
  resetUploadState,
  uploadImg
} from "../../../features/upload/uploadSlice";
import { AddModel } from "../Model/AddModel";
import { SelectedModelList } from "./SelectedModelList";
import "./addproduct.css";

let schema = yup.object().shape({
  productName: yup.string().required("Hãy điền tên cho sản phẩm"),
  description: yup.string()?.nullable(),
  productCode: yup.string().required("Mã sản phẩm là cần thiết"),
  collectionId: yup.string(),
  categoryId: yup.string(),
  tags: yup.string(),
  // quantity: yup.number(),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [categoryState, setCategoryState] = useState([]);
  const [collectionState, setCollectionState] = useState([]);
  const modelsState = useSelector((state) => state.models.models);
  const imgProductState = useSelector((state) => state.product.productImages);
  const imgState = useSelector((state) => state.upload.images);
  const [models, setModels] = useState([]);

  const [selectedModel, setSelectedModel] = useState({});

  const [addModelModal, setAddModelModal] = useState(false);

  const [productState, setProductState] = useState({});
  const {
    productName,
    productDesc,
    productCode,
    category,
    productTag,
    collection,
    productImages,
    productQuantity,
  } = productState;

  useEffect(() => {
    (async () => {
      const catData = await adminCategoryService.getCategorys();
      const collectionData = await collectionService.getCollections();
      setCategoryState(catData);
      setCollectionState(collectionData);
    })();
  }, []);

  useEffect(() => {
    if (getProductId !== undefined) {
      img.push(productImages);
      (async () => {
        const product = await productService.getAProduct(getProductId);
        setProductState(product);
        const models = await modelService.getModels(getProductId);
        setModels(models);
      })()
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  useEffect(() => {
    if (modelsState && getProductId !== undefined) {
      setModels(modelsState);
    }
  }, [modelsState])

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
  }, [productImages]);

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
      productName: productName || "",
      description: productDesc || "",
      productCode: productCode || "",
      collectionId: collection?.collectionId || "",
      categoryId: category?.categoryId || "",
      quantity: productQuantity || "",
      tags: productTag || "",
      images: productImages || "",
    },
    validationSchema: schema,

    onSubmit: async (values) => {
      const productData = {
        productCode: values.productCode,
        productName: values.productName,
        categoryId: Number(values.categoryId),
        collectionIdList: [
          Number(values.collectionId),
        ]
      }
      let productId = getProductId;
      if (getProductId !== undefined) {
        const data = {
          id: getProductId,
          productData,
        };
        dispatch(updateProduct(data));
        setTimeout(() => {
          navigate("/admin/product-list");
          dispatch(resetUploadState());
          dispatch(resetState());
        }, 300);
      } else {
        const data = await productService.createProduct(productData)
        productId = data?.productId
      }
      if (models?.length) {
        console.log("models", models);
        try {
          const uploadModels = await Promise.all(models.map(async (model) => {
            if (model?.attachments?.length) {
              await fetchAllToCL(model?.attachments, false)
                .then(res => {
                  model.attachments = res?.filter(url => !!url) || []
                })
                .catch(err => {
                  model.attachments = []
                })
            }
            const res = model?.modelId ? await modelService.updateModel(productId, { ...model }) : await modelService.createModel(productId, { ...model });
            return res?.modelId;
          }));
          console.log("Upload successful:", uploadModels);
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/product-list");
            dispatch(resetUploadState());
            dispatch(resetState());
          }, 1000);
        } catch (error) {
          console.error("Error uploading models:", error);
        }
      }
    },
  });

  const handleAddModel = (modelData) => {
    setModels([...models, modelData]);
    setAddModelModal(false);
  };

  const handleDeleteModel = (index) => {
    const newModels = [...models];
    newModels.splice(index, 1);
    setModels(newModels);
  };

  const handleEditModel = (idx, modelData) => {
    const newModels = [...models];
    newModels[idx] = modelData;
    setModels(newModels);
    setAddModelModal(false);
    setSelectedModel({});
  };

  const handlePressEditModel = (index) => {
    const model = models?.[index];
    if (model) {
      setSelectedModel({ idx: index, model });
      setAddModelModal(true);
    }
  }

  return (
    <div className="">
      <h3 className="productName">Nhập Sản Phẩm</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="productName">Tên sản phẩm</label>
            <CustomInput
              type="text"
              id="productName"
              name="productName"
              onCh={formik.handleChange("productName")}
              onBlr={formik.handleBlur("productName")}
              val={formik.values.productName}
            />
            <div className="error">
              {formik.touched.productName && formik.errors.productName}
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
            <label htmlFor="productCode">Mã sản phẩm</label>
            <CustomInput
              type="text"
              name="productCode"
              onCh={formik.handleChange("productCode")}
              onBlr={formik.handleBlur("productCode")}
              val={formik.values.productCode.toString()}
            />
            <div className="error">
              {formik.touched.productCode && formik.errors.productCode}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="collectionId">Bộ sản phẩm</label>
            <select
              id="collectionId"
              name="collectionId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.collectionId}
              className="form-select"
            >
              <option value="">Lựa chọn bộ sản phẩm</option>
              {collectionState?.map((item, index) => (
                <option key={index} value={item.collectionId}>
                  {item?.collectionName}
                </option>
              ))}
            </select>
            {formik.touched.collectionId && formik.errors.collectionId && (
              <div className="error">{formik.errors.collectionId}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Danh mục sản phẩm</label>
            <select
              id="categoryId"
              name="categoryId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.categoryId}
              className="form-select"
            >
              <option value="">Lựa chọn danh mục</option>
              {categoryState?.map((category, index) => (
                <option key={index} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div className="error">{formik.errors.categoryId}</div>
            )}
          </div>
          {/* <div className="form-group">
            <label htmlFor="quantity">Số lượng sản phẩm</label>
            <CustomInput
              type="number"
              name="quantity"
              onCh={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity.toString()}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div> */}
          {/* <div className="form-group">
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
            {getProductId === undefined ? (
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
                            dispatch(resetImgProductState());
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
          </div> */}
          <div className="form-group">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <label htmlFor="productName">Mẫu</label>
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                onClick={() => {
                  setAddModelModal(true);
                }}
              >
                Thêm mẫu
              </Button>
            </div>
            {
              models?.length ? <SelectedModelList data={models} onDelete={handleDeleteModel} onEdit={handlePressEditModel} /> : null
            }
          </div>
          <Button
            className="border-0 rounded-3 my-5"
            type="primary"
            onClick={() => {
              formik.submitForm();
            }}
          // disabled={!!formik?.errors}
          >
            {getProductId !== undefined ? "Sửa" : "Thêm"} Sản Phẩm
          </Button>
        </form>
        <Modal
          style={{ top: 20 }}
          open={addModelModal}
          footer={null}
          onCancel={() => {
            setAddModelModal(false)
            setSelectedModel(null)

          }
          }>
          <AddModel
            onAddModel={handleAddModel}
            isModal={true}
            editedModal={selectedModel?.model}
            onEditModel={handleEditModel}
            idx={selectedModel?.idx}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Addproduct;
