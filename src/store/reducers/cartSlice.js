import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products:[],
}

export const addToCartSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const id = action.payload;
            if(!state.products.includes(id)){
                state.products.push(id);
                console.log(id);
            }
        }
    }
});

export const {addToCart} = addToCartSlice.actions;
export default addToCartSlice.reducer;