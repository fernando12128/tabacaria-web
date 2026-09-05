import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { formatMoney, productPriceValue } from "../lib/money";
import "./Checkout.css";

function formatAddress(profile) {
  const firstLine = [profile.street, profile.number].filter(Boolean).join(", ");
  const secondLine = [profile.neighborhood, profile.city, profile.state]
    .filter(Boolean)
    .join(" · ");

  return [firstLine, profile.complement, secondLine].filter(Boolean);
}

export default function Checkout() {
  const { cartItems, formattedTotalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
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
          <span>REVISÃO DO CARRINHO</span>
          <h1>
            Confira seus itens.<br />
            <strong>Prepare sua próxima compra.</strong>
          </h1>
          <p>Seu carrinho está salvo neste navegador. A compra online ainda não está disponível.</p>
        </header>

        <div className="checkout-grid">
          <section className="checkout-card" aria-labelledby="checkout-items-title">
            <div className="checkout-card-heading">
              <div>
                <span>SEU CARRINHO</span>
                <h2 id="checkout-items-title">Itens selecionados</h2>
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
                    <p>{formatMoney(productPriceValue(item))} por unidade</p>
                    <div className="checkout-quantity" role="group" aria-label={`Quantidade de ${item.name}`}>
                      <button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Diminuir quantidade de ${item.name}`}>−</button>
                      <output aria-live="polite">{item.quantity}</output>
                      <button type="button" onClick={() => increaseQuantity(item.id)} disabled={item.quantity >= item.stock || item.isAvailable === false} aria-label={`Aumentar quantidade de ${item.name}`}>+</button>
                      <button type="button" className="checkout-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remover ${item.name}`}>Remover</button>
                    </div>
                  </div>
                  <strong aria-label={`Subtotal de ${item.name}`}>{formatMoney(productPriceValue(item) * item.quantity)}</strong>
                </article>
              ))}
            </div>

            <div className="checkout-total">
              <span>Subtotal dos produtos</span>
              <strong aria-live="polite">{formattedTotalPrice}</strong>
            </div>
            <p className="checkout-subtotal-note">Frete não incluído. Os itens no carrinho não reservam estoque.</p>
          </section>

          <aside className="checkout-side">
            <section className="checkout-cashback">
              <div>
                <span>PRIME CASHBACK</span>
                <strong aria-label="Saldo indisponível">—</strong>
              </div>
              <p>
                A consulta e o uso do cashback pelo site ainda não estão disponíveis.
              </p>
            </section>

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
              <Link to="/minha-conta?aba=dados" state={{ from: "/checkout" }}>Conferir meus dados</Link>
            </section>

            <section className="checkout-next-step">
              <span>Compra online em breve</span>
              <strong>Entrega e pagamento ainda indisponíveis</strong>
              <p>
                Nenhum pedido foi enviado e nenhuma cobrança foi feita. Você pode
                ajustar seus itens e conferir o endereço enquanto a compra online não está disponível.
              </p>
              <Link to="/entregas-e-trocas">Informações de entrega e atendimento →</Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
