import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice.jsx";
import productReducer from "./productSlice.jsx";
import cartReducer from "./cartSlice.jsx";
import modalReducer from './modalSlice.jsx';
import searchReducer from './searchSlice.jsx';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        modal: modalReducer,
        search: searchReducer
    }
});

export default store;