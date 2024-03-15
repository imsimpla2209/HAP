import { Http } from "apis/http"
import { config } from "../auth/authService"

const getUnits = async () => {
  const response = await Http.get("Admin/units")
  return response.data
}

const createUnit = async (dataUnit) => {
  const response = await Http.post("Admin/units/add", dataUnit, config)
  return response.data
}

const getAUnit = async (id) => {
  const response = await Http.get(`Admin/units/${id}`, config);
  return response.data;
};

const updateUnit = async (unit) => {
  const response = await Http.put(
    `Admin/units/edit/${unit?.id}`,
    {
      unitName: unit.unitData.unitName, // corrected property name
    },
    config
  );

  return response.data;
};
const deleteColor = async (id) => {
  const response = await Http.delete(`Admin/units/remove/${id}`, config)
  return response.data
}

const unitService = {
  getUnits,
  createUnit,
  getAUnit,
  updateUnit,
  deleteColor
}
export default unitService