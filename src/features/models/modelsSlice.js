import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import modelsService from "./modelsService";
import { toast } from "react-toastify";

export const getModels = createAsyncThunk(
  "model/get-models",
  async (thunkAPI) => {
    try {
      return await modelsService.getModels();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createModel = createAsyncThunk(
  "model/create-models",
  async (colData, thunkAPI) => {
    try {
      return await modelsService.createModel(colData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getAModel = createAsyncThunk(
  "model/get-model",
  async (id, thunkAPI) => {
    try {
      return await modelsService.getAModel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateModel = createAsyncThunk(
  "model/update-model",
  async (colData, thunkAPI) => {
    try {
      return await modelsService.updateModel(colData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "model/delete-model",
  async (id, thunkAPI) => {
    try {
      return await modelsService.deleteCollection(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const resetState = createAction("Reset_all");

export const resetImgModelState = createAction("Reset_img_model_state");


const initialState = {
  models: [],
  modelImages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const collectionSlice = createSlice({
  name: "models",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.models = action.payload
      })
      .addCase(getModels.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createCollections = action.payload
        if (state.isSuccess === true) {
          toast.info("Model Added Successfully!");
        }
      })
      .addCase(createModel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Something error");
        }
      }).addCase(getAModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.modelId = action.payload.modelId;
        state.modelName = action.payload.modelName;
        state.productId = action.payload.productId;
        state.unitId = action.payload.unitId;
        state.colorId = action.payload.colorId;
        state.specification = action.payload.specification;
        state.primaryPrice = action.payload.primaryPrice;
        state.secondaryPrice = action.payload.secondaryPrice;
        state.available = action.payload.available;
        state.description = action.payload.description;
        state.attachments = action.payload.attachments;
      })
      .addCase(getAModel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.info("Model Updated Successfully!");
        }
        state.updatedProduct = action.payload
      })
      .addCase(updateModel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Something error");
        }

      })
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCollection = action.payload;
        if (state.isSuccess === true) {
          toast.info("Delete Model Successfully!");
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.info("Something error");
        }
      })
      .addCase(resetState, () => initialState)
      .addCase(resetImgModelState, (state) => {
        state.modelImages = []; // Reset imgProductState to an empty array
      });
  },

});

export default collectionSlice.reducer;
