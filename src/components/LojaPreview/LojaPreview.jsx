import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { listStoreProducts } from "../../services/productsService";
import "./LojaPreview.css";

export default function LojaPreview() {
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await listStoreProducts();

        setProducts(data.slice(0, 5));
      } catch (error) {
        console.error(error);
        setErrorMessage("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filters = useMemo(() => {
    const categories = Array.from(
      new Map(
        products.map((product) => [
          product.categorySlug || product.category,
          {
            label: product.category || "Produtos",
            value: product.categorySlug || product.category,
          },
        ])
      ).values()
    );

    return [
      {
        label: "Todos",
        value: "all",
      },
      ...categories,
    ];
  }, [products]);

  const filtered =
    active === "all"
      ? products
      : products.filter(
          (product) => (product.categorySlug || product.category) === active
        );

  return (
    <section className="shop-preview-section">
      <div className="shop-preview-header">
        <p className="shop-preview-tag">MONTE SEU KIT</p>

        <h2>
          Curtiu o que viu? <span>Leve agora pra casa.</span>
        </h2>

        <p>Escolha seus itens favoritos ou monte seu kit personalizado.</p>
      </div>

      <div className="shop-filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={active === filter.value ? "active" : ""}
            onClick={() => setActive(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="shop-message">Carregando produtos do estoque...</p>
      )}

      {errorMessage && <p className="shop-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && filtered.length === 0 && (
        <p className="shop-message">Nenhum produto disponível.</p>
      )}

      <div className="shop-grid">
        {filtered.map((product) => (
          <article className="shop-card" key={product.id}>
            {product.badge && <span className="badge">{product.badge}</span>}

            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <span className="price">{product.price}</span>

            <span className={product.stock > 0 ? "stock-ok" : "stock-out"}>
              {product.stock > 0
                ? `${product.stock} em estoque`
                : "Indisponível"}
            </span>

            <button
              type="button"
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "+ Adicionar" : "Sem estoque"}
            </button>
          </article>
        ))}
      </div>

      <div className="shop-action">
        <Link to="/produtos">Ver todos os produtos</Link>
      </div>
    </section>
  );
}