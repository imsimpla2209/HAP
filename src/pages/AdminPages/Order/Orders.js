/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../../../features/auth/authSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config3 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(config3));
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const [selectedStatus, setSelectedStatus] = useState({});
  const updateOrder = (orderId, selectedStatus) => {
    let isDeliveredValue = false;

    if (selectedStatus === "Delivered") {
      isDeliveredValue = true;
    }
    dispatch(
      updateOrderStatus({
        id: orderId,
        status: selectedStatus,
        isDelivered: isDeliveredValue,
      })
    );
  };
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    const currentStatus = orderState[i]?.orderStatus;

    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]._id}`}>View Orders</Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) => {
              setSelectedStatus((prev) => ({
                ...prev,
                [orderState[i]?._id]: e.target.value,
              }));
              updateOrder(orderState[i]?._id, e.target.value);
            }}
            className="form-control form-select"
            disabled={currentStatus === 'Delivered' || currentStatus === 'Cancelled'}
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>

          </select>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders List</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};
export default Order;
