import { Http } from "apis/http";

const getCategorys = async (userData) => {
    const response = await Http.get("Admin/categories");
    return response.data;
};

const getACategory = async (id) => {
    const response = await Http.get(`Admin/categories/${id}`);
    return response.data;
};

const categoryService = {
    getCategorys,
    getACategory,
};
export default categoryService;
