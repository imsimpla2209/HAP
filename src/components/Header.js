/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUserCart, logout } from "../features/customer/user/authSlice";
import { getProduct } from "../features/customer/products/productSlice";
import { CiHeart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { formatCurrencyVND } from "utils/formator";
import { TiShoppingCart } from "react-icons/ti";
import { Badge } from "react-rainbow-components";
import { Tooltip } from "antd";
import { FaPhoneAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const Header = ({ history }) => {
  // Get the history object from React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [paginate, setPaginate] = useState(true);
  const [total, setTotal] = useState(null);
  const [productOpt, setProductOpt] = useState([]);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.products);

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
      data.push({ id: index, prod: element?.productId, name: element?.productName });
    }
    setProductOpt(data);
    console.log(productState)
  }, [productState]);

  const handleLogout = () => {
    // localStorage.clear();
    // window.location.reload();
    dispatch(logout());
  };

  return (
    <>
      <header className="header-top-strip py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <a className="text-end text-white mb-0 link-light" href="tel: 0345532150">
                <FaPhoneAlt className="me-2 mb-1" />
                {" "}
                0345532150
              </a>
            </div>
            <div className="col-6 text-end align-items-end d-flex justify-content-end gap-3">
              <div className="menu-links">
                {authState?.user === null ? (
                  <p className="mb-0"></p>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="border border-0 bg-transparent text-white text-uppercase justify-content-end"
                    type="button"
                  >
                    <LuLogOut className="fs-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-1">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3">
              <h2>
                <Link className="mw-100 d-flex align-items-center gap-2" to="/">
                  <img src="images/logo.png" alt="logo" style={{ width: '70px', height: '70px' }} />
                  <p className=" mb-0 gradient-yellow-text" style={{ fontWeight: '500' }}>Hà An Phát</p>

                </Link>
              </h2>
            </div>

            <div className="col-3">
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
                  placeholder="Tìm kiếm sản phẩm tại đây..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-8" />
                </span>
              </div>
            </div>
            <div className="col-6">
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
                    className="d-flex align-items-center gap-10 nav-item"
                  >
                    <CiHeart className="fs-4 orange-text" />
                    <p className="mb-0">
                      Danh sách <br /> Yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/profile"}
                    className="d-flex align-items-center gap-10 nav-item"
                  >
                    <FaRegUser className="fs-4 orange-text" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Đăng nhập <br /> Tài khoản
                      </p>
                    ) : (
                      <p className="mb-0">
                        Chào mừng {authState?.user?.firstname}
                      </p>
                    )}
                  </Link>
                </div>

                <div>
                  <Badge showZero>
                    <Tooltip title="Rỏ hàng" color={"#c44135"} key={"#c44135"}>
                      <Link to="cart" className="d-flex align-items-center gap-10">
                        <TiShoppingCart className="fs-4 orange-text" />
                        <div className="d-flex flex-column">
                          <span className="badge bg-white text-dark mb-1">
                            {cartState?.length ? cartState?.length : 0}
                          </span>
                          <p className="mb-0">{formatCurrencyVND(total ? total : 0)}</p>
                        </div>
                      </Link>
                    </Tooltip>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="col-sm-10">
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-15">
                      <NavLink to="/">Trang chủ</NavLink>
                      <NavLink to="/product">Sản phẩm</NavLink>
                      <NavLink to="/blogs">Tin tức</NavLink>
                      <NavLink to="/contact">Liên hệ</NavLink>
                      {authState?.user === null ? (
                        <p className="mb-0"></p>
                      ) : (
                        <NavLink to="/my-orders">Lịch sử mua</NavLink>
                      )}
                    </div>
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
