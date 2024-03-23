/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { LuClipboardList } from "react-icons/lu";
import { ImBlog } from "react-icons/im";
import { RiCouponLine } from "react-icons/ri"
import { FaClipboardList, FaWarehouse } from "react-icons/fa";
import { TbBrandBlogger, TbBrandBootstrap, TbCategory } from "react-icons/tb";
import { BiSolidCollection } from "react-icons/bi";

import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const userState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">HAP</span>
            <span className="lg-logo"></span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "DashBoard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Khách Hàng",
            },
            {
              key: "users",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Người Dùng",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Mục Lục",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Thêm Sản Phẩm",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Danh sách sản phẩm",
                },
                {
                  key: "collection",
                  icon: <BiSolidCollection className="fs-4" />,
                  label: "Thêm Bộ Sản Phẩm",
                },
                {
                  key: "collection-list",
                  icon: <BiSolidCollection className="fs-4" />,
                  label: "Danh sách bộ sản phẩm",
                },
                {
                  key: "unit",
                  icon: <TbBrandBootstrap className="fs-4" />,
                  label: "Đơn Vị",
                },
                {
                  key: "unit-list",
                  icon: <TbBrandBootstrap className="fs-4" />,
                  label: "Danh Sách Đơn Vị",
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-4" />,
                  label: "Thêm Danh Mục Sản Phẩm",
                },
                {
                  key: "category-list",
                  icon: <TbCategory className="fs-4" />,
                  label: "Danh Mục Sản Phẩm",
                },
                {
                  key: "color",
                  icon: <TbCategory className="fs-4" />,
                  label: "Màu Sắc",
                },
                {
                  key: "color-list",
                  icon: <TbCategory className="fs-4" />,
                  label: "Danh Sách Màu Sắc",
                },
                {
                  key: "warehouse",
                  icon: <FaWarehouse className="fs-4" />,
                  label: "Thêm Nhật Ký Kho",
                },
                {
                  key: "warehouse-list",
                  icon: <FaWarehouse className="fs-4" />,
                  label: "Danh Sách Nhật Ký Kho",
                },
              ],
            },
            {
              key: "order",
              icon: <LuClipboardList className="fs-4" />,
              label: "Đơn hàng",
            },
            {
              key: "blog",
              icon: <TbBrandBlogger className="fs-4" />,
              label: "Bài Đăng",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Đăng tải Blog",
                },
                {
                  key: "blog-list",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Danh Sách Blog",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Thêm Danh Mục Blog",
                },
                {
                  key: "blog-category-list",
                  icon: <TbBrandBlogger className="fs-4" />,
                  label: "Danh Sách Danh Mục Bài Đăng",
                },
              ],
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Thêm Mã Giảm Giá",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Danh Sách Mã",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            }, {
              key: "signout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Đăng Xuất",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div></div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{userState?.lastname}</h5>
                <p className="mb-0">{userState?.email}</p>
              </div>

            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "18px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={300}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
