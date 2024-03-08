import axios from "axios"
import { base_url } from "../../../utils/base_url"
import { config } from "../../auth/authService"

const getCategorys = async(userData) =>{
    const response = await axios.get(`${base_url}category/`, userData)
    return response.data
}

const createCategory = async(data) =>{
    const response = await axios.post(`${base_url}category/`, data, config)
    return response.data
}

const getACategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`, config);
    return response.data;
  };
  
  const updateCategory = async (category) => {
    const response = await axios.put(
      `${base_url}category/${category.id}`,
      { title: category.categoryData.title },
      config
    );
    return response.data;
  };

const deleteCategory = async(id) =>{
    const response = await axios.delete(`${base_url}category/${id}`, config)
    return response.data
}

const adminCategoryService ={
    getCategorys,
    createCategory,
    getACategory,
    updateCategory,
    deleteCategory
}
export default adminCategoryService