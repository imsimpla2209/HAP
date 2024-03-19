/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import ProductCard from "../../components/ProductCard";
import ReactStars from "react-stars";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import ReactImageZoom from "react-image-zoom";
import ReactImageMagnify from "react-image-magnify";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getProduct,
} from "../../features/customer/products/productSlice";
import {
  addProdToCart,
  getUserCart,
} from "../../features/customer/user/authSlice";
import { toast } from "react-toastify";
import { getBrands } from "../../features/customer/brand/brandSlice";
import { getCategorys } from "../../features/customer/category/categorySlice";
import { getModels } from "features/models/modelsSlice";

const SingleProduct = () => {
  const [orderProduct, setorderedProduct] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAddCart, setAlreadyAddCart] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const productState = useSelector((state) => state?.product?.singleproduct);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);
  const userState = useSelector((state) => state?.auth.user);
  const fullname = userState?.firstname + " " + userState?.lastname;
  const modelState = useSelector((state) => state.models.models);

  useEffect(() => {
    getAProduct(getProductId);
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAddCart(true);
      }
    }
  });
  console.log(getProductId);
  const getAProduct = () => {
    dispatch(getProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getModels(getProductId));
  };

  console.log(modelState);

  const uploadCart = () => {
    dispatch(
      addProdToCart({
        productId: productState?._id,
        quantity,
        price: productState?.price,
      })
    );
    setTimeout(() => {
      getAProduct();
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
        dispatch(getProduct(getProductId));
      }, 100);
    }
    return false;
  };

  useEffect(() => {
    setCurrentImage(productState?.images[0]?.url || "");
  }, [productState]);
  console.log(currentImage);

  console.log(productState?.images[0]?.url);

  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url || productState?.images[1]?.url || "",
  };

  return (
    <>
      <Meta title={"Dynamic Product Name"} />
      <BreadCrumb title={productState?.title} />
      <div className="main-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div
                  className="main-product-image-main"
                  style={{
                    width: "500px",
                    height: "500px",
                    position: "relative",
                    zIndex: 1, // Set the z-index to make sure it's above other elements
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
                <div>
                  {productState &&
                    productState?.images.map((item, index) => {
                      return (
                        <img
                          src={item?.url}
                          className="img-fluid"
                          alt=""
                          onClick={() => setCurrentImage(item?.url)}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-6">
              {modelState.map((model) => (
                <button
                  key={model.modelId}
                  onClick={() => setSelectedModelId(model.modelId)}
                >
                  View Model {model.modelId} Details
                </button>
              ))}
              {selectedModelId && (
                <div>
                  <h2>Details of Model {selectedModelId}</h2>
                  {/* Render the details based on the selected modelId */}
                  {modelState
                    .filter((model) => model.modelId === selectedModelId)
                    .map((model) => (
                      <div key={model.modelId} className="main-product-details">
                        <div className="border-bottom">
                          <h3 className="title">{productState?.title}</h3>
                        </div>
                        <div className="border-bottom py-3">
                          <p className="price"> $ {productState?.price}</p>
                          <div className="d-flex align-items-ceter gap-10">
                            <ReactStars
                              count={5}
                              size={24}
                              value={productState?.totalrating?.toString()}
                              edit={false}
                              activeColor="#ffd700"
                            />
                            {/* <p className="mb-0 t-review">(2 Reviews)</p> */}
                          </div>
                          <a className="review-btn" href="#review">
                            Write a Review
                          </a>
                        </div>
                        <div className="border-bottom py-3">
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading">Brand: </h3>
                            <p class="product-data">{model.primaryPrice}</p>
                          </div>
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading">Category: </h3>
                            {/* <p class="product-data">{categoryTitle}</p> */}
                          </div>
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading">Tags: </h3>
                            <p class="product-data">{productState?.tags}</p>
                          </div>
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading">Quantity: </h3>
                            <p class="product-data">{productState?.quantity}</p>
                          </div>
                          <div className="d-flex gap-10 align-items-center my-2 mb-3">
                            <h3 className="product-heading">Available: </h3>
                            {productState?.quantity > 0 ? (
                              <p class="product-data">In Stock</p>
                            ) : (
                              <p class="product-data">Out of Stock</p>
                            )}
                          </div>
                          <div className="d-flex gap-15 align-items-center flex-row my-2 mb-3">
                            {alreadyAddCart === false &&
                              productState?.quantity > 0 && (
                                <>
                                  <h3 className="product-heading">
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
                                alreadyAddCart || productState?.quantity === 0
                                  ? "mb-0"
                                  : "d-flex align-item-center gap-15 ms-2"
                              }
                            >
                              {productState?.quantity > 0 && (
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
                                    ? "Go to cart"
                                    : "Add to cart"}
                                </button>
                              )}
                              {productState?.quantity === 0 && (
                                <a className="button border-0" type="button">
                                  This product is not available
                                </a>
                              )}
                            </div>
                          </div>
                          {/* <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="">
                        <AiOutlineHeart className="fs-5 me-2" />
                        Add to WishList
                      </a>
                    </div>
                  </div> */}
                          <div className="d-flex gap-10 flex-column my-3">
                            <h3 className="product-heading">
                              Shipping & Returns:
                            </h3>
                            <p class="product-data">
                              Free Shipping and returns available on all orders!
                            </p>
                          </div>
                          {/* <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Copy Product Link </h3>
                    <p class="product-data">
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          copyToClipboard(
                            "https://thelightmusic.net/wp-content/uploads/2020/04/267896bf64449d1ac455_49268178378_o.jpg"
                          );
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
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Reviews</h4>
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
                  <h4 className="mb-2">Write A Review</h4>
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
                      placeholder="Comments"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={addRatingToProduct}
                      className="button border-0"
                      type="submit"
                    >
                      Submit Review
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
