import axios from "axios";
import { base_url } from "../../../utils/axiosConfig";
import { config } from "../../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};


const getABrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};


const brandService = {
  getBrands,
  getABrand,
};
export default brandService;
