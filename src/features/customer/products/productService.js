import axios from "axios";
import { base_url, config } from "../../../utils/axiosConfig";
import { getProductById } from "apis";
import { instance } from "apis/http";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?page=${data?.page || 1}${
      data?.brands ? `&brands=${data?.brands}` : ""
    }${data?.tag ? `&tags=${data?.tag}` : ""}${
      data?.pcategories ? `&pcategories=${data?.pcategories}` : ""
    }${data?.minPrice ? `&price[gte]=${data?.minPrice}` : ""}${
      data?.maxPrice ? `&price[lte]=${data?.maxPrice}` : ""}${
      data?.sort ? `&sort=${data?.sort}` : ""
    }`
  );
  if (response.data) {
    return response.data;
  }
};

const getProduct = async (id) => {
  const respone = await getProductById(id);
  if (respone.data) {
    return respone.data;
  }
};

const addToWishlist = async (productId) => {
  const response = await instance.post(`/Customer/wishlist/add`, { productId }, config);
  if (response.data) {
    return response.data;
  }
};

const removeToWish = async (productId) => {
  const response = await instance.delete(`/Customer/wishlist/remove/${ productId }`, config);
  if (response.data) {
    return response.data;
  }
};



const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  getProduct,
  addToWishlist,
  removeToWish,
  rateProduct,
};
