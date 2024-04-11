/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-stars";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";

import Color from "components/Color";
import { getModels } from "features/models/modelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addRating,
  getProduct,
} from "../../features/customer/products/productSlice";
import {
  addProdToCart,
  getUserCart,
} from "../../features/customer/user/authSlice";
import { getACollection } from "features/collections/collectionsSlice";
import productService from "features/product/productService";
import SingleCollectionProducts from "./SingleCollectionProducts";
import { Divider } from "antd";
import ScrollToTopOnMount from "components/ScrollToTopOnMount";

const SingleCollection = () => {
  const [quantity, setQuantity] = useState(1);
  const [alreadyAddCart, setAlreadyAddCart] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const location = useLocation();
  const getCollectionId = location.pathname.split("/")[2];
  const collectionState = useSelector((state) => state?.collections?.singleCollection);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);
  const userState = useSelector((state) => state?.auth.user);
  const fullname = userState?.firstname + " " + userState?.lastname;
  const modelState = useSelector((state) => state.models.models);
  const [products, setProducts] = useState([]);
  const [selectedModelColor, setSelectedModelColor] = useState("");

  useEffect(() => {
    const selectedModel = modelState.find(
      (model) => model.modelId === selectedModelId
    );
    if (selectedModel) {
      setSelectedModelColor(selectedModel.color.image);
    }
  }, [selectedModelId]);

  useEffect(() => {
    if (modelState.length > 0) {
      setSelectedModelId(modelState[0]?.modelId);
    }
  }, [modelState]);

  const handleColorClick = (selectedModelId) => {
    setSelectedModelId(selectedModelId);
  };

  useEffect(() => {
    getAProduct(getCollectionId);
  }, []);

  useEffect(() => {
    (async () => {
      const products = await productService.getProducts(0);
      console.log(products, getCollectionId);
      const belongedProducts = products?.filter(
        p => !!p?.collection?.find(p => p?.collectionId === Number(getCollectionId))
      )
      setProducts(belongedProducts);
    })()
  }, [getCollectionId]);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getCollectionId === cartState[index]?.productId?._id) {
        setAlreadyAddCart(true);
      }
    }
  });

  const getAProduct = () => {
    dispatch(getACollection(getCollectionId));
  };

  useEffect(() => {
    const selectedModel = modelState.find(
      (model) => model.modelId === selectedModelId
    );
    if (collectionState) {
      setCurrentImage(collectionState?.thumbnail || "");
    }
  }, [selectedModelId]);

  return (
    <>
      <ScrollToTopOnMount />
      <Meta title={"Bộ Sản Phẩm"} />
      <BreadCrumb title={"Bộ Sản Phẩm / " + collectionState?.collectionName} />
      <div className="main-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <h4 style={{ color: "#1597E5", fontWeight: "bold" }}>{collectionState?.collectionName}</h4>
            <div className="col-6">
              <div className="main-product-image">
                <div
                  className="main-product-image-main"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        isFluidWidth: true,
                        width: 1040,
                        height: 1062,
                        src: currentImage,
                      },
                      largeImage: {
                        src: currentImage,
                        width: 936,
                        height: 1100,
                      },
                      lensStyle: { backgroundColor: "rgba(0,0,0,.2)" },
                    }}
                  />
                </div>
              </div>
              <h6 className="mt-4">Hình ảnh</h6>
              <div className="other-product-images gap-30">
                <img
                  key={'ABC'}
                  src={collectionState?.thumbnail}
                  className="img-fluid"
                  alt=""
                  onClick={() => {
                    setCurrentImage(collectionState?.thumbnail);
                  }}
                />
                {products.map((model) =>
                  model.image.map((attachment, index) => (
                    <img
                      key={index}
                      src={attachment.path}
                      className="img-fluid"
                      alt=""
                      onClick={() => {
                        setCurrentImage(attachment.path);
                        setSelectedModelId(model.modelId);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="col-6 main-product-details">
              <h5>Các sản phẩm thuộc {collectionState?.collectionName}</h5>
              <hr />
              {products?.length ? <SingleCollectionProducts data={products} /> : <h5>Bộ Sản Phẩm Trống</h5>}
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-̀5 home-wrapper-2">
        <div className="container-xxl">
          <div class="row">
            <div className="col-12 mb-5">
              <h4>Mô tả</h4>
              <div className="bg-white p-3">
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: collectionState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCollection;
