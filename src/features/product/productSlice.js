import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (page, thunkAPI) => {
    try {
      return await productService.getProducts(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-products",
  async (proudctData, thunkAPI) => {
    try {
      return await productService.createProduct(proudctData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (productData, thunkAPI) => {
    try {
      return await productService.updateProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (data, thunkAPI) => {
    try {
      await productService.deleteProduct(data.id)
      return await productService.getProducts(data?.page || 1)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const resetState = createAction("Reset_all");

export const resetImgProductState = createAction("Reset_img_product_state");


const initialState = {
  products: [],
  productImages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createProducts = action.payload
        if (state.isSuccess === true) {
          toast.info("Product Added Successfully!");
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      }).addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productId = action.payload.productId;
        state.productCode = action.payload.productCode;
        state.productName = action.payload.productName;
        state.category = action.payload.category;
        state.collection = action.payload.collection;
        state.voteStar = action.payload.voteStar;
        state.sold = action.payload.sold;
        state.singleProduct = action.payload;
        state.image = action.image;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.info("Product Updated Successfully!");
        }
        state.updatedProduct = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });

      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
        state.products = action.payload
        if (state.isSuccess === true) {
          toast.info("Delete Product Successfully!");
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      })
      .addCase(resetState, () => initialState)
      .addCase(resetImgProductState, (state) => {
        state.productImages = []; // Reset imgProductState to an empty array
      });
  },

});

export default productSlice.reducer;
