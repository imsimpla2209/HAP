import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { toast } from "react-toastify";


const initialState = {
  blogs: [],
  createdBlog: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBlogs = createAsyncThunk(
  "blog/get-blogs",
  async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.createBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blog/get-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update-blog",
  async (blogData, thunkAPI) => {
    try {
      return await blogService.updateBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction("Reset_all");
export const resetImgBlogState = createAction("Reset_img_product_state");

export const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBlog = action.payload
        if (state.isSuccess === true) {
          toast.info("Add Blog Successfully!");
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Có lỗi xảy ra vui lòng thử lại!");
        }
      }).addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.title = action.payload.title;
        state.content = action.payload.content;
        state.thumbnail = action.payload.thumbnail;
        state.createdBy = action.payload.createdBy;
        state.creationDate = action.payload.creationDate;
        state.lastestUpdate = action.payload.lastestUpdate;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload
        if (state.isSuccess === true) {
          toast.info("Updated Blog Successfully!");
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error
        if (state.isError === true) {
          toast.info("Updated Blog Successfully!");
        }
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Có lỗi xảy ra vui lòng thử lại, ${action.payload?.responseBody?.message}`, {
          autoClose: 5000,
        });
      })
      .addCase(resetState, () => initialState)
      .addCase(resetImgBlogState, (state) => {
        state.blogImages = []; // Reset imgProductState to an empty array
      });
  },
});

export default blogSlice.reducer;
