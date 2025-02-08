import apiUrl from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiUrl.get("/wishlist/get");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res?.data || "Failed to fetch wishlist");
    }
  }
);

export const addToWishlistBackend = createAsyncThunk(
  "wishlist/addToWishlistBackend",
  async (item, { rejectWithValue }) => {
    try {
      const res = await apiUrl.post("/wishlist/add", item);
      return res.data ? res.data : [];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.res?.data || "Failed to add item");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    wishlistStatus: "idle",
  },
  reducers: {
    addToWishlist: (state, action) => {
      if (state.wishlists.includes(action.payload)) {
        state.wishlistStatus = "Item already in wishlist cart";

        
      } else {
        state.wishlists.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlists = state.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.wishlistStatus = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlistStatus = "succeeded";
        Swal.close();
        const data = action.payload.data.wishList;

        if (data) {
          state.wishlists = [...data];
        } else {
          state.wishlists = [];
        }

        // console.log(state.wishlists);
      })
      .addCase(addToWishlistBackend.fulfilled, (state, action) => {
        state.wishlists.push(action.payload);

        Swal.close();

        Swal.fire({
          title: "Success!",
          text: "Product added to wishlist successfully.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000, // Auto close after 2 seconds
          timerProgressBar: true,
        });
      })
      .addCase(addToWishlistBackend.rejected, (state) => {
        state.wishlistStatus = "Product already in wishlist";

        Swal.close();
        Swal.fire({
          title: "Error!",
          text: "Product already in cart!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
