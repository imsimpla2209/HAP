import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogcatService from "./blogcatService";
import { toast } from "react-toastify";

export const getBlogcats = createAsyncThunk(
  "blogcat/get-blogcats",
  async (thunkAPI) => {
    try {
      return await blogcatService.getBlogcats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogcats = createAsyncThunk(
  "blogcat/create-blogcats",
  async (data, thunkAPI) => {
    try {
      return await blogcatService.createBlogcat(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getABlogcat = createAsyncThunk(
  "blogcat/get-blogcat",
  async (id, thunkAPI) => {
    try {
      return await blogcatService.getABlogcat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogcat = createAsyncThunk(
  "blogcat/update-blogcat",
  async (blogcatData, thunkAPI) => {
    try {
      return await blogcatService.updateBlogcat(blogcatData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogcat = createAsyncThunk(
  "blogcat/delete-blogcat",
  async (id, thunkAPI) => {
    try {
      return await blogcatService.deleteBlogcat(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction("Reset_all");

const initialState = {
  blogcats: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogcatSlice = createSlice({
  name: "blogcats",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogcats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogcats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogcats = action.payload;
      })
      .addCase(getBlogcats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogcats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogcats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogcat = action.payload;
        if (state.isSuccess === true) {
          toast.info("Add blog category Successfully!");
        }
      })
      .addCase(createBlogcats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.info("Some thing error!");
        }
      })
      .addCase(getABlogcat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogcat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogcatName = action.payload.title
      })
      .addCase(getABlogcat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateBlogcat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogcat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogcat = action.payload
        if (state.isSuccess === true) {
          toast.info("Updated blog category Successfully!");
        }
      })
      .addCase(updateBlogcat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Có lỗi xảy ra vui lòng thử lại!");
        }
      })
      .addCase(deleteBlogcat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogcat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogcat = action.payload;
      })
      .addCase(deleteBlogcat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogcatSlice.reducer;
