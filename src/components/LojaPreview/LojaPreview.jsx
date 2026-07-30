import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { listStoreProducts } from "../../services/productsService";
import "./LojaPreview.css";

export default function LojaPreview() {
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

        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error(error);
        setErrorMessage("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="shop-preview-section" id="catalogo">
      <div className="shop-preview-header">
        <div>
          <p className="shop-preview-tag">CATÁLOGO</p>
          <h2>
            Peças que elevam <span>o seu ritual.</span>
          </h2>
        </div>
        <Link className="catalog-link" to="/produtos">
          Ver catálogo completo <span aria-hidden="true">→</span>
        </Link>
      </div>

      {isLoading && (
        <div className="shop-grid" aria-label="Carregando produtos">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="shop-card shop-card-skeleton" key={index} />
          ))}
        </div>
      )}

      {errorMessage && <p className="shop-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && products.length === 0 && (
        <p className="shop-message">Nenhum produto disponível.</p>
      )}

      <div className="shop-grid">
        {products.map((product, index) => (
          <article className="shop-card" key={product.id}>
            {(product.badge || index < 2) && (
              <span className="badge">
                {product.badge || (index === 0 ? "NOVO" : "BEST SELLER")}
              </span>
            )}

            <div className="shop-card-image">
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>

            <div className="shop-card-content">
              <small>{product.category || "Acessórios"}</small>
              <h3>{product.name}</h3>
              <div className="shop-card-footer">
                <span className="price">{product.price}</span>
                <button
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
  );
}
