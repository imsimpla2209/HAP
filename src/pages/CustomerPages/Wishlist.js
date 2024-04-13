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

  const wishlistState = useSelector((state) => state?.auth?.wishlist);

  const wishlistProducts = wishlistState ? wishlistState.map(item => item.product) : [];

  const removeFromWishList = (id) => {
    dispatch(removeFromWishlist(id));
    setTimeout(() => {
      getProductWish();
    }, 300);
  };

  return (
    <>
      <Meta title={"Danh sách yêu thích"} />
      <BreadCrumb title="Danh sách yêu thích" />
      <div className="compare-wishlist-wrapper py-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row ">
            {wishlistState && wishlistState.map((item, index) => (
              <div className="col-3 mb-3" key={index}>
                <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    onClick={() => {
                      removeFromWishList(item.wishlistItemId);
                    }}
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      width={400}
                      height={400}
                      className="img-fluid mx-auto"
                      src={item.product?.images?.[0]?.url}
                    />
                  </div>
                  <div className="wishlist-details">
                    <h5 className="title">{item.product?.productName}</h5>
                    <h6 className="price mb-3 mt-3">$ {item.product?.price}</h6>
                    <div className="wishlist-detail">
                      <div className="availability">
                        <h5>Availability:</h5>
                        <p>In Stock</p>
                      </div>
                      <Link className="button" to={"/product/" + item.product.productId}>
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
