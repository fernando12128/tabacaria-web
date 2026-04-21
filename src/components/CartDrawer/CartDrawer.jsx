import { useCart } from "../../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    formattedTotalPrice,
  } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "show" : ""}`}
        onClick={closeCart}
      />

      <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <svg viewBox="0 0 24 24" className="cart-title-icon" fill="none">
              <path
                d="M7 7h10l-1 10H8L7 7Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 7a3 3 0 1 1 6 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <h2>Seu Carrinho</h2>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Seu carrinho está vazio.</p>
              <span>Adicione alguns itens para começar.</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-content">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>

                <div className="cart-item-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="qty-btn"
                  >
                    −
                  </button>

                  <span className="qty-value">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>{formattedTotalPrice}</strong>
          </div>

          <button type="button" className="cart-checkout-btn">
            Finalizar compra
          </button>
        </div>
      </aside>
    </>
  );
}