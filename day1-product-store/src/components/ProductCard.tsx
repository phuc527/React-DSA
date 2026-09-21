import type { Product } from "../features/products/products.types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <article className="product-card">
      <img className="product-image" src={product.image} alt={product.title} />

      <div className="product-content">
        <span className="product-category">{product.category}</span>

        <h2>{product.title}</h2>

        <p>{product.description}</p>

        <strong>${product.price.toFixed(2)}</strong>

        <button className="add-button" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};
