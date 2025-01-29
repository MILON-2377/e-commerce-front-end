import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products:[],
}

export const cartSlicer = createSlice({
    name:"items",
    initialState,
    reducers:{
        addToCartItem: (state, action) => {
            if(!state.products.includes(action.payload)){
                state.products.push(action.payload);
            }
        }
    }
});

export const {addToCartItem} = cartSlicer.actions;
export default cartSlicer.reducer;