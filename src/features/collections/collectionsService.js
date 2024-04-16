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

const updateCollection = async (collection) => {
  if (!collection || !collection.colData) {
    throw new Error("Product data is missing or invalid");
  }

  const response = await instance.put(
    `Admin/collections/edit/${collection?.id}`,
    {
      collectionName: collection.colData.collectionName,
      description: collection.colData.description,
      thumbnail: collection.colData.thumbnail,
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