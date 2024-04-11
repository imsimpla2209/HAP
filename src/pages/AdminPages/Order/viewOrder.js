/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrder } from "../../../features/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder);
  const displayDiscount =
    orderState?.totalPrice - orderState?.totalPriceAfterDiscount === -5
      ? 0
      : orderState?.totalPrice - orderState?.totalPriceAfterDiscount;

  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Đơn Hnagf</h3>

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
                        <div class="d-flex flex-column align-content-center mt-2 col-10">
                          <div>{item?.product.title}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle text-center p-2">{item?.price} $</td>
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
                  <span>Total Amount</span>
                  <span>Discount </span>
                  <span>Shipping Fee </span>
                  <span>Total Amount After Discount</span>
                </div>
              </td>
              <td class="align-middle text-end p-2 " colspan="2">
                <div class="d-flex flex-column gap-3">
                  <span>{orderState?.totalPrice}</span>
                  <span>
                    <span>{displayDiscount}</span>
                    {/* {orderState?.totalPrice -
                      orderState?.totalPriceAfterDiscount} */}
                  </span>
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
  );
};

export default ViewOrder;
