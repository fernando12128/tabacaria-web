import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { listStoreProducts } from "../services/productsService";
import "./Produtos.css";

export default function Produtos() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
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

        setProducts(data);
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

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("pt-BR");

    const filtered = products.filter((product) => {
      const matchesCategory =
        activeFilter === "all" ||
        (product.categorySlug || product.category) === activeFilter;
      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.category || ""}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "price-asc") {
      return [...filtered].sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    }

    if (sortOrder === "price-desc") {
      return [...filtered].sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    }

    if (sortOrder === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    }

    return filtered;
  }, [activeFilter, products, searchTerm, sortOrder]);

  return (
    <main className="products-page">
      <section className="products-header">
        <div>
          <span className="products-tag">CATÁLOGO</span>
          <h1>
            Escolhas com <span>personalidade.</span>
          </h1>
          <p>Descubra peças selecionadas para elevar cada detalhe.</p>
        </div>

        <Link className="products-back" to="/">← Voltar</Link>
      </section>

      <section>
        <div className="products-toolbar">
          <label className="products-search">
            <span className="sr-only">Buscar produtos</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar no catálogo"
            />
          </label>

          <label className="products-sort">
            <span className="sr-only">Ordenar produtos</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="name">Nome A–Z</option>
            </select>
          </label>
        </div>

        <div className="products-filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={activeFilter === filter.value ? "active" : ""}
              onClick={() => setActiveFilter(filter.value)}
              type="button"
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {isLoading && (
          <p className="products-message">Carregando produtos do estoque...</p>
        )}

        {errorMessage && <p className="products-message">{errorMessage}</p>}

        {!isLoading && !errorMessage && filteredProducts.length === 0 && (
          <p className="products-message">Nenhum produto disponível.</p>
        )}

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}

              <div className="product-image-wrap">
                <div className="product-glow"></div>

                <img src={product.image} alt={product.name} loading="lazy" />
              </div>

              <div className="product-content">
                <small>{product.category || "Acessórios"}</small>
                <h3>{product.name}</h3>
                <div className="product-content-footer">
                  <p>{product.price}</p>
                  <button
                    className="product-button"
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    aria-label={`Adicionar ${product.name} ao carrinho`}
                  >
                    {product.stock > 0 ? "+" : "×"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
