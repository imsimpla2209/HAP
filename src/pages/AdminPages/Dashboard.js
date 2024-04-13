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
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
    align: 'right',

  },
  {
    title: "Total Price",
    dataIndex: "price",
    align: 'right',

  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
    align: 'right',

  },
  {
    title: "Status",
    dataIndex: "status",
  },
];


const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders);
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

  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
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

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "income",
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },

    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    // <div>
    //   <h3 className="mb-4 title">Dashboard</h3>
    //   <div className="d-flex justify-content-between align-items-center gap-3">
    //     <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
    //       <div>
    //         <p className="mb-0 desc">Total revenue</p>
    //         <h4 className="mb-0 sub-title">
    //           $ {yearlyDataState && yearlyDataState[0]?.amount}
    //         </h4>
    //       </div>
    //       <div className="d-flex flex-column align-items-end">
    //         <p className="mb-0 desc">Income in Last Year from Today</p>
    //       </div>
    //     </div>
    //     <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
    //       <div>
    //         <p className="mb-0 desc">Total Sales</p>
    //         <h4 className="mb-0 sub-title">
    //           {yearlyDataState && yearlyDataState[0]?.count}
    //         </h4>
    //       </div>
    //       <div className="d-flex flex-column align-items-end">
    //         <p className="mb-0 desc">Sales in Last Year from Today</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="d-flex justify-content-between gap-3">
    //     <div className="mt-4 flex-grow w-50">
    //       <h3 className="mb-5 title">Income Static</h3>
    //       <div>
    //         {/* <Column {...config} /> */}
    //       </div>
    //     </div>
    //     <div className="mt-4 flex-grow w-50">
    //       <h3 className="mb-5 title">Sales Static</h3>
    //       <div>
    //         {/* <Column {...config2} /> */}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <h3 className="mb-4 title">Recent Orders</h3>
    //     <Table columns={columns} dataSource={orderData} />
    //   </div>

    // </div>
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
              <h1 className="display-4">134</h1>
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
              <h1 className="display-4">87</h1>
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
              <h1 className="display-4">125</h1>
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
              <h1 className="display-4">36</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
