import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/customer/user/authSlice';
import productReducer from '../features/customer/products/productSlice';
import blogReducer from '../features/customer/blogs/blogSlice';
import contactReducer from '../features/customer/contact/contactSlice';
import categoryReducer from '../features/customer/category/categorySlice';
import brandReducer from '../features/customer/brand/brandSlice';
import adminCategoryReducer from '../features/admin/admin-category/categorySlice';
import adminBrandReducer from '../features/admin/admin-brand/brandSlice';
import customerReducer from '../features/admin/customers/customerSlice';
import blogcatReducer from '../features/admin/blogcat/blogcatSlice';
import enquiryReducer from '../features/admin/enquiry/enquirySlice';
import uploadReducer from '../features/admin/upload/uploadSlice';
import couponReducer from '../features/admin/coupon/couponSlice';


export const store = configureStore({
  reducer: {
    // customer
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    category: categoryReducer,
    brand: brandReducer,
    contact: contactReducer,

    //admin
    customer: customerReducer,
    product: productReducer,
    blogcat: blogcatReducer,
    adminBrand: adminBrandReducer,
    adminCategory: adminCategoryReducer,
    enquiry: enquiryReducer,
    blog: blogReducer,
    upload: uploadReducer,
    coupon: couponReducer
  },

});