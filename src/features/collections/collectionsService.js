import { instance } from "apis/http"
import { config } from "../auth/authService"

const getCollections = async () => {
  const response = await instance.get("Admin/collections")
  return response.data
}

const createCollection = async (dataProduct) => {
  const response = await instance.post("Admin/collections/add", dataProduct, config)
  return response.data
}

const getACollection = async (id) => {
  const response = await instance.get(`Admin/collections/${id}`, config);
  return response.data;
};

const updateCollection = async (product) => {
  const response = await instance.put(
    `Admin/collections/edit/${product?.id}`,
    {
      collectionName: product.productData.name,
      description: product.productData.description,
      collectionImages: product.productData.images,
    },
    config
  );

  return response.data;
};
const deleteCollection = async (id) => {
  const response = await instance.delete(`Admin/collections/remove/${id}`, config)
  return response.data
}

const collectionService = {
  getCollections,
  createCollection,
  getACollection,
  updateCollection,
  deleteCollection
}
export default collectionService