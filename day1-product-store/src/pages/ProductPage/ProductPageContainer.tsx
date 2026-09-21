import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { fetchProducts } from "../../features/products/productsThunks";
import { ProductPageView } from "./ProductPageView";

export const ProductPageContainer = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  const cartItems = useAppSelector((state) => state.cart.items);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(keyword);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const handleAddToCart = (product: (typeof products)[number]) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
  };

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  return (
    <ProductPageView
      products={filteredProducts}
      totalProducts={products.length}
      cartItems={cartItems}
      cartCount={cartCount}
      cartTotal={cartTotal}
      categories={categories}
      search={search}
      category={category}
      loading={loading}
      error={error}
      onSearchChange={setSearch}
      onCategoryChange={setCategory}
      onClearFilters={handleClearFilters}
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
      onRetry={handleRetry}
    />
  );
};
