import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
interface DataState {
  groupNames: string[];
  productNames: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DataState = {
  groupNames: [],
  productNames: [],
  status: "idle",
  error: null,
};

const fetchGroupNames = createAsyncThunk<string[], void>("data/fetch", async () => {
  try {
    const response = await axios.get("http://10.0.20.121:8000/add_group", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch groups");
  }
});

const fetchProducts = createAsyncThunk<string[], void>("data/fetchProducts", async () => {
  try {
    const response = await axios.get("https://api.example.com/products");
    return response.data.map((product: { name: string }) => product.name);
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupNames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupNames = action.payload;
      })
      .addCase(fetchGroupNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productNames = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchGroupNames, fetchProducts };
export default dataSlice.reducer;
