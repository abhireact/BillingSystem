import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
interface DataState {
  groupsName: string[];
  productsName: string[];
  productsInfo: string[];
  unitsName: string[];
  suppliersName: string[];
  suppliersInfo: string[];
  companyInfo: string[];
  clientInfo: string[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DataState = {
  groupsName: [],
  productsName: [],
  productsInfo: [],
  suppliersName: [],
  unitsName: [],
  suppliersInfo: [],
  companyInfo: [],
  clientInfo: [],
  status: "idle",
  error: null,
};

export const fetchGroupsName = createAsyncThunk<string[], void>(
  "data/fetchGroupsName",
  async () => {
    try {
      const response = await axios.get("http://10.0.20.121:8000/add_group", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "redux group names");
      return response.data.map((group: { group_name: string }) => group.group_name);
    } catch (error) {
      throw new Error("Failed to fetch groups");
    }
  }
);

export const fetchProducts = createAsyncThunk<string[], void>("data/fetchProducts", async () => {
  try {
    const response = await axios.get("http://10.0.20.121:8000/products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "redux Product names");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
});
export const fetchUnitsName = createAsyncThunk<string[], void>("data/fetchUnitsName", async () => {
  try {
    const response = await axios.get("http://10.0.20.121:8000/unitmaster", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "redux units names");
    return response.data.map((unit: { unit_name: string }) => unit.unit_name);
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
});
export const fetchSuppliers = createAsyncThunk<string[], void>("data/fetchSupplier", async () => {
  try {
    const response = await axios.get("http://10.0.20.121:8000/suppliers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "redux suppliers info");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
});
export const fetchCompany = createAsyncThunk<string[], void>("data/fetchCompany", async () => {
  try {
    const response = await axios.get("http://10.0.20.121:8000/company", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "redux company info");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
});
export const fetchClientAccount = createAsyncThunk<string[], void>(
  "data/fetchClientAccount",
  async () => {
    try {
      const response = await axios.get("http://10.0.20.121:8000/clientaccount", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "redux client info");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupsName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupsName = action.payload;
      })
      .addCase(fetchGroupsName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsInfo = action.payload;
        state.productsName = action.payload.map((product: any) => product.product_name);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUnitsName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnitsName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.unitsName = action.payload;
      })
      .addCase(fetchUnitsName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suppliersInfo = action.payload;
        state.suppliersName = action.payload.map((supplier: any) => supplier.company_name);
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companyInfo = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClientAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientInfo = action.payload;
      })
      .addCase(fetchClientAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
