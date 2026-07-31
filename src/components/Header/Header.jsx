import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Header.css";

const navItems = [
  { label: "Catálogo", hash: "catalogo" },
  { label: "Categorias", hash: "categorias" },
  { label: "Prime Club", hash: "prime-club" },
  { label: "Sobre", hash: "sobre" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    if (!location.hash) return;

    const timeoutId = window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  function getSectionLink(hash) {
    return { pathname: "/", hash: `#${hash}` };
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to={getSectionLink("topo")}
          className="logo"
          onClick={closeMenu}
          aria-label="Prime Tobacco — voltar ao início"
        >
          <span className="logo-wordmark">
            <img
              className="logo-mark"
              src="/prime-tobacco-logo.svg"
              alt=""
              aria-hidden="true"
            />
            PRIME <strong>TOBACCO.</strong>
          </span>
        </Link>

        <nav
          className={`nav ${mobileMenuOpen ? "nav-open" : ""}`}
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <Link
              key={item.hash}
              to={getSectionLink(item.hash)}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            className="header-account"
            to="/minha-conta"
            onClick={closeMenu}
            aria-label="Abrir minha conta"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 19c.8-3.2 3-5 6.5-5s5.7 1.8 6.5 5" />
            </svg>
          </Link>

          <button
            className="header-cart"
            type="button"
            onClick={toggleCart}
            aria-label={`Abrir carrinho, ${totalItems} item(ns)`}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 8h10l-1 10H8L7 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            {totalItems > 0 && <span>{totalItems}</span>}
          </button>

          <button
            className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
