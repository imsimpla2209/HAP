import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
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

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brands: yup.string().required("Brand is Required"),
  pcategories: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categorys);
  const imgProductState = useSelector((state) => state.product.productImages);
  const imgState = useSelector((state) => state.upload.images);
  const [images, setImages] = useState([]);

  const productState = useSelector((state) => state.product);
  const {
    productName,
    productDesc,
    productCategory,
    productPrice,
    productTag,
    productBrand,
    productImages,
    productQuantity,
  } = productState;

  console.log(productCategory);
  console.log(productBrand);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategorys());
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
      title: productName || "",
      description: productDesc || "",
      price: productPrice || "",
      brands: productBrand || "",
      pcategories: productCategory || "",
      quantity: productQuantity || "",
      tags: productTag || "",
      images: productImages || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = {
          id: getProductId,
          productData: values,
        };
        dispatch(updateProduct(data));
        setTimeout(() => {
          navigate("/admin/product-list");
          dispatch(resetUploadState());
          dispatch(resetState());
        }, 300);
      } else {
        dispatch(createProduct(values));
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
      <h3 className="title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="title">Product Title</label>
            <CustomInput
              type="text"
              id="title"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
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
            <label htmlFor="price">Product Price</label>
            <CustomInput
              type="number"
              name="price"
              onCh={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price.toString()}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="brands">Brand</label>
            <select
              id="brands"
              name="brands"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brands}
              className="form-select"
            >
              <option value="">Select Brand</option>
              {brandState.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            {formik.touched.brands && formik.errors.brands && (
              <div className="error">{formik.errors.brands}</div>
            )}
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label htmlFor="pcategories">Category</label>
            <select
              id="pcategories"
              name="pcategories"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pcategories}
              className="form-select"
            >
              <option value="">Select Category</option>
              {categoryState.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formik.touched.pcategories && formik.errors.pcategories && (
              <div className="error">{formik.errors.pcategories}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Product Quantity</label>
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
                        Drag 'n' drop some files here, or click to select files
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

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
