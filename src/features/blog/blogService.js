import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"
import { instance } from "apis/http"

const getBlogs = async (userData) => {
  const response = await instance.get(`Admin/blogs?page=0`, config)
  return response.data
}

const createBlog = async (data) => {
  const response = await instance.post(`Admin/blogs/add`, data, config)
  return response.data
}

const getABlog = async (id) => {
  const response = await instance.get(`Admin/blogs/${id}`, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await instance.put(
    `Admin/blogs/edit/${blog.id}`,
    {
      Title: blog.blogData.title,
      Description: blog.blogData.description,
      CreationDate: blog.blogData.CreationDate,
      LatestUpdate: blog.blogData.LatestUpdate,
    },
    config
  );

  return response.data;
};
const deleteBlog = async (id) => {
  const response = await instance.delete(`Admin/blogs/remove/${id}`, config)
  return response.data
}

const blogService = {
  getBlogs,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog
}
export default blogService