import type { Product } from "../features/products/products.types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return <p>Không có sản phẩm.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
