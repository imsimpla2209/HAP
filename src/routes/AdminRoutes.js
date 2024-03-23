import { Routes, Route } from '../../node_modules/react-router-dom/dist/index';
import MainLayout from '../components/MainLayout';
import Addblogcat from '../pages/AdminPages/Bcategory/Addblogcat';
import Blogcatlist from '../pages/AdminPages/Bcategory/Blogcatlist';
import Addblog from '../pages/AdminPages/Blog/Addblog';
import Bloglist from '../pages/AdminPages/Blog/Bloglist';
import Addbrand from '../pages/AdminPages/Brand/Addbrand';
import Brandlist from '../pages/AdminPages/Brand/Brandlist';
import Addcat from '../pages/AdminPages/Category/Addcat';
import Categorylist from '../pages/AdminPages/Category/Categorylist';
import Addcoupon from '../pages/AdminPages/Coupon/Addcoupon';
import Couponlist from '../pages/AdminPages/Coupon/Couponlist';
import Customers from '../pages/AdminPages/Customer/Customers';
import Dashboard from '../pages/AdminPages/Dashboard';
import Enquiries from '../pages/AdminPages/Enquiry/Enquiries';
import ViewEnq from '../pages/AdminPages/Enquiry/viewEnq';
import Login from '../pages/CustomerPages/Login';
import ViewOrder from '../pages/AdminPages/Order/viewOrder';
import Orders from '../pages/CustomerPages/Orders';
import Addproduct from '../pages/AdminPages/Product/Addproduct';
import Productlist from '../pages/AdminPages/Product/Productlist';
import EditUser from '../pages/AdminPages/User/EditUser';
import User from '../pages/AdminPages/User/User';
import { OpenRoutes } from '../routing/OpenRoute';
import { PrivateRoutes } from '../routing/PrivateRoute';
import '../App.css';
// import './App.css';
import React from 'react';
import UnitList from 'pages/AdminPages/Unit/UnitList';
import AddUnit from 'pages/AdminPages/Unit/AddUnit';
import AddColor from 'pages/AdminPages/Color/AddColor';
import ColorList from 'pages/AdminPages/Color/ColorList';
import CollectionList from 'pages/AdminPages/Collections/CollectionList';
import AddCollection from 'pages/AdminPages/Collections/AddCollection';
import AddWarehouse from 'pages/AdminPages/Warehouse/AddWarehouse';
import WarehouseList from 'pages/AdminPages/Warehouse/WarehouseList';


function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OpenRoutes><Login /> </OpenRoutes>} />
      <Route path="/admin" element={<MainLayout />} >
        <Route index element={<Dashboard />} />
        <Route path="product" element={<Addproduct />} />
        <Route path="product/:id" element={<Addproduct />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="enquiries/:id" element={<ViewEnq />} />
        <Route path="blog" element={<Addblog />} />
        <Route path="blog/:id" element={<Addblog />} />
        <Route path="blog-category" element={<Addblogcat />} />
        <Route path="blog-category/:id" element={<Addblogcat />} />
        <Route path="blog-list" element={<Bloglist />} />
        <Route path="blog-category-list" element={<Blogcatlist />} />
        <Route path="coupon-list" element={<Couponlist />} />
        <Route path="coupon" element={<Addcoupon />} />
        <Route path="coupon/:id" element={<Addcoupon />} />
        <Route path="order" element={<Orders />} />
        <Route path="order/:id" element={<ViewOrder />} />
        <Route path="customers" element={<Customers />} />
        <Route path="users" element={<User />} />
        <Route path="user/:id" element={<EditUser />} />
        <Route path="category" element={<Addcat />} />
        <Route path="category/:id" element={<Addcat />} />
        <Route path="warehouse" element={<AddWarehouse />} />
        <Route path="warehouse/:id" element={<AddWarehouse />} />
        <Route path="category-list" element={<Categorylist />} />
        {/* <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="brand-list" element={<Brandlist />} /> */}
        <Route path="unit" element={<AddUnit />} />
        <Route path="unit/:id" element={<AddUnit />} />
        <Route path="unit-list" element={<UnitList />} />
        <Route path="color" element={<AddColor />} />
        <Route path="color/:id" element={<AddColor />} />
        <Route path="color-list" element={<ColorList />} />
        <Route path="product-list" element={<Productlist />} />
        <Route path="collection" element={<AddCollection />} />
        <Route path="collection/:id" element={<AddCollection />} />
        <Route path="collection-list" element={<CollectionList />} />
        <Route path="warehouse-list" element={<WarehouseList />} />

      </Route>
    </Routes>
  );
}

export default AdminRoutes;
