import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategoriesModal : false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        setAllCategoriesModalOn: (state) => {
            state.allCategoriesModal = true;
        },
        setAllCategoriesModalOff: (state) => {
            state.allCategoriesModal = false;
        }
    }
})

export const {setAllCategoriesModalOn,setAllCategoriesModalOff} = modalSlice.actions;
export const getModalAllCategories = (state) => state.modal.allCategoriesModal;
export default modalSlice.reducer;