/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/customer/products/productSlice";
import { getUserProductWishList } from "../features/customer/user/authSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const [already, setalready] = useState([]);
  useEffect(() => {
    getProductWish();
  }, []);

  const getProductWish = () => {
    dispatch(getUserProductWishList());
  };
  const wishlistState = useSelector(
    (state) => state?.auth?.wishlist?.findUser?.wishlist
  );
  useEffect(() => {
    setalready(wishlistState?.map((item) => item.productId));
  }, [wishlistState]);

  const addToWish = (id) => {
    if (already.includes(id)) {
      dispatch(removeFromWishlist(id));
      setTimeout(() => {
        dispatch(getUserProductWishList());
      }, 100);
    } else {
      dispatch(addToWishlist(id));
      setTimeout(() => {
        dispatch(getUserProductWishList());
      }, 100);
    }

    // If the product is not in the wishlist, add it
  };
  console.log(wishlistState);
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              className={`${location.pathname === "/product" ? `gr-${grid}` : "col-md-3 col-12"
                }`}
            >
              <Link className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button
                    className="border-0 bg-transparent"
                    onClick={(e) => {
                      addToWish(item?.productId);
                    }}
                  >
                    <img src="images/wish.svg" alt="wishlist" />
                  </button>
                </div>
                {/* <div className="container"> */}
                <Link to={"/product/" + item?.productId} className="product-card position-relative">
                  <div className="product-image">
                    {item?.image?.length > 0 && (
                      <>
                        <img
                          width={400}
                          height={400}
                          src={item?.image?.[0]?.path}
                          className="img-fluid mx-auto"
                          alt="product-image"
                        />
                        {item?.image?.length > 1 && (
                          <img
                            width={400}
                            height={400}
                            src={item?.image?.[1]?.path}
                            className="img-fluid mx-auto"
                            alt="product image"
                          />
                        )}
                        {item?.image?.length === 1 && (
                          <img
                            width={400}
                            height={400}
                            src={item?.image?.[0]?.path}
                            className="img-fluid mx-auto"
                            alt="product image"
                          />
                        )}
                      </>
                    )}
                  </div>
                </Link>

                {/* </div> */}

                <div className="product-details">
                  <h6 className="brand">{item?.category.categoryName}</h6>
                  <h5 className="product-title">{item?.productName}</h5>
                  <ReactStars
                    count={5}
                    size={20}
                    value={item?.voteStar?.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    className={`description ${grid === 12 ? "d-block" : "d-none"
                      }`}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    {/* <Link className="border-0 bg-transparent">
                      <img src="images/prodcompare.svg" alt="compare" />
                    </Link> */}
                    <Link
                      to={"/product/" + item?.productId}
                      className="border-0 bg-transparent"
                    >
                      <img src="images/view.svg" alt="view" />
                    </Link>
                    {/* <Link className="border-0 bg-transparent">
                      <img src="images/add-cart.svg" alt="add cart" />
                    </Link> */}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
