import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#topo" className="logo" onClick={closeMenu}>
          <div className="logo-icon">S</div>
          <span>
            SmokeBox <strong>Club</strong>
          </span>
        </a>

        <nav className={`nav ${mobileMenuOpen ? "nav-open" : ""}`}>
          <a href="#planos" onClick={closeMenu}>
            Planos
          </a>
          <a href="#kits" onClick={closeMenu}>
            Kits
          </a>
          <a href="#como-funciona" onClick={closeMenu}>
            Como funciona
          </a>
          <a href="#depoimentos" onClick={closeMenu}>
            Depoimentos
          </a>
          <a href="#faq" onClick={closeMenu}>
            FAQ
          </a>
        </nav>

        <div className="header-actions">
          <a href="#planos" className="btn btn-primary header-btn">
            Assinar Agora
          </a>

          <button
            className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
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