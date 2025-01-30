import { configureStore } from "@reduxjs/toolkit";
import wishListReducer from "./reducers/wishListSlice";
import cartReducer from "./reducers/cartSlice";



export const store = configureStore({
    reducer:{
        wishList: wishListReducer,
        cart: cartReducer,
    }
});

export default store;
