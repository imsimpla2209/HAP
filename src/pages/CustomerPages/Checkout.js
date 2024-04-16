/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";
import { object, string, number, date, InferType } from "yup";
import {
  createAnOrder,
  emptyUserCart,
  getAUser,
  resetState,
  updateUserProf,
} from "../../features/customer/user/authSlice";
import * as authService from "../../features/customer/user/authService";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Checkout = () => {
  const shippingSchema = object({
    firstname: string().required("First name is required"),
    lastname: string().required("Last name should be required"),
    address: string().required("Address is required"),
    city: string().required("City is required"),
    mobile: string()
      .required("Mobile phone is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
    country: string().required("Country is requird"),
    coupon: string(),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [payment, setPayment] = useState("later_money");
  const [sdkReady, setSdkReady] = useState(false);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalAmountDiscount, setTotalAmountDiscount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProduct, setCartProduct] = useState(null);
  const location = useLocation();
  const userState = useSelector((state) => state?.auth?.info?.getaUser);
  const getUsertId = location.pathname.split("/")[2];
  const totalAmountWithShipping = totalAmount !== null ? totalAmount + 5 : 5;
  const [couponError, setCouponError] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const base_url = "http://localhost:5000/api/";
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    dispatch(getAUser(getUsertId));
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        price: cartState[index].price,
      });
    }
    setCartProduct(items);
  }, []);

  useEffect(() => {
    if (!cartState || cartState.length === 0) {
      navigate("/product");
    }
  }, [cartState, navigate]);

  const handleFormDisabled = () => {
    setIsFormDisabled(true);
  };

  const handleReset = () => {
    formik.setValues({
      ...formik.values,
      firstname: "",
      lastname: "",
      mobile: "",
      country: "",
      city: "",
      address: "",
    });
    setIsFormDisabled(false);
    setShippingInfo(null);
  };
  // const applyCoupon = async () => {
  //   try {
  //     const coupon = formik.values.coupon;
  //     console.log("Coupon:", coupon);
  //     const response = await fetch(`${base_url}user/cart/apply-coupon`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...config.headers,
  //       },
  //       body: JSON.stringify({ coupon: coupon }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to apply coupon");
  //     }
  //     const totalAfterDiscount = await response.json();
  //     setTotalAmountDiscount(totalAfterDiscount);
  //     toast.info("Apply coupon code success");
  //   } catch (error) {
  //     setCouponError(toast.info("Invalid or expired coupon")); // Set error message
  //   }
  // };

  const applyCoupon = async () => {
    try {
      const coupon = formik.values.coupon;
      if (userState.usedCoupons && userState.usedCoupons.includes(coupon)) {
        throw new Error("Coupon has already been used by this user");
      }
      console.log(userState.usedCoupons.includes(coupon));
      const response = await fetch(`${base_url}user/cart/apply-coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: JSON.stringify({ coupon: coupon }),
      });

      if (!response.ok) {
        throw new Error("Invalid coupon or has used");
      }
      const couponData = await response.json();
      setAppliedCoupon(couponData.validCouponId);
      const totalAfterDiscount = couponData.totalAfterDiscount;
      setTotalAmountDiscount(totalAfterDiscount);
      toast.info("Apply coupon code success");
    } catch (error) {
      setCouponError(toast.info(error.message));
    }
  };

  const addPaypalScript = async () => {
    const { data } = await authService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname || "",
      lastname: userState?.lastname || "",
      mobile: userState?.mobile || "",
      address: userState?.address || "",
      country: userState?.country || "",
      city: userState?.city || "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      handleFormDisabled();
    },
  });
  console.log(shippingInfo);

  // const onSuccessPaypal = (details, data) => {

  //   dispatch(
  //     createAnOrder({
  //       totalPrice: totalAmount,
  //       totalPriceAfterDiscount:
  //         totalAmountDiscount !== null
  //           ? totalAmountDiscount
  //           : totalAmountWithShipping,
  //       orderItems: cartProduct,
  //       paymentMethod: payment,
  //       shippingInfo: shippingInfo,
  //       isPaid: true,
  //     })
  //   );
  //   if (appliedCoupon) {
  //     dispatch(
  //       getAUser({
  //         ...userState,
  //         usedCoupons: [...userState.usedCoupons, appliedCoupon],
  //       })
  //     );
  //   }
  //   setTimeout(() => {
  //     navigate("/my-orders");
  //     dispatch(emptyUserCart());
  //     dispatch(resetState());
  //   }, 300);
  // };
  const onSuccessPaypal = async (details, data) => {
    try {
      dispatch(
        createAnOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount:
            totalAmountDiscount !== null
              ? totalAmountDiscount
              : totalAmountWithShipping,
          orderItems: cartProduct,
          paymentMethod: payment,
          shippingInfo: shippingInfo,
          isPaid: true,
        })
      );
      if (appliedCoupon) {
        dispatch(
          updateUserProf({
            userId: getUsertId,
            usedCoupons: appliedCoupon,
          })
        );
      }
      setTimeout(() => {
        navigate("/my-orders");
        dispatch(emptyUserCart());
        dispatch(resetState());
      }, 300);
    } catch (error) {
      console.error("Error during PayPal success:", error);
      // Handle errors if necessary
    }
  };

  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Music Store</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/cart" className="text-dark">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active" arira-current="page">
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active" arira-current="page">
                      Shipping
                    </li>
                    &nbsp; /
                    <li className='breadcrumb-item active aria-current="page'>
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details">Hien (hdhien2002@gmail.com)</p>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-content-center">
                    <h4 className="mb-3">Shipping Address</h4>
                    <button
                      className="button"
                      type="button"
                      onClick={handleReset}
                    >
                      Reset shipping address
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="Vietnam">Viet nam</option>
                    </select>
                    <div className="errors ">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                      disabled={isFormDisabled}
                    />
                    <div className="errors ">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                      disabled={isFormDisabled}
                    />
                    <div className="errors">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                      disabled={isFormDisabled}
                    />
                    <div className="errors ">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      disabled={isFormDisabled}
                    />
                    <div className="errors ">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Mobile Phone"
                      className="form-control"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      disabled={isFormDisabled}
                    />
                    <div className="errors ">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Coupon"
                      className="form-control"
                      name="coupon"
                      onChange={formik.handleChange("coupon")}
                      onBlur={formik.handleBlur("coupon")}
                      value={formik.values.coupon}
                      disabled={isFormDisabled}
                    />
                  </div>
                  <div className="flex-grow-2">
                    <button
                      className="button"
                      type="button"
                      onClick={applyCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-content-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <button className="button" type="submit">
                        Apply information
                      </button>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((items, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative ">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="bagde bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {items?.quantity}
                            </span>
                            <img
                              src={items?.productId?.images[0]?.url}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div>
                            <h5 className="title">{items?.title}</h5>
                            <p></p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total-price">
                            $ {items?.price * items?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">SubTotal</p>
                  <p className="mb-0 total-price">
                    $ {totalAmount ? totalAmount : "0"}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 5</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Discount</p>
                  <p className="mb-0 total-price">
                    {totalAmountDiscount !== null && totalAmountDiscount > 0 ? (
                      <p className="mb-0 total-price">
                        ${" "}
                        {totalAmount ? totalAmount - totalAmountDiscount : "0"}
                      </p>
                    ) : null}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">
                  ${" "}
                  {totalAmountDiscount !== null && !isNaN(totalAmountDiscount)
                    ? (parseFloat(totalAmountDiscount) + 5).toFixed(2)
                    : totalAmountWithShipping.toFixed(2)}
                </h5>
              </div>
              {shippingInfo == null ? (
                shippingInfo == null
              ) : (
                <div style={{ width: "320px" }}>
                  <PayPalButton
                    className="button"
                    type="submit"
                    amount={
                      totalAmountDiscount !== null &&
                      !isNaN(totalAmountDiscount)
                        ? (parseFloat(totalAmountDiscount) + 5).toFixed(2)
                        : totalAmountWithShipping.toFixed(2)
                    }
                    onSuccess={onSuccessPaypal}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
