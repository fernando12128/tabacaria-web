import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./LojaPreview.css";

const products = [
  { id: 1, category: "sedas", badge: "MAIS VENDIDO", name: "Sedas Premium", price: "R$ 14,90", image: "/images/produtos/sedas-premium.png" },
  { id: 2, category: "charuto", badge: "EXCLUSIVO", name: "Charuto Gold Edition", price: "R$ 49,90", image: "/images/produtos/charuto-gold.png" },
  { id: 3, category: "acessorios", badge: "LIMITADO", name: "Isqueiro Luxo", price: "R$ 89,90", image: "/images/produtos/isqueiro-luxo.png" },
  { id: 4, category: "acessorios", badge: "", name: "Dichavador Black & Gold", price: "R$ 119,90", image: "/images/produtos/dichavador-black-gold.png" },
  { id: 5, category: "sedas", badge: "NOVO", name: "Piteiras de Vidro", price: "R$ 29,90", image: "/images/produtos/piteiras-vidro.png" },
];

const filters = [
  { label: "Todos", value: "all" },
  { label: "Sedas & Papéis", value: "sedas" },
  { label: "Acessórios", value: "acessorios" },
  { label: "Charutos", value: "charuto" },
];

export default function LojaPreview() {
  const [active, setActive] = useState("all");
  const { addToCart } = useCart();

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section className="shop-preview-section">
      <div className="shop-preview-header">
        <span className="shop-preview-tag">MONTE SEU KIT</span>

        <h2>
          Curtiu o que viu? <span>Leve agora pra casa.</span>
        </h2>

        <p>
          Escolha seus itens favoritos ou monte seu kit personalizado.
        </p>
      </div>

      <div className="shop-filters">
        {filters.map((f) => (
          <button
            key={f.value}
            className={active === f.value ? "active" : ""}
            onClick={() => setActive(f.value)}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {filtered.map((p) => (
          <div className="shop-card" key={p.id}>
            {p.badge && <span className="badge">{p.badge}</span>}

            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>
            <span className="price">{p.price}</span>

            <button type="button" onClick={() => addToCart(p)}>
              + Adicionar
            </button>
          </div>
        ))}
      </div>

      <div className="shop-action">
        <Link to="/produtos">Ver todos os produtos</Link>
      </div>
    </section>
  );
}