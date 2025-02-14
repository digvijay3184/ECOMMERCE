import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index';
import AdminProductsSlice from './admin-slice/product-slice/index'
import shoppingProductSlice from './shopping/product-slice/index'



const store = configureStore({
    reducer: {
        auth : authReducer ,
        adminProducts : AdminProductsSlice ,
        shoppingProducts: shoppingProductSlice ,
    }
})

export default store;