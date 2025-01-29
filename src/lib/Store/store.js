import { configureStore } from "@reduxjs/toolkit";
import { wishSlice } from "../Reducers/wishListSlice";

const store = configureStore({
    reducer:{
        wishList: wishSlice.reducer,
    }
});

export default store;
