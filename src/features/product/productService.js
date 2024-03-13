import { Http } from "apis/http"
import { config } from "../auth/authService"

const getProducts = async () => {
  const response = await Http.get("Admin/products")
  return response.data
}

const createProduct = async (dataProduct) => {
  const response = await Http.post("Admin/products/add", dataProduct, config)
  return response.data
}

const getAProduct = async (id) => {
  const response = await Http.get(`Admin/products/${id}`, config);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await Http.put(
    `Admin/products/edit/${product?.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      pcategories: product.productData.pcategories,
      brands: product.productData.brands,
      images: product.productData.images,
      price: product.productData.price,
      tag: product.productData.tag,
      quantity: product.productData.quantity,
    },
    config
  );

  return response.data;
};
const deleteProduct = async (id) => {
  const response = await Http.delete(`Admin/products/remove/${id}`, config)
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