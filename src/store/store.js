import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import wishlistReducer from "./reducers/wishListSlice";


export const store = configureStore({
    reducer:{
        wishlist: wishlistReducer,
        cart: cartReducer,
    }
});

export default store;
