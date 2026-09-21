import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsThunks";
import type { ProductsState } from "./products.types";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Không thể tải sản phẩm";
      });
  },
});

export default productsSlice.reducer;
