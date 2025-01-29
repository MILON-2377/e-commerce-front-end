import { configureStore } from "@reduxjs/toolkit";
import { wishSlice } from "../Reducers/wishListSlice";
import { cartSlicer } from "../Reducers/addToCartSlicer";

const store = configureStore({
    reducer:{
        wishList: wishSlice.reducer,
        product: cartSlicer.reducer,
    }
});

export default store;
