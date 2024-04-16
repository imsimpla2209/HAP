import { instance } from "apis/http"
import { config } from "../auth/authService"

const getWarehouses = async (page) => {
  const response = await instance.get("Admin/warehouse-logs?page=" + page)
  return response.data
}

const createWarehouse = async (dataProduct) => {
  const response = await instance.post("Admin/warehouse-logs/add", dataProduct, config)
  return response.data
}

const getAWarehouse = async (id) => {
  const response = await instance.get(`Admin/warehouse-logs/${id}`, config);
  return response.data;
};

const updateWarehouse = async (warehouse) => {
  if (!warehouse || !warehouse.warehouseData) {
    throw new Error("Warehouse data is missing or invalid");
  }

  const response = await instance.put(
    `Admin/warehouse-logs/edit/${warehouse?.warehouseId}`,
    {
      modelId: warehouse.warehouseData.modelId,
      isImport: warehouse.warehouseData.isImport,
      note: warehouse.warehouseData.note,
      quantity: warehouse.warehouseData.quantity,
    },
    config
  );

  return response.data;
};

const deleteWarehouse = async (id) => {
  const response = await instance.delete(`Admin/warehouse-logs/remove/${id}`, config)
  return response.data
}

const warehouseService = {
  getWarehouses,
  createWarehouse,
  getAWarehouse,
  updateWarehouse,
  deleteWarehouse
}
export default warehouseService