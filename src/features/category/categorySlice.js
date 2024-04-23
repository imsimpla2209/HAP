import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import { toast } from "react-toastify";

const initialState = {
  categorys: [],
  createdCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCategorys = createAsyncThunk(
  "category/get-categorys",
  async (thunkAPI) => {
    try {
      return await categoryService.getCategorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create-categories",
  async (data, thunkAPI) => {
    try {
      return await categoryService.createCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACategory = createAsyncThunk(
  "category/get-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.getACategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update-category",
  async (categoryData, thunkAPI) => {
    try {
      return await categoryService.updateCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction("Reset_all");


export const categorySlice = createSlice({
  name: "categorys",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categorys = action.payload
      })
      .addCase(getCategorys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCategory = action.payload
        if (state.isSuccess === true) {
          toast.info("Add Category Successfully!");
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Something Erro!");
        }
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload
        if (state.isSuccess === true) {
          toast.info("Updated Category Successfully!");
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Có lỗi xảy ra vui lòng thử lại!");
        }
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      })
      .addCase(resetState, () => initialState);;
  },
});

export default categorySlice.reducer;
