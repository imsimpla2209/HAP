// @ts-nocheck
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishList } from "../../features/customer/user/authSlice";
import { removeFromWishlist } from "../../features/customer/products/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProductWish();
  }, []);

  const getProductWish = () => {
    dispatch(getUserProductWishList());
  };

  const wishlistState = useSelector(
    (state) => state?.auth?.wishlist?.findUser?.wishlist
  );
  const removeFromWishList = (id) => {
    dispatch(removeFromWishlist(id));
    setTimeout(() => {
      getProductWish();
    }, 300);
  };
  console.log(getProductWish);
  console.log(wishlistState);

  return (
    <>
      <Meta title={"Wish List"} />
      <BreadCrumb title="Wish List" />
      <div className="compare-wishlist-wrapper py-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row ">
            {wishlistState &&
              wishlistState?.map((item, index) => {
                return (
                  <div className="col-3 mb-3" key={index}>
                    <div className="wishlist-card position-relative">
                      <img
                        src="images/cross.svg"
                        alt="cross"
                        onClick={(id) => {
                          removeFromWishList(item?._id);
                        }}
                        className="position-absolute cross img-fluid"
                      />
                      <div className="wishlist-card-image">
                        <img
                          width={400}
                          height={400}
                          className="img-fluid mx-auto"
                          src={item?.images?.[0]?.url}
                        />
                      </div>
                      <div className="wishlist-details">
                        <h5 className="title">
                          {item?.title.substr(0, 30) + "..."}
                        </h5>
                        <h6 className="price mb-3 mt-3">$ {item?.price}</h6>
                        <div className="wishlist-detail">
                          <div className="availability">
                            <h5>Availability:</h5>
                            <p>In Stock</p>
                          </div>
                          <Link className="button" to={"/product/" + item?._id}>
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
