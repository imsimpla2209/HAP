import { instance } from "apis/http";

const getCategorys = async (userData) => {
    const response = await instance.get("Admin/categories");
    return response.data;
};

const getACategory = async (id) => {
    const response = await instance.get(`Admin/categories/${id}`);
    return response.data;
};

const categoryService = {
    getCategorys,
    getACategory,
};
export default categoryService;
