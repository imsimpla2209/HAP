import { Http, instance } from "./http";

export const signup = (data) => {
  return Http.post("authentication/sign-up", data);
};

export const login = (data) => {
  return Http.post("authentication/login", data);
}

export const getCategories = () => {
  return Http.get("Admin/categories");
}

export const getCategoryById = (id) => {
  return Http.get(`Admin/categories/${id}`);
}

export const postCategory = (catName) => {
  return Http.post("Admin/categories/add?categoryName=" + catName);
}

export const updateCategory = (catName, id) => {
  return Http.put(`Admin/categories/edit/${id}?categoryName=` + catName);
}

export const deleteCategory = (id) => {
  return Http.delete(`Admin/categories/remove/${id}`);
}

export const getUnits = () => {
  return Http.get("Admin/units");
}

export const getUnitById = (id) => {
  return Http.get(`Admin/units/${id}`);
}

export const postUnit = (unitName) => {
  return Http.post("Admin/units/add?unitName=" + unitName);
}

export const updateUnit = (unitName, id) => {
  return Http.put(`Admin/units/edit/${id}?unitName=` + unitName);
}

export const deleteUnit = (id) => {
  return Http.delete(`Admin/units/remove/${id}`);
}

export const getCollections = () => {
  return Http.get("Admin/collections");
}

export const getCollectionById = (id) => {
  return Http.get(`Admin/collections/${id}`);
}

export const postCollection = (data) => {
  return Http.post("Admin/collections/add", data);
}

export const updateCollection = (data, id) => {
  return Http.put(`Admin/collections/edit/${id}`, data);
}

export const deleteCollection = (id) => {
  return Http.delete(`Admin/collections/remove/${id}`);
}

export const getColors = () => {
  return Http.get("Admin/colors");
}

export const getColorById = (id) => {
  return Http.get(`Admin/colors/${id}`);
}

export const postColor = (colorName) => {
  return Http.post("Admin/colors/add?colorName=" + colorName);
}

export const updateColor = (colorName, id) => {
  return Http.put(`Admin/colors/edit/${id}`, colorName);
}

export const deleteColor = (id) => {
  return Http.delete(`Admin/colors/remove/${id}`);
}

export const getProducts = () => {
  return Http.get("Admin/products");
}

export const getProductById = (id) => {
  return Http.get(`Admin/products/${id}`);
}

export const postProduct = (data) => {
  return Http.post("Admin/products/add", data);
}

export const updateProduct = (data, id) => {
  return Http.put(`Admin/products/edit/${id}`, data);
}

export const deleteProduct = (id) => {
  return Http.delete(`Admin/products/remove/${id}`);
}