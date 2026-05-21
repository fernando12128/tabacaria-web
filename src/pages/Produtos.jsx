import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { listStoreProducts } from "../services/productsService";
import "./Produtos.css";

export default function Produtos() {
  const [activeFilter, setActiveFilter] = useState("all");
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

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter(
          (product) =>
            (product.categorySlug || product.category) === activeFilter
        );

  return (
    <main className="products-page">
      <section className="products-header">
        <span className="products-tag">CATÁLOGO</span>

        <h1>
          Todos os <span>produtos</span>
        </h1>

        <p>Monte seu kit do seu jeito com os itens disponíveis na loja.</p>

        <Link className="products-back" to="/">
          ← Voltar para home
        </Link>
      </section>

      <section>
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

                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-content">
                <h3>{product.name}</h3>

                <p>{product.price}</p>

                <span className={product.stock > 0 ? "stock-ok" : "stock-out"}>
                  {product.stock > 0
                    ? `${product.stock} em estoque`
                    : "Indisponível"}
                </span>
              </div>

              <button
                className="product-button"
                type="button"
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "+ Adicionar" : "Sem estoque"}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}