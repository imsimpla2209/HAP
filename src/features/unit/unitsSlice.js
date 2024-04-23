import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import unitsService from "./unitsService";
import { toast } from "react-toastify";

export const getUnits = createAsyncThunk(
  "unit/get-units",
  async (thunkAPI) => {
    try {
      return await unitsService.getUnits();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUnit = createAsyncThunk(
  "unit/create-units",
  async (colData, thunkAPI) => {
    try {
      return await unitsService.createUnit(colData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getAUnit = createAsyncThunk(
  "unit/get-unit",
  async (id, thunkAPI) => {
    try {
      return await unitsService.getAUnit(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUnit = createAsyncThunk(
  "unit/update-unit",
  async (unitData, thunkAPI) => {
    try {
      return await unitsService.updateUnit(unitData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUnit = createAsyncThunk(
  "unit/delete-unit",
  async (id, thunkAPI) => {
    try {
      return await unitsService.deleteUnit(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const resetState = createAction("Reset_all");


const initialState = {
  units: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const colorSlice = createSlice({
  name: "units",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.units = action.payload
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createProducts = action.payload
        if (state.isSuccess === true) {
          toast.info("unit Added Successfully!");
        }
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      }).addCase(getAUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.name;
        state.code = action.payload.code;
      })
      .addCase(getAUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.info("unit Updated Successfully!");
        }
        state.updatedProduct = action.payload
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });

      })
      .addCase(deleteUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedUnit = action.payload;
        if (state.isSuccess === true) {
          toast.info("Delete unit Successfully!");
        }
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      })
      .addCase(resetState, () => initialState)
  },

});

export default colorSlice.reducer;
