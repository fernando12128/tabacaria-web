import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import "./CartDrawer.css";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const {
    cartItems,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    formattedTotalPrice,
  } = useCart();

  function handleFinishClick() {
    closeCart();

    if (user) {
      navigate("/checkout");
      return;
    }

    navigate("/login", {
      state: { from: "/checkout", checkout: true },
    });
  }

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "show" : ""}`}
        onClick={closeCart}
      ></div>

      <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <svg className="cart-title-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 8h10l-1 10H8L7 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            <h2>Seu Carrinho</h2>
          </div>

          <button className="cart-close" type="button" onClick={closeCart}>
            ×
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
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-content">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <small>Estoque: {item.stock}</small>
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
                    disabled={item.quantity >= item.stock}
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

          <button
            type="button"
            className="cart-checkout-btn"
            onClick={handleFinishClick}
            disabled={cartItems.length === 0 || loading}
          >
            {loading ? "Verificando conta..." : "Finalizar compra"}
          </button>
        </div>
      </aside>
    </>
  );
}
