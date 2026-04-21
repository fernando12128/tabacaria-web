import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Produtos.css";

const products = [
  { id: 1, category: "sedas", badge: "MAIS VENDIDO", name: "Sedas Premium", price: "R$ 14,90", image: "/images/produtos/sedas-premium.png" },
  { id: 2, category: "charuto", badge: "EXCLUSIVO", name: "Charuto Gold Edition", price: "R$ 49,90", image: "/images/produtos/charuto-gold.png" },
  { id: 3, category: "acessorios", badge: "LIMITADO", name: "Isqueiro Luxo", price: "R$ 89,90", image: "/images/produtos/isqueiro-luxo.png" },
  { id: 4, category: "acessorios", badge: "", name: "Dichavador Black & Gold", price: "R$ 119,90", image: "/images/produtos/dichavador-black-gold.png" },
  { id: 5, category: "sedas", badge: "NOVO", name: "Piteiras de Vidro", price: "R$ 29,90", image: "/images/produtos/piteiras-vidro.png" },
  { id: 6, category: "acessorios", badge: "", name: "Case Premium", price: "R$ 39,90", image: "/images/produtos/case-premium.png" },
  { id: 7, category: "acessorios", badge: "", name: "Cortador Luxo", price: "R$ 69,90", image: "/images/produtos/cortador-luxo.png" },
  { id: 8, category: "acessorios", badge: "", name: "Bandeja Black", price: "R$ 59,90", image: "/images/produtos/bandeja-black.png" },
];

const filters = [
  { label: "Todos", value: "all" },
  { label: "Sedas & Papéis", value: "sedas" },
  { label: "Acessórios", value: "acessorios" },
  { label: "Charutos", value: "charuto" },
];

export default function Produtos() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { addToCart } = useCart();

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <main className="products-page">
      <section className="products-header">
        <span className="products-tag">CATÁLOGO</span>

        <h1>
          Todos os <span>produtos</span>
        </h1>

        <p>Monte seu kit do seu jeito com os itens disponíveis na loja.</p>

        <Link to="/" className="products-back">
          ← Voltar para home
        </Link>
      </section>

      <div className="products-filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={activeFilter === filter.value ? "active" : ""}
            onClick={() => setActiveFilter(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="products-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            {product.badge && (
              <span className="product-badge">{product.badge}</span>
            )}

            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} />
              <div className="product-glow"></div>
            </div>

            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>

            <button
              className="product-button"
              type="button"
              onClick={() => addToCart(product)}
            >
              + Adicionar
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}