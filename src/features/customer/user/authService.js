import axios from "axios";
import { base_url, config } from "../../../utils/axiosConfig";
import { Http, instance } from "apis/http";



const register = async (userData) => {
  const response = await instance.post(`authentication/sign-up`, userData)
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
};

const login = async (userData) => {
  const response = await instance.post(`authentication/login`, userData, config);

  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.clear();
  window.location.href = "/login";
};

const updateUser = async (data) => {
  const response = await instance.put(`/Customer/my/edit`, data, config);
  if (response.data) {
    return response.data;
  }
};

const updateUserPassword = async (data) => {
  const response = await instance.put(`/Admin/users/change-password`, data, config);
  if (response.data) {
    return response.data;
  }
};

const getUser = async (id) => {
  const response = await instance.get(`/Admin/users/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const getUserProf = async () => {
  const response = await instance.get(`/Customer/my`, config);
  if (response.data) {
    return response.data;
  }
};

const getUserWishList = async () => {
  const response = await instance.get(`/Customer/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await instance.post(`customer/carts/add-to-cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const getCart = async (page) => {
  const response = await instance.get(`customer/carts?page=${page}`, config);
  if (response.data) {
    return response.data;
  }
};

const removeCart = async (cartItemId) => {
  const response = await instance.delete(
    `customer/carts/remove/${cartItemId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateProdFromCart = async (cartDetail) => {
  const response = await instance.put(
    `customer/carts/edit/${cartDetail?.cartId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const getConfig = async () => {
  const res = await axios.get(`${base_url}user/checkout/config`);
  return res.data;
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaorder/${id}`, config);
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetPass = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async () => {
  const response = await axios.delete(`${base_url}user/empty-cart`, config);
  if (response.data) {
    return response.data;
  }
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

export const authService = {
  register,
  login,
  getUserWishList,
  addToCart,
  getCart,
  removeCart,
  createOrder,
  emptyCart,
  updateProdFromCart,
  getUserOrders,
  updateUser,
  forgotPassword,
  resetPass,
  getUser,
  logout,
  getOrder,
  updateOrder,
  updateUserPassword,
  getUserProf
};
