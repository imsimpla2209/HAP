import { Http } from "apis/http"
import { config } from "../auth/authService"

const getCollections = async () => {
  const response = await Http.get("Admin/collections")
  return response.data
}

const createCollection = async (dataProduct) => {
  const response = await Http.post("Admin/collections/add", dataProduct, config)
  return response.data
}

const getACollection = async (id) => {
  const response = await Http.get(`Admin/collections/${id}`, config);
  return response.data;
};

const updateCollection = async (product) => {
  const response = await Http.put(
    `Admin/collections/edit/${product?.id}`,
    {
      CollectionName: product.productData.name,
      Description: product.productData.description,
      collectionImages: product.productData.images,
    },
    config
  );

  return response.data;
};
const deleteCollection = async (id) => {
  const response = await Http.delete(`Admin/collections/remove/${id}`, config)
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