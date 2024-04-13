/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  getOrderDetail,
  updateOrderStatus,
} from "../../features/customer/user/authSlice";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = useState([]);
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.getSingleOrdered);
  const handleCancelOrder = () => {
    if (
      orderState?.orderStatus !== "Cancelled" &&
      orderState?.orderStatus !== "Delivered"
    ) {
      setIsConfirmModalOpen(true);
    }
  };

  const confirmCancelOrder = async () => {
    const orderId = orderState?._id;
    const selectedStatus = "Cancelled";
    await dispatch(
      updateOrderStatus({
        id: orderId,
        status: selectedStatus,
      })
    );
    setIsCancelClicked(true);
    setIsConfirmModalOpen(false);
    dispatch(getOrder(orderId));
  };
  const displayDiscount =
    orderState?.totalPrice - orderState?.totalPriceAfterDiscount === -5
      ? 0
      : orderState?.totalPrice - orderState?.totalPriceAfterDiscount;

  return (
    <>
      <BreadCrumb title="Chi tiết đơn hàng" />
      <Container class="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div class="col-rg-12 mb-5">
            <div class="d-flex justify-content-between mt-md-5">
              <span> Order Details #{orderState?._id}</span>
              <span>
                Created At: {new Date(orderState?.createdAt).toLocaleString()}{" "}
              </span>
            </div>
            <div class="d-flex justify-content-between mt-md-3">
              <span class="d-flex gap-2">
                {" "}
                <span> Order Status: </span>
                <span class="text-primary fw-bold">
                  <span class="flex-center text-success">
                    {orderState?.orderStatus}
                  </span>
                </span>
              </span>
            </div>
            <div class="d-flex gap-5 mt-3 ">
              <span>
                {" "}
                Payment Status:{" "}
                <span class="text-danger">
                  {orderState?.isPaid ? "Complete" : "Refund"}
                </span>
              </span>
            </div>
            <div class="d-flex justify-content-between  gap-3 mt-3">
              <span>
                <div class="row">
                  <div class="col-12">
                    <span>SHIPPING ADDRESS</span>
                    <div class="border px-2 py-2 h-75 d-flex flex-column gap-1 pb-3 fw-light text-size-16">
                      <span>
                        Address: {orderState?.shippingInfo?.address},{" "}
                        {orderState?.shippingInfo?.city},{" "}
                        {orderState?.shippingInfo?.country}
                      </span>
                      <span>Phone: {orderState?.shippingInfo?.mobile}</span>
                    </div>
                  </div>
                </div>
              </span>
              <span>
                <div class="row">
                  <div
                    class="button"
                    onClick={handleCancelOrder}
                    disabled={
                      isCancelClicked ||
                      orderState?.isDelivered ||
                      orderState?.orderStatus === "Cancelled"
                    }
                  >
                    {orderState?.orderStatus === "Cancelled"
                      ? "Order Cancelled"
                      : orderState?.isDelivered
                        ? "Cannot Cancel Delivered Order"
                        : "Cancel Order"}
                  </div>
                </div>
              </span>
            </div>
            <div class="table-order-detail">
              <table class="m-0 table table-sm">
                <thead>
                  <tr class="text-center">
                    <th class="w-10 text-start align-middle">Product</th>
                    <th class="w-15   align-middle">Unit Price</th>
                    <th class="  align-middle">Quantity</th>
                    <th class="w-20  align-middle">Total</th>
                  </tr>
                </thead>
                <tbody class=" position-relative">
                  {orderState?.orderItems.map((item, index) => {
                    return (
                      <tr class="" key={index}>
                        <td class="cursor w-50 py-3">
                          <div>
                            <div class="row">
                              <div class="col-2">
                                <img
                                  src={item?.product?.images[0]?.url}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div class="d-flex flex-column align-content-center mt-2 col-10">
                                <div>{item?.product.title}</div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center p-2">
                          {item?.price} $
                        </td>
                        <td class="align-middle text-center p-2 ">
                          {item?.quantity}
                        </td>
                        <td class="align-middle text-center p-2">
                          {item?.price * item?.quantity} $
                        </td>
                      </tr>
                    );
                  })}
                  <tr class="">
                    <td class="cursor w-50 py-3"></td>
                    <td class="align-middle text-center p-2">
                      <div class="d-flex flex-column gap-3 text-end text-size-15 fw-light">
                        <span>Discount </span>
                        <span>Shipping Fee </span>
                        <span>Total Amount </span>
                      </div>
                    </td>
                    <td class="align-middle text-end p-2 " colspan="2">
                      <div class="d-flex flex-column gap-3">
                        <span>{displayDiscount}$</span>
                        <span>5$ (Home Delivery)</span>
                        <span class="text-danger text-size-20 fw-bold">
                          {orderState?.totalPriceAfterDiscount}$
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
      <div
        class={`modal fade${isConfirmModalOpen ? " show" : ""}`}
        style={{ display: isConfirmModalOpen ? "block" : "none" }}
      >
        <div class="modal-dialog modal-confirm">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title align-content-center">Are you sure?</h4>
              <button
                type="button"
                class="close"
                onClick={() => setIsConfirmModalOpen(false)}
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>
                Do you really want to cancel this order? This process cannot be
                undone.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-info"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={confirmCancelOrder}
              >
                Confirm cancel order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
