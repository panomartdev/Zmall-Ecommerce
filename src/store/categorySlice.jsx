import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
// import { BASE_URL } from "../utils/apiUrl"; // Uncomment import BASE_URL in Local and Comment before push to Production
import { shuffleArray } from "../utils/tools";

const initialState = {
    categories: [],
    categoriesStatus: STATUS.IDLE,
    categoryProducts: [],
    categoryProductsStatus: STATUS.IDLE
}
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchAsyncCategories.pending, (state) => {
               state.categoriesStatus = STATUS.LOADING;
           })
           .addCase(fetchAsyncCategories.fulfilled, (state,action) => {
               state.categories = action.payload;
               state.categoriesStatus = STATUS.SUCCEEDED;
           })
           .addCase(fetchAsyncCategories.rejected, (state) => {
               state.categoriesStatus = STATUS.FAILED;
           })

           .addCase(fetchAsyncProductsByCategory.pending, (state) => {
               state.categoryProductsStatus = STATUS.LOADING
           })
           .addCase(fetchAsyncProductsByCategory.fulfilled, (state,action) => {
               state.categoryProducts = action.payload;
               state.categoryProductsStatus = STATUS.SUCCEEDED;
           })
           .addCase(fetchAsyncProductsByCategory.rejected, (state) => {
               state.categoryProductsStatus = STATUS.FAILED;
           })
    }
});

export const fetchAsyncCategories = createAsyncThunk('categories/fetch', async()=>{
    const response = await fetch(`${VITE_BASE_URL}/products/categories`);
    const data = await response.json();
    return data;
});
export const fetchAsyncProductsByCategory = createAsyncThunk('category-products/fetch',
    async(category) => {
        const response = await fetch(`${VITE_BASE_URL}/products/category/${category}`);
        const data = await response.json()
        return data.products;
    }
)

export const getAllCategories = (state) => state.category.categories;
export const getAllCategoriesStatus = (state) => state.category.categoriesStatus;
export const getAllProductsByCategory = (state) => state.category.categoryProducts;
export const getAllProductsByCategoryStatus = (state) => state.category.categoriesStatus;
export default categorySlice.reducer;