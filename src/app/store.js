import { configureStore } from '@reduxjs/toolkit';
import adminBrandReducer from '../features/admin/admin-brand/brandSlice';
import blogcatReducer from '../features/admin/blogcat/blogcatSlice';
import couponReducer from '../features/admin/coupon/couponSlice';
import customerReducer from '../features/customers/customerSlice';
import enquiryReducer from '../features/admin/enquiry/enquirySlice';
import uploadReducer from '../features/upload/uploadSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice';
import colorReducer from '../features/color/colorsSlice';
import unitReducer from '../features/unit/unitsSlice';
import collectionsReducer from '../features/collections/collectionsSlice';
import modelsReducer from '../features/models/modelsSlice';

import blogReducer from '../features/blog/blogSlice';
import brandReducer from '../features/customer/brand/brandSlice';
import contactReducer from '../features/customer/contact/contactSlice';
import authReducer from '../features/customer/user/authSlice';
import warehouseReducer from '../features/warehouse/warehousesSlice';


export const store = configureStore({
  reducer: {
    // customer
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    brand: brandReducer,
    contact: contactReducer,
    color: colorReducer,
    unit: unitReducer,
    collections: collectionsReducer,
    models: modelsReducer,
    //admin
    customer: customerReducer,
    blogcat: blogcatReducer,
    adminBrand: adminBrandReducer,
    category: categoryReducer,
    enquiry: enquiryReducer,
    // blog: blogReducer,
    upload: uploadReducer,
    coupon: couponReducer,
    warehouse: warehouseReducer,
  },

});