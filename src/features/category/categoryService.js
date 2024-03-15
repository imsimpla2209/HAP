import { instance } from "apis/http";
import { config } from "../auth/authService";

const getCategorys = async (userData) => {
  const response = await instance.get("Admin/categories");
  return response.data;
};

const getACategory = async (id) => {
  const response = await instance.get(`Admin/categories/${id}`);
  return response.data;
};


const createCategory = async (data) => {
  const response = await instance.post(`Admin/categories/add`, data, config)
  return response.data
}

const updateCategory = async (category) => {
  const response = await instance.put(
    `Admin/categories/edit/${category.id}`,
    { categoryName: category.categoryData.categoryName },
    config
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await instance.delete(`Admin/categories/remove/${id}`, config)
  return response.data
}

const adminCategoryService = {
  getCategorys,
  createCategory,
  getACategory,
  updateCategory,
  deleteCategory
}
export default adminCategoryService