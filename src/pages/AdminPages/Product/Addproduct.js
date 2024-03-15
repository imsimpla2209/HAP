import { Button } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput1";
import { getBrands } from "../../../features/customer/brand/brandSlice";
import { getCategorys } from "../../../features/customer/category/categorySlice";
import {
  createProduct,
  getAProduct,
  resetImgProductState,
  resetState,
  updateProduct,
} from "../../../features/product/productSlice";
import {
  delImg,
  resetUploadState,
  uploadImg,
} from "../../../features/upload/uploadSlice";
import "./addproduct.css";
import { getCollections } from "features/collections/collectionsSlice";

let schema = yup.object().shape({
  productName: yup.string().required("Hãy điền tên cho sản phẩm"),
  description: yup.string().required("Hãy điền mô tả cho sản phẩm"),
  productCode: yup.string().required("Mã sản phẩm là cần thiết"),
  collectionId: yup.string(),
  categoryId: yup.string(),
  tags: yup.string(),
  quantity: yup.number(),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const collectionState = useSelector((state) => state.collections.collections);
  const categoryState = useSelector((state) => state.category.categorys);
  const imgProductState = useSelector((state) => state.product.productImages);
  const imgState = useSelector((state) => state.upload.images);
  const [images, setImages] = useState([]);

  const productState = useSelector((state) => state.product);
  const {
    productName,
    productDesc,
    categoryId,
    productPrice,
    productTag,
    collectionId,
    productImages,
    productQuantity,
  } = productState;

  console.log(categoryState);
  console.log(collectionState);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategorys());
    dispatch(getCollections());
  }, []);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      img.push(productImages);
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

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
      productCode: productPrice || "",
      collectionId: collectionId || "",
      categoryId: categoryId || "",
      quantity: productQuantity || "",
      tags: productTag || "",
      images: productImages || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      const productData = {
        productCode: values.productCode,
        productName: values.productName,
        categoryId: Number(values.categoryId),
        collectionIdList: [
          1, 2
        ]
      }
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
        dispatch(createProduct(productData));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/product-list");
          dispatch(resetUploadState());
          dispatch(resetState());
        }, 1000);
      }
    },
  });

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
          {/* <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              value={formik.values.tags}
              className="form-select"
              id=""
            >
              <option value="" disabled>
                Select Tag
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
          </div> */}
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
          <div className="form-group">
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
      </div>
    </div>
  );
};

export default Addproduct;
