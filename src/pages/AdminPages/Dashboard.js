/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
  logoutAuto,
} from "../../features/auth/authSlice";
import { getUsers } from "features/customers/customerSlice";
import { getEnquiries } from "features/admin/enquiry/enquirySlice";
import { getProducts } from "features/product/productSlice";
import { getBlog } from "features/customer/blogs/blogSlice";
import { getBlogs } from "features/blog/blogSlice";


const Dashboard = () => {
  const dispatch = useDispatch()
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders);
  const usersState = useSelector((state) => state.customer.users);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([])

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      Accept: "application/json",
    },
  };
  const enqState = useSelector((state) => state.enquiry.enquiries);
  const productstate = useSelector((state) => state.product.products);
  const blogState = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
    dispatch(getUsers());
    dispatch(getEnquiries());
    dispatch(getProducts(0));
    dispatch(getBlog(0));
    dispatch(getBlogs());

  }, []);

  useEffect(() => {
    let monthNames = [

      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let i = 0; i < monthlyDataState?.length; i++) {
      const element = monthlyDataState[i];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < ordersState?.length; i++) {
      data1.push({
        key: i,
        name: ordersState[i]?.user?.firstname + " " + ordersState[i]?.user?.lastname,
        product: ordersState[i]?.orderItems?.length,
        price: ordersState[i]?.totalPrice,
        dprice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
    }
    setOrderData(data1)
    console.log(dataMonthlySales);
  }, [ordersState]);

  return (

    <main role="main" className="col-md-9 ml-sm-auto col-lg-12 px-4">
      <h3 className="mb-4 title">Dashboard</h3>

      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div className="card-body bg-success">
              <div className="rotate">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Người Dùng</h6>
              <h1 className="display-4">{usersState?.length || 0}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-list fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Bài Viết</h6>
              <h1 className="display-4">{blogState?.length || 0}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-info h-100">
            <div className="card-body bg-info">
              <div className="rotate">
                <i className="fa fa-cubes fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Sản Phẩm</h6>
              <h1 className="display-4">{productstate?.length || 0}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="rotate">
                <i className="fa fa-share fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Liên Hệ</h6>
              <h1 className="display-4">{enqState.length || 0}</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
