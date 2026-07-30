import "./Planos.css";

export default function Planos() {
  return (
    <section className="plans-section" id="prime-club">
      <div className="plans-header">
        <span className="plans-tag">PRIME CLUB</span>

        <h2 className="plans-title">
          Kits mensais, sem <span>esforço.</span>
        </h2>

        <p className="plans-subtitle">
          Assine e receba uma curadoria nova todo mês. Pause ou cancele quando quiser.
        </p>
      </div>

      <div className="plans-grid">
        <article className="plan-card">
          <h3 className="plan-name">Essential</h3>
          <p className="plan-description">O ponto de partida para viver o Prime Club.</p>

          <div className="plan-price">
            <span className="price">R$ 119,00</span>
            <span className="period">/mês</span>
          </div>

          <ul className="plan-features">
            <li>3 a 4 itens selecionados</li>
            <li>Frete padrão incluso</li>
            <li>Cancelamento livre</li>
          </ul>

          <button className="plan-button gold">Assinar Essential</button>
        </article>

        <article className="plan-card featured">
          <div className="featured-badge">Mais escolhido</div>

          <h3 className="plan-name">Prime</h3>
          <p className="plan-description">
            A experiência completa, com acessórios premium.
          </p>

          <div className="plan-price featured-price">
            <span className="price">R$ 219,00</span>
            <span className="period">/mês</span>
          </div>

          <ul className="plan-features featured-features">
            <li>6 a 8 itens premium</li>
            <li>Acesso antecipado a lançamentos</li>
            <li>Frete expresso grátis</li>
            <li>Brinde exclusivo trimestral</li>
          </ul>

          <button className="plan-button green">Assinar Prime</button>
        </article>

        <article className="plan-card">
          <h3 className="plan-name">Black</h3>
          <p className="plan-description">Curadoria personalizada e peças de edição limitada.</p>

          <div className="plan-price">
            <span className="price">R$ 399,00</span>
            <span className="period">/mês</span>
          </div>

          <ul className="plan-features">
            <li>Curadoria personalizada</li>
            <li>Peças de edição limitada</li>
            <li>Concierge por WhatsApp</li>
            <li>Convites para eventos</li>
          </ul>

          <button className="plan-button gold">Assinar Black</button>
        </article>
      </div>
    </section>
  );
}
