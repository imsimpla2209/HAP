import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const createQuery = createAsyncThunk(
  "contact/post",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.postQuery(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  contact: "",
  isError: false,
  isTrue: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isTrue = true;
        state.isError = false;
        state.contact = action.payload;
        if (state.isSuccess === true) {
          toast.info("Contact Form Submitted Successfully");
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.isTrue = false;
        state.isError = true;
        if (state.isError === true) {
          toast.info("Có lỗi xảy ra vui lòng thử lại");
        }
      });
  },
});

export default contactSlice.reducer;
