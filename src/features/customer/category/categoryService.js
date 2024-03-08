import axios from "axios"
import { base_url } from "../../../utils/axiosConfig";
import { config } from "../../../utils/axiosConfig";

const getCategorys = async(userData) =>{
    const response = await axios.get(`${base_url}category/`, userData)
    return response.data
}


const getACategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`, config);
    return response.data;
  };
  
  
const categoryService ={
    getCategorys,
    getACategory,

}
export default categoryService