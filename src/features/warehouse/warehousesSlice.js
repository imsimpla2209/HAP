import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import warehousesService from "./warehousesService";
import { toast } from "react-toastify";

export const getWarehouses = createAsyncThunk(
  "warehouse/get-warehouses",
  async (page, thunkAPI) => {
    try {
      return await warehousesService.getWarehouses(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createWarehouse = createAsyncThunk(
  "warehouse/create-warehouses",
  async (colData, callBack, thunkAPI) => {
    try {
      const response = await warehousesService.createWarehouse(colData);

      if (callBack) {
        callBack();
      }

      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getAWarehouse = createAsyncThunk(
  "warehouse/get-warehouse",
  async (id, thunkAPI) => {
    try {
      return await warehousesService.getAWarehouse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateWarehouse = createAsyncThunk(
  "warehouse/update-warehouse",
  async (colData, callBack, thunkAPI) => {
    try {
      const response = await warehousesService.updateWarehouse(colData);

      if (callBack) {
        callBack();
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteWarehouse = createAsyncThunk(
  "warehouse/delete-warehouse",
  async (id, thunkAPI) => {
    try {
      return await warehousesService.deleteWarehouse(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const resetState = createAction("Reset_all");

export const resetImgWarehouseState = createAction("Reset_img_warehouse_state");


const initialState = {
  warehouses: [],
  warehouseImages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const warehouseSlice = createSlice({
  name: "warehouses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarehouses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.warehouses = action.payload
      })
      .addCase(getWarehouses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createWarehouses = action.payload
        if (state.isSuccess === true) {
          toast.info("Warehouse Added Successfully!");
        }
      })
      .addCase(createWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Something error");
        }
      }).addCase(getAWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isImport = action.payload.isImport;
        state.modelId = action.payload.modelId;
        state.quantity = action.payload.quantity;
        state.note = action.payload.note;
        // state.warehouseImages = action.payload.images;
      })
      .addCase(getAWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.info("Warehouse Updated Successfully!");
        }
        state.updatedWarehouse = action.payload
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Something error");
        }

      })
      .addCase(deleteWarehouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedWarehouse = action.payload;
        if (state.isSuccess === true) {
          toast.info("Delete Warehouse Successfully!");
        }
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.info("Something error");
        }
      })
      .addCase(resetState, () => initialState)
      .addCase(resetImgWarehouseState, (state) => {
        state.warehouseImages = []; // Reset imgProductState to an empty array
      });
  },

});

export default warehouseSlice.reducer;
