import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsApi } from "./productsApi";
import type { Product } from "./products.types";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    return await getProductsApi();
  },
);
