import axios from "axios";
import { base_url } from "../../../utils/axiosConfig";

const getBlogs = async (data) => {
  const respone = await axios.get(`${base_url}blog`);
  if (respone.data) {
    return respone.data;
  }
};

const getBlog = async (id) => {
  const respone = await axios.get(`${base_url}blog/${id}`);
  if (respone.data) {
    return respone.data;
  }
};

export const blogService = {
  getBlogs,
  getBlog
};
