import type { Product } from "../../features/products/products.types";
import type { CartItem } from "../../features/cart/cartSlice";
import { Loading } from "../../components/Loading";
import { ProductList } from "../../components/ProductList";

interface ProductPageViewProps {
  products: Product[];
  totalProducts: number;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  categories: string[];
  search: string;
  category: string;
  loading: boolean;
  error: string | null;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onRetry: () => void;
}

export const ProductPageView = ({
  products,
  totalProducts,
  cartItems,
  cartCount,
  cartTotal,
  categories,
  search,
  category,
  loading,
  error,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
  onAddToCart,
  onRemoveFromCart,
  onRetry,
}: ProductPageViewProps) => {
  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">DAY 1 DESIGN PATTERN</p>

          <h1>Product Store</h1>

          <span>
            {products.length} / {totalProducts} products
          </span>
        </div>

        <div className="cart-summary">
          <div>
            🛒 Cart: <strong>{cartCount}</strong>
          </div>

          <div>
            Total: <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      </header>

      <section className="filters">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All categories" : item}
            </option>
          ))}
        </select>

        <button className="clear-button" onClick={onClearFilters}>
          Clear
        </button>
      </section>

      {loading && <Loading />}

      {!loading && error && (
        <div className="error">
          <p>{error}</p>

          <button onClick={onRetry}>Thử lại</button>
        </div>
      )}

      {!loading && !error && (
        <ProductList products={products} onAddToCart={onAddToCart} />
      )}

      <section className="cart-items">
        <div className="cart-title">
          <h2>Shopping Cart</h2>

          <strong>
            {cartCount} item{cartCount === 1 ? "" : "s"}
          </strong>
        </div>

        {cartItems.length === 0 && <p className="empty">Cart is empty.</p>}

        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.image} alt={item.product.title} />

            <div className="cart-item-info">
              <h3>{item.product.title}</h3>

              <p>
                ${item.product.price.toFixed(2)} × {item.quantity}
              </p>

              <strong>
                ${(item.product.price * item.quantity).toFixed(2)}
              </strong>
            </div>

            <div className="cart-actions">
              <button onClick={() => onRemoveFromCart(item.product.id)}>
                −
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => onAddToCart(item.product)}>+</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
