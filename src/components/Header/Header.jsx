import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const navItems = [
  { label: "Planos", hash: "planos" },
  { label: "Kits", hash: "kits" },
  { label: "Como funciona", hash: "como-funciona" },
  { label: "Depoimentos", hash: "depoimentos" },
  { label: "FAQ", hash: "faq" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          aria-label="SmokeBox Club — voltar ao início"
        >
          <div className="logo-icon" aria-hidden="true">
            <span>S</span>
            <span>B</span>
          </div>
          <span className="logo-wordmark">
            SmokeBox <strong>Club</strong>
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
            to={getSectionLink("planos")}
            className="btn btn-primary header-btn"
            onClick={closeMenu}
          >
            Assinar Agora
          </Link>

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
