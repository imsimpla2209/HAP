import { instance } from "apis/http"
import { config } from "../auth/authService"

const getModels = async (productId) => {
  const response = await instance.get(`Admin/products/${productId}/models`)
  return response.data
}

const createModel = async (productId, dataProduct) => {
  const response = await instance.post(`Admin/products/${productId}/models/add`, dataProduct, config)
  return response.data
}

const getAModel = async (productId, id) => {
  const response = await instance.get(`Admin/products/${productId}/models/${id}`, config);
  return response.data;
};

const updateModel = async (productId, model) => {
  const response = await instance.put(
    `Admin/products/${productId}/models/edit/${model?.id}`,
    {
      modelId: model.modelData.modelId,
      ProductId: model.modelData.ProductId,
      unitId: model.modelData.unitId,
      colorId: model.modelData.colorId,
      specification: model.modelData.specification,
      primaryPrice: model.modelData.primaryPrice,
      secondaryPrice: model.modelData.secondaryPrice,
      available: model.modelData.available,
      description: model.modelData.description,
    },
    config
  );

  return response.data;
};
const deleteModel = async (productId, id) => {
  const response = await instance.delete(`Admin/products/${productId}/models/remove/${id}`, config)
  return response.data
}

const collectionService = {
  getModels,
  createModel,
  getAModel,
  updateModel,
  deleteModel
}
export default collectionService