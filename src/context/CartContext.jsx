import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }

  function getProductPrice(product) {
    if (typeof product.priceValue === "number") {
      return product.priceValue;
    }

    if (typeof product.price === "number") {
      return product.price;
    }

    if (typeof product.price === "string") {
      return Number(
        product.price
          .replace("R$", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
      );
    }

    return 0;
  }

  function addToCart(product) {
    if (product.stock <= 0 || product.isAvailable === false) {
      alert("Produto indisponível no momento.");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          alert("Você já adicionou todo o estoque disponível deste produto.");
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  }

  function increaseQuantity(productId) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.stock) {
          alert("Estoque máximo atingido para este produto.");
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + getProductPrice(item) * item.quantity;
    }, 0);
  }, [cartItems]);

  const formattedTotalPrice = useMemo(() => {
    return totalPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, [totalPrice]);

  const value = {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    formattedTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart precisa ser usado dentro de CartProvider");
  }

  return context;
}