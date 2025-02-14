import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: [],
  };

  export const fetchProductDetails = createAsyncThunk() ;
  
export const fetchFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async () => {
      const result = await axios.get(
        "http://localhost:5000/api/shopping/products/get"
      );
  
      return result?.data;
    }
);
const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
      setProductDetails: (state) => {
        state.productDetails = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFilteredProducts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchFilteredProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        })
        .addCase(fetchProductDetails.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.productDetails = null;
        });
    },
  });

  export default shoppingProductSlice.reducer;
