import axios from "axios"
import { base_url } from "../../../utils/base_url"
// import { config } from "utils/axiosConfig"
import { Http } from "apis/http"

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;


export const config = {
  headers: { Authorization: `Bearer ${
    getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
  }` }
  // headers: {
  //   Authorization: `Bearer ${
  //     getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
  //   }`,
  //   Accept: "application/json",
  // },
};


const getBlogs = async(userData) =>{
  const response = await Http.get("Admin/blogs?page=1");
  
    return response.data
}

const createBlog = async(data) =>{
  const response = await axios.post(`http://haanphat.somee.com/api/Admin/blogs/add`, data, config)
  // const response = await Http.post(`Admin/blogs/add`, data, config)
  return response.data
}

const getABlog = async (id) => {
  const response = await Http.get(`Admin/blogs/${id}`);    return response.data;
  };
  
  const updateBlog = async (blog) => {
    const response = await axios.put(
      `${base_url}blog/${blog.id}`,
      {
        title: blog.blogData.title,
        description: blog.blogData.description,
        images: blog.blogData.images,
      },
      config
    );
  
    return response.data;
  };
const deleteBlog = async(id) =>{
    const response = await axios.delete(`${base_url}blog/${id}`, config)
    return response.data
}

const blogService ={
    getBlogs,
    createBlog,
    getABlog,
    updateBlog,
    deleteBlog
}
export default blogService