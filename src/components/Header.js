/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUserCart, logout } from "../features/customer/user/authSlice";
import { getProduct } from "../features/customer/products/productSlice";

const Header = ({ history }) => {
  // Get the history object from React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [paginate, setPaginate] = useState(true);
  const [total, setTotal] = useState(null);
  const [productOpt, setProductOpt] = useState([]);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.product);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity * Number(cartState[index].price));
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    dispatch(getUserCart());
  };

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    // localStorage.clear();
    // window.location.reload();
    dispatch(logout());
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Copyright © 2021. All rights reserved.
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                HotLine:
                <a className="test-white" href="tel: 0345532150">
                  {" "}
                  0345532150
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">
                  Hien Shop
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  labelKey={"name"}
                  minLength={2}
                  paginate={paginate}
                  placeholder="Search for Products here..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-8" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  {/* <Link
                    to="compareproduct"
                    className="d-flex align-items-center gap-10"
                  >
                    <img src="images\compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Product
                    </p>
                  </Link> */}
                </div>
                <div>
                  <Link
                    to="wishlist"
                    className="d-flex align-items-center gap-10"
                  >
                    <img src="images\wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/profile"}
                    className="d-flex align-items-center gap-10"
                  >
                    <img src="images\user.svg" alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Login <br /> MyAccount
                      </p>
                    ) : (
                      <p className="mb-0">
                        Welcome {authState?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>

                <div>
                  <Link to="cart" className="d-flex align-items-center gap-10">
                    <img src="images\cart.svg" alt="cart" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">$ {total ? total : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="col-sm-10">
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-15">
                      <NavLink to="/">Home</NavLink>
                      <NavLink to="/product">Our Store</NavLink>
                      <NavLink to="/blogs">Blogs</NavLink>
                      <NavLink to="/contact">Contact</NavLink>
                      {authState?.user === null ? (
                        <p className="mb-0"></p>
                      ) : (
                        <NavLink to="/my-orders">My Order</NavLink>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col px-md-5">
                  <div className="menu-links">
                    {authState?.user === null ? (
                      <p className="mb-0"></p>
                    ) : (
                      <button
                        onClick={handleLogout}
                        className="border border-0 bg-transparent text-white text-uppercase justify-content-end"
                        type="button"
                      >
                        Log Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </header>
    </>
  );
};

export default Header;
