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
  getAProduct, resetState,
} from "../../features/product/productSlice";
import {
  addRating,
} from "../../features/customer/products/productSlice";
import {
  addProdToCart,
  getUserCart,
} from "../../features/customer/user/authSlice";
import { Button, Divider, Radio } from "antd";
import { formatCurrencyVND } from "utils/formator";
import { AiOutlineHeart } from "react-icons/ai";
import { Tab } from "components/Tabs/Tabs";
import { paymentInfo } from "./constant";

const SingleProduct = () => {
  const [orderProduct, setorderedProduct] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAddCart, setAlreadyAddCart] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const productState = useSelector((state) => state?.product?.singleProduct);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);
  const userState = useSelector((state) => state?.auth.user);
  const fullname = userState?.firstname + " " + userState?.lastname;
  const modelState = useSelector((state) => state.models.models);

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
    getProduct();
    return () => {
      dispatch(resetState());
    }
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAddCart(true);
      }
    }
  });
  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  };

  const colorState = selectedModelColor;
  const rgbColor = hexToRgb(colorState);

  const getProduct = () => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getModels(getProductId));
  };

  const uploadCart = () => {
    dispatch(
      addProdToCart({
        modelId: selectedModelId,
        quantity,
      })
    );
    setTimeout(() => {
      getProduct();
    }, 200);
  };

  const addRatingToProduct = () => {
    if (!userState) {
      navigate("/login");
      return;
    }
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product");
      return false;
    } else {
      dispatch(
        addRating({
          star: star,
          comment: comment,
          prodId: getProductId,
          fullname: fullname,
        })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  useEffect(() => {
    const selectedModel = modelState.find(
      (model) => model.modelId === selectedModelId
    );
    if (selectedModel) {
      setCurrentImage(selectedModel.attachments[0]?.path || "");
    }
  }, [selectedModelId]);

  console.log(currentImage);

  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img:
      modelState[0]?.attachments[0]?.path ||
      modelState[0]?.attachments[1]?.path ||
      "",
  };

  const data = [
    {
      id: '1',
      tabTitle: "Mô tả",
      tabContent: modelState
        ?.find((model) => model?.modelId === selectedModelId)?.description || "",
      type: "html"
    },
    {
      id: '2',
      tabTitle: "Thông số kỹ thuật",
      tabContent: modelState
        ?.find((model) => model?.modelId === selectedModelId)?.specification || "",
      type: "html"
    },
    {
      id: '3',
      tabTitle: "Thống tin thanh toán",
      tabContent: paymentInfo,
      type: "html"
    }
  ]

  return (
    <>
      <Meta title={"Chi tiết sản phẩm"} />
      <BreadCrumb title={productState?.productName} />
      <div className="main-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div
                  className="main-product-image-main"
                  style={{
                    // width: "500px",
                    // height: "500px",
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
                  {/* <ReactImageZoom {...props} /> */}
                </div>
              </div>
              <div className="other-product-images gap-30">
                {modelState.map((model) =>
                  model.attachments.map((attachment, index) => (
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
            <div className="col-6">
              {selectedModelId && (
                <div>
                  {modelState
                    .filter((model) => model.modelId === selectedModelId)
                    .map((model) => (
                      <div key={model.modelId} className="main-product-details">
                        <div className="border-bottom">
                          <h3 className="title">{productState?.productName}</h3>
                        </div>
                        <div className="border-bottom py-3">
                          <div className="d-flex align-items-end gap-10">
                            <div className="d-flex align-items-unset gap-2">
                              <p className={`text-decoration-underline mb-0 ${productState?.voteStar ? '' : 'text-muted'}`}>
                                {productState?.voteStar ? productState?.voteStar?.toString() : 'Chưa có đánh giá'}
                              </p>
                              {productState?.voteStar ? <ReactStars
                                count={5}
                                size={16}
                                value={productState?.voteStar?.toString()}
                                edit={false}
                                activeColor="#ffd700"
                              /> : null}
                            </div>
                            <Divider type="vertical" className="mb-1" />
                            <div className="d-flex align-items-unset gap-2">
                              <p className={`text-decoration mb-0`}>
                                {productState?.sold}
                              </p>
                              <p className="text-muted mb-0">
                                Đã Bán
                              </p>
                            </div>
                            <Divider type="vertical" className="mb-1" />

                            <a className="review-btn" href="#review">
                              Viết Bình Luận
                            </a>
                            {/* <p className="mb-0 t-review">(2 Reviews)</p> */}
                          </div>
                        </div>
                        <div className=" py-2 mt-2 mb-4" style={{ backgroundColor: "#f9f9f9" }}>
                          <p className="price mb-0 fw-bold mx-2" style={{
                            fontSize: "26px",
                            color: "#e65e51"

                          }}> {formatCurrencyVND(model?.primaryPrice || 0)}</p>
                        </div>


                        <div className="border-bottom py-3">
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading text-muted ">Màu Sắc: </h3>
                            <Color
                              models={modelState}
                              handleColorClick={handleColorClick}
                            />
                          </div>
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading text-muted">Mẫu: </h3>
                            <Radio.Group onChange={(e) => setSelectedModelId(e.target.value)} defaultValue={selectedModelId}>
                              {
                                modelState?.map((model, index) =>
                                  <Radio.Button value={model.modelId} key={model.modelId}>
                                    {model?.modelName || `Mẫu ${index + 1}`}</Radio.Button>
                                )
                              }
                            </Radio.Group>

                          </div>
                          <div className="d-flex gap-10 align-items-baseline my-2 mb-3">
                            <h3 className="product-heading text-muted">Số Lượng: </h3>
                            <h3 className="product-data">
                              {model?.available || 0}
                            </h3>
                          </div>
                          <div className="d-flex gap-10 align-items-baseline my-2 mb-3">
                            <h3 className="product-heading text-muted">Tình Trạng Kho: </h3>
                            {model?.available > 0 ? (
                              <h3 className="product-data">Có sẵn</h3>
                            ) : (
                              <h3 className="product-data">Hết hàng</h3>
                            )}
                          </div>
                          <div className="d-flex gap-15 align-items-center flex-row my-2 mb-3">
                            {alreadyAddCart === false &&
                              model?.available > 0 && (
                                <>
                                  <h3 className="product-heading text-muted">
                                    Quantity:{" "}
                                  </h3>
                                  <div>
                                    <input
                                      type="number"
                                      name=""
                                      min={1}
                                      max={Math.min(productState?.quantity, 5)}
                                      className="form-control"
                                      style={{ width: "60px", height: "35px" }}
                                      onChange={(e) =>
                                        setQuantity(e.target.value)
                                      }
                                      value={quantity}
                                    />
                                  </div>
                                </>
                              )}

                            <div
                              className={
                                alreadyAddCart || model?.available === 0
                                  ? "mb-0"
                                  : "d-flex align-item-center gap-15 ms-2"
                              }
                            >
                              {model?.available > 0 && (
                                <button
                                  className="button border-0"
                                  type="button"
                                  onClick={() => {
                                    alreadyAddCart
                                      ? navigate("/cart")
                                      : uploadCart();
                                  }}
                                >
                                  {alreadyAddCart
                                    ? "Đến rỏ hàng"
                                    : "Thêm vào rỏ hàng"}
                                </button>
                              )}
                              {model?.available === 0 && (
                                <a className="button border-0" type="button" disabled>
                                  Mẫu này đã hết hàng
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-15">
                            <div>
                              <a href="">
                                <AiOutlineHeart className="fs-5 me-2" />
                                Yêu thích
                              </a>
                            </div>
                          </div>
                          <div className="d-flex gap-10 flex-column my-3">
                            <h3 className="product-heading text-muted">
                              Vận Chuyển & Hoàn Trả:
                            </h3>
                            <p class="product-data">
                              Free Shipping and returns available on all orders!
                            </p>
                          </div>
                          {/* <div className="d-flex gap-10 align-items-center my-3">
                            <h3 className="product-heading text-muted">Copy Product Link </h3>
                            <p class="product-data">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {

                                }}
                              >
                                Copy Product Link
                              </a>
                            </p>
                          </div> */}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-̀5 home-wrapper-2">
        <div className="container-xxl">
          <div class="row">
            <div className="col-12">
              <h4>Thông tin</h4>
              <div className="bg-white p-3">
                <Tab data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Đánh giá</h4>
              <div className="review-inner-wrapper">
                {/* <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                  <div>
                    {orderProduct && (
                      <div>
                        <a
                          className="text-dark text-decoration-underline"
                          href="/"
                        >
                          Write a review
                        </a>
                      </div>
                    )}
                  </div>
                </div> */}
                <div id="review" className="review-form py-4">
                  <h4 className="mb-2">Viết Đánh Giá</h4>
                  <div className="">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e);
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      row="10"
                      placeholder="Nhận xét"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      onClick={addRatingToProduct}
                      className="button border-0"
                      type="submit"
                    >
                      Đăng tải
                    </button>
                  </div>
                </div>
                <div className="reviews mt-4">
                  {productState &&
                    productState?.ratings?.map((item, index) => {
                      return (
                        <div key={index} className="review">
                          <div className="d-flex gap-10 align-items-center">
                            <h6 className="mb-0">({item?.fullname})</h6>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mt-3">{item?.comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
