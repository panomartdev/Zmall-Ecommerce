import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
// import { BASE_URL } from "../utils/apiUrl"; // Uncomment import BASE_URL in Local and Comment before push to Production

const initialState = {
    allProducts : [],
    allProductStatus : STATUS.IDLE,
    extendProductsStatus : STATUS.IDLE,
    singleProduct : [],
    singleProductStatus : STATUS.IDLE
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           //Initiated All Products at HomePage
           .addCase(fetchAsyncAllProducts.pending, (state) => {
               state.allProductStatus = STATUS.LOADING;
           })
           .addCase(fetchAsyncAllProducts.fulfilled, (state, action) => {
               state.allProducts = action.payload;
               state.allProductStatus = STATUS.SUCCEEDED;
           })
           .addCase(fetchAsyncAllProducts.rejected, (state) => {
               state.allProductStatus = STATUS.FAILED;
           })
           //Extention Products fetching by click on Loadmore Button
           .addCase(fetchAsyncExtendProducts.pending, (state) => {
               state.extendProductsStatus = STATUS.LOADING;
           })
           .addCase(fetchAsyncExtendProducts.fulfilled, (state,action) => {
               state.allProducts = [...state.allProducts, ...action.payload];
               state.extendProductsStatus = STATUS.SUCCEEDED;
           })
           .addCase(fetchAsyncExtendProducts.rejected, (state) => {
               state.extendProductsStatus = STATUS.FAILED;
           })
           //Single Products fetching
           .addCase(fetchAsyncSingleProduct.pending, (state) => {
               state.singleProductStatus = STATUS.LOADING;
           })
           .addCase(fetchAsyncSingleProduct.fulfilled, (state,action) => {
               state.singleProduct = action.payload;
               state.singleProductStatus = STATUS.SUCCEEDED;
           })
           .addCase(fetchAsyncSingleProduct.rejected, (state) => {
               state.singleProductStatus = STATUS.FAILED;
           })
    }
})

export const fetchAsyncAllProducts = createAsyncThunk('products/fetch',
    async(limit) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products?limit=${limit}`);
        const data = await response.json();
        return data.products
    }   
)
export const fetchAsyncExtendProducts = createAsyncThunk('extendproducts/fetch',
    async(skip) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products?limit=6&skip=${skip}`);
        const data = await response.json();
        return data.products
    }
)
export const fetchAsyncSingleProduct = createAsyncThunk('singleproduct/fetch',
    async(id) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
        const data = await response.json();
        return data
    }
)

export const getAllProducts = (state) => state.product.allProducts;
export const getAllCategoriesStatus = (state) => state.product.allProductStatus;
export const getExtendProductsStatus = (state) => state.product.extendProductsStatus;
export const getSingleProduct = (state) => state.product.singleProduct;
export const getSingleProductStatus = (state) => state.product.singleProductStatus;

export default productSlice.reducer;