import { instance } from "apis/http";

const getCategorys = async (userData) => {
    const response = await instance.get("Admin/categories");
    return response.data;
};

const getACategory = async (id) => {
    const response = await instance.get(`Admin/categories/${id}`);
    return response.data;
};


const addCategory = async(dataCategories)=>{

    const response = await instance.post(`Admin/categories/add?categoryName=${dataCategories}`)
    return response.data;
}

const categoryService = {
    getCategorys,
    getACategory,
    addCategory
};
export default categoryService;
