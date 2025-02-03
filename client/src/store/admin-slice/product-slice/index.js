import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading: flase,
    productList: [],
}


export const addNewProduct = createAsyncThunk('/products/addnewproducts',
    (formData) => {
        const response = axios.post('http://localhost:5000/api/admin/products/add', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response?.data;
    }
)

export const editProduct = createAsyncThunk('/products/editProduct',
    ({ id, formData }) => {
        const response = axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response?.data;
    }
)

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    () => {
        const response = axios.get('http://localhost:5000/api/admin/products/get');
        return response?.data;
    }
)

export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    (id) => {
        const response = axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
        return response?.data;
    }
)

export const deleteAllProduct = createAsyncThunk('/products/deleteAll',
    () => {
        const response = axios.delete('http://localhost:5000/api/admin/products/deleteAll');
        return response?.data;
    }
)


const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected, (state) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
  });
  
  export default AdminProductsSlice.reducer;