import { instance } from "apis/http"
import { config } from "features/auth/authService"

const getCustomers = async () => {
    const response = await instance.get("Admin/customers")
    return response.data
}

const createCustomer = async (dataProduct) => {
    const response = await instance.post("Admin/customers/add", dataProduct, config)
    return response.data
}

const getACustomer = async (id) => {
    const response = await instance.get(`Admin/customers/${id}`, config);
    return response.data;
};

const updateCustomer = async (collection) => {
    if (!collection || !collection.colData) {
        throw new Error("Product data is missing or invalid");
    }

    const response = await instance.put(
        `Admin/customers/edit/${collection?.id}`,
        {
            collectionName: collection.colData.collectionName,
            description: collection.colData.description,
            thumbnail: collection.colData.thumbnail,
        },
        config
    );

    return response.data;
};

const deleteCustomer = async (id) => {
    const response = await instance.delete(`Admin/customers/remove/${id}`, config)
    return response.data
}

const customerService = {
    getCustomers,
    createCustomer,
    getACustomer,
    updateCustomer,
    deleteCustomer
}
export default customerService