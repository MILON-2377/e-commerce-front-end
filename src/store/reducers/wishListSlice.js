import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishLists: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {

    setWishlist: (state, action) => {
      console.log(action.payload);
      state.wishLists = action.payload;
    },

    addToWishlistItem: (state, action) => {
      const isExist = state.wishLists.some(item => item.id === action.payload.id );
      if(!isExist){
        const wish = {
            id: action.payload.id,
            name: action.payload.name,
        };

        state.wishLists.push(wish);
      }
    },


    removeWish: (state, action) => {
      state.wishLists = state.wishLists.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWishlistItem, removeWish, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
