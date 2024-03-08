import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBLogs = createAsyncThunk(
  "blog/all-blogs",
  async (thunkAPI) => {
    try{
        return await blogService.getBlogs()
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlog = createAsyncThunk(
    "blog/get",
    async (id, thunkAPI) => {
      try{
          return await blogService.getBlog(id)
      }catch(error){
          return thunkAPI.rejectWithValue(error);
      }
    }
  );

const initialState = {
    blog:"",
    isError: false,
    isTrue: false,
    isSuccess: false,
    isLoading: false,
    message:"",
}

export const blogSlice = createSlice({
    name:"blog",
    initialState: initialState,
    reducers:{},
    extraReducers:(builer)=>{
        builer
        .addCase(getAllBLogs.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getAllBLogs.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isTrue = true;
            state.isError = false;
            state.blog = action.payload;
        }).addCase(getAllBLogs.rejected,(state, action)=>{
            state.isLoading = false;
            state.isTrue = false;
            state.isError = true
        }).addCase(getBlog.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getBlog.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isTrue = true;
            state.isError = false;
            state.singleBlog = action.payload;
        }).addCase(getBlog.rejected,(state, action)=>{
            state.isLoading = false;
            state.isTrue = false;
            state.isError = true
        })
    }
})

export default blogSlice.reducer