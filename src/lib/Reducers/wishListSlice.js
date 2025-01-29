import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishLists: [],
};

export const wishSlice = createSlice({
  name: "wishes",
  initialState,
  reducers: {
    addWishe: (state, action) => {
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

export const { addWishe, removeWish } = wishSlice.actions;
export default wishSlice.reducer;
