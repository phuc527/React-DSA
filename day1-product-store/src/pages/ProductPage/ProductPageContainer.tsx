import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "../../features/products/productsThunks";
import { ProductPageView } from "./ProductPageView";

export const ProductPageContainer = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  return (
    <ProductPageView
      products={products}
      loading={loading}
      error={error}
      onRetry={handleRetry}
    />
  );
};
