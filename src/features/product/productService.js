import { config } from "../auth/authService"
import { instance } from "apis/http"

const getProducts = async (page) => {
  const response = await instance.get("Admin/products?page=" + page)
  return response.data
}

const createProduct = async (dataProduct) => {
  const response = await instance.post("Admin/products/add", dataProduct, config)
  return response.data
}

const getAProduct = async (id) => {
  const response = await instance.get(`Admin/products/${id}`, config);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await instance.put(
    `Admin/products/edit/${product?.id}`,
    {
      productCode: product.productData.productCode,
      productName: product.productData.productName,
      categoryId: product.productData.categoryId,
      collectionIdList: product.productData.collectionIdList,
      voteStar: product.productData.voteStar,
      sold: product.productData.sold,
    },
    config
  );

  return response.data;
};
const deleteProduct = async (id) => {
  const response = await instance.delete(`Admin/products/remove/${id}`, config)
  return response.data
}

const productService = {
  getProducts,
  createProduct,
  getAProduct,
  updateProduct,
  deleteProduct
}
export default productService