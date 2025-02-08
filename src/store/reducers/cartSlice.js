import apiUrl from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchCart = createAsyncThunk(
  "/cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiUrl("/cart/get");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res?.data || "Failed to fetch wishlist");
    }
  }
);

export const addToCartBackend = createAsyncThunk(
  "/cart/addToCartBackend",
  async (item, { rejectWithValue }) => {
    try {
      const res = await apiUrl.post("/cart/add", item);
      return res.data;
    } catch (error) {

      console.log(error.message);

      return rejectWithValue(
        error.res?.data || "Failed to add product to the cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {
      quantity: 0,
      totalItems: 0,
      totalPrice: 0,
      items: [],
    },
    cartStatus: "idle",
  },
  reducers: {
    addToCart: (state, action) => {
      const isExists = state.cartItems.some(
        (item) => item.id === action.payload.id
      );
      if (isExists) {
        state.cartItems.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.cartStatus = "loading";
        // console.log("loading")
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartStatus = "succeeded";

        const cart = action.payload.data;
        const { items, totalItems, totalPrice } = cart;

        // console.log("cat slice action log ", items)

        state.cartItems = {
          quantity: 0,
          totalItems,
          totalPrice,
          items,
        };
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        const cart = action.payload.data;
        const { items, totalItems, totalPrice } = cart;

        state.cartItems = {
          quantity: 0,
          totalItems,
          totalPrice,
          items,
        };

        Swal.fire({
          title: "Success!",
          text: "Product added to cart successfully.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000, // Auto close after 2 seconds
          timerProgressBar: true,
        });
      })

      .addCase(addToCartBackend.rejected, (state) => {
        state.cartStatus = "Failed tot add product to the cart";

        Swal.fire({
          title: "Error!",
          text: "Product already in cart!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
