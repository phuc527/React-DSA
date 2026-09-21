import type { Product } from "../../features/products/products.types";
import { Loading } from "../../components/Loading";
import { ProductList } from "../../components/ProductList";

interface ProductPageViewProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const ProductPageView = ({
  products,
  loading,
  error,
  onRetry,
}: ProductPageViewProps) => {
  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">DAY 1 DESIGN PATTERN</p>
          <h1>Product Store</h1>
        </div>

        <span>{products.length} products</span>
      </header>

      {loading && <Loading />}

      {!loading && error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={onRetry}>Thử lại</button>
        </div>
      )}

      {!loading && !error && <ProductList products={products} />}
    </main>
  );
};
