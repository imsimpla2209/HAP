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
    `Admin/products/${productId}/models/edit/${model?.modelId}`,
    {
      productId: productId,
      modelName: model.modelData?.modelName || model?.modelName,
      unitId: model.modelData?.unitId || model?.unitId,
      colorId: model.modelData?.colorId || model?.colorId,
      specification: model.modelData?.specification || model?.specification,
      primaryPrice: model.modelData?.primaryPrice || model?.primaryPrice,
      secondaryPrice: model.modelData?.secondaryPrice || model?.secondaryPrice,
      available: model.modelData?.available || model?.available,
      description: model.modelData?.description || model?.description,
      attachments: model.modelData?.attachments || model?.attachments,
    },
    config
  );

  return response.data;
};
const deleteModel = async (productId, id) => {
  const response = await instance.delete(`Admin/products/${productId}/models/remove/${id}`, config)
  return response.data
}

const modelsServices = {
  getModels,
  createModel,
  getAModel,
  updateModel,
  deleteModel
}
export default modelsServices