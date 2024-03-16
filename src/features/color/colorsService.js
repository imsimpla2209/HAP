import { instance } from "apis/http"
import { config } from "../auth/authService"

const getColors = async () => {
  const response = await instance.get("Admin/colors")
  return response.data
}

const createColor = async (dataColor) => {
  const response = await instance.post("Admin/colors/add", dataColor, config)
  return response.data
}

const getAColor = async (id) => {
  const response = await instance.get(`Admin/colors/${id}`, config);
  return response.data;
};

const updateColor = async (color) => {
  const response = await instance.put(
    `Admin/colors/edit/${color?.id}`,
    {
      colorName: color.colorData.colorName,
      image: color.colorData.image,
    },
    config
  );

  return response.data;
};
const deleteColor = async (id) => {
  const response = await instance.delete(`Admin/colors/remove/${id}`, config)
  return response.data
}

const colorService = {
  getColors,
  createColor,
  getAColor,
  updateColor,
  deleteColor
}
export default colorService