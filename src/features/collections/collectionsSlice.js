import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import collectionsService from "./collectionsService";
import { toast } from "react-toastify";

export const getCollections = createAsyncThunk(
  "collection/get-collections",
  async (thunkAPI) => {
    try {
      return await collectionsService.getCollections();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCollection = createAsyncThunk(
  "collection/create-collections",
  async (colData, thunkAPI) => {
    try {
      return await collectionsService.createCollection(colData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getACollection = createAsyncThunk(
  "collection/get-collection",
  async (id, thunkAPI) => {
    try {
      return await collectionsService.getACollection(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCol = createAsyncThunk(
  "collection/update-collection",
  async (colData, thunkAPI) => {
    try {
      return await collectionsService.updateCollection(colData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collection/delete-collection",
  async (id, thunkAPI) => {
    try {
      return await collectionsService.deleteCollection(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const resetState = createAction("Reset_all");

export const resetImgCollectionState = createAction("Reset_img_collection_state");


const initialState = {
  collections: [],
  collectionImages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const collectionSlice = createSlice({
  name: "collections",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collections = action.payload
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createCollections = action.payload
        if (state.isSuccess === true) {
          toast.info("Collection Added Successfully!");
        }
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info(`Có lỗi xảy ra vui lòng thử lại, ${action.error}`);
        }
      }).addCase(getACollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleCollection = action.payload;

      })
      .addCase(getACollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateCol.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.info("Cập nhật thành công!");
        }
        state.updatedProduct = action.payload
      })
      .addCase(updateCol.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info(`Có lỗi xảy ra vui lòng thử lại, ${action.error}`);
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
          toast.info("Delete Collection Successfully!");
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      })
      .addCase(resetState, () => initialState)
      .addCase(resetImgCollectionState, (state) => {
        state.collectionImages = []; // Reset imgProductState to an empty array
      });
  },

});

export default collectionSlice.reducer;
