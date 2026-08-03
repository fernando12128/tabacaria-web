import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import "./Checkout.css";

function formatAddress(profile) {
  const firstLine = [profile.street, profile.number].filter(Boolean).join(", ");
  const secondLine = [profile.neighborhood, profile.city, profile.state]
    .filter(Boolean)
    .join(" · ");

  return [firstLine, secondLine].filter(Boolean);
}

export default function Checkout() {
  const { cartItems, formattedTotalPrice } = useCart();
  const { user } = useAuth();
  const profile = user?.user_metadata ?? {};
  const addressLines = formatAddress(profile);

  if (cartItems.length === 0) {
    return <Navigate to="/produtos" replace />;
  }

  return (
    <main className="checkout-page">
      <div className="checkout-shell">
        <header className="checkout-heading">
          <span>FINALIZAÇÃO DA COMPRA</span>
          <h1>
            Revise seu pedido.<br />
            <strong>Está quase pronto.</strong>
          </h1>
          <p>Você entrou na sua conta e seu carrinho foi preservado.</p>
        </header>

        <div className="checkout-grid">
          <section className="checkout-card" aria-labelledby="checkout-items-title">
            <div className="checkout-card-heading">
              <div>
                <span>SEU CARRINHO</span>
                <h2 id="checkout-items-title">Resumo do pedido</h2>
              </div>
              <Link to="/produtos">Adicionar itens</Link>
            </div>

            <div className="checkout-items">
              {cartItems.map((item) => (
                <article className="checkout-item" key={item.id}>
                  <div className="checkout-item-image">
                    <img src={item.image} alt="" />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantidade: {item.quantity}</p>
                  </div>
                  <strong>{item.price}</strong>
                </article>
              ))}
            </div>

            <div className="checkout-total">
              <span>Total dos produtos</span>
              <strong>{formattedTotalPrice}</strong>
            </div>
          </section>

          <aside className="checkout-side">
            <section className="checkout-card checkout-address">
              <span>ENTREGA</span>
              <h2>Endereço cadastrado</h2>
              {addressLines.length > 0 ? (
                <address>
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                  {profile.cep && <small>CEP {profile.cep}</small>}
                </address>
              ) : (
                <p>Complete seu endereço antes de avançar para o pagamento.</p>
              )}
              <Link to="/minha-conta">Conferir meus dados</Link>
            </section>

            <section className="checkout-next-step">
              <span>Próxima etapa</span>
              <strong>Entrega e pagamento</strong>
              <p>
                A autenticação do checkout está pronta. A seleção de frete e o
                pagamento serão conectados na próxima etapa.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
