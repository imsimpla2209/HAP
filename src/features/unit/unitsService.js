import { instance } from "apis/http"
import { config } from "../auth/authService"

const getUnits = async () => {
  const response = await instance.get("Admin/units")
  return response.data
}

const createUnit = async (dataUnit) => {
  const response = await instance.post("Admin/units/add", dataUnit, config)
  return response.data
}

const getAUnit = async (id) => {
  const response = await instance.get(`Admin/units/${id}`, config);
  return response.data;
};

const updateUnit = async (unit) => {
  const response = await instance.put(
    `Admin/units/edit/${unit?.id}`,
    {
      unitName: unit.unitData.unitName, // corrected property name
    },
    config
  );

  return response.data;
};
const deleteUnit = async (id) => {
  const response = await instance.delete(`Admin/units/remove/${id}`, config)
  return response.data
}

const unitService = {
  getUnits,
  createUnit,
  getAUnit,
  updateUnit,
  deleteUnit
}
export default unitService