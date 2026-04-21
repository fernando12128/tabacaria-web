import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import "./FloatingActions.css";

export default function FloatingActions() {
  const { totalItems, toggleCart, isCartOpen } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <div className="floating-actions">
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noreferrer"
        className="floating-btn floating-btn-chat"
        aria-label="Abrir chat"
      >
        <svg viewBox="0 0 24 24" className="floating-icon" fill="none">
          <path
            d="M20 11.5C20 16.194 16.194 20 11.5 20c-1.493 0-2.896-.385-4.115-1.06L4 20l1.123-3.218A8.456 8.456 0 0 1 3 11.5C3 6.806 6.806 3 11.5 3S20 6.806 20 11.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <button
        className="floating-btn floating-btn-cart"
        onClick={toggleCart}
        aria-label="Abrir carrinho"
        type="button"
      >
        {totalItems > 0 && <span className="floating-badge">{totalItems}</span>}

        <svg viewBox="0 0 24 24" className="floating-icon" fill="none">
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
      </button>
    </div>
  );
}