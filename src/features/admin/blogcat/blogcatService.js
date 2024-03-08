import axios from "axios"
import { base_url } from "../../../utils/base_url"
import { config } from "../../auth/authService"

const getBlogcats = async(userData) =>{
    const response = await axios.get(`${base_url}blogcategory/`, userData)
    return response.data
}

const createBlogcat = async(data) =>{
    const response = await axios.post(`${base_url}blogcategory/`, data, config)
    return response.data
}

const getABlogcat = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`, config);
    return response.data;
  };
  
  const updateBlogcat = async (blogcat) => {
    const response = await axios.put(
      `${base_url}blogcategory/${blogcat.id}`,
      { title: blogcat.blogcatData.title },
      config
    );
    return response.data;
  };

const deleteBlogcat = async(id) =>{
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config)
    return response.data
}

const blogcatService ={
    getBlogcats,
    createBlogcat,
    getABlogcat,
    updateBlogcat,
    deleteBlogcat
}
export default blogcatService