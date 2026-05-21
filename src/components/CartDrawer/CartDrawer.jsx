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

  function handleFinishClick() {
    alert(
      "Checkout ainda não implementado. Por enquanto estamos integrando apenas produtos e estoque."
    );
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
            <span className="cart-title-icon">🛒</span>
            <h2>Seu Carrinho</h2>
          </div>

          <button className="cart-close" type="button" onClick={closeCart}>
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
            disabled={cartItems.length === 0}
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </>
  );
}