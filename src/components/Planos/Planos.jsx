import "./Planos.css";

export default function Planos() {
  return (
    <section className="plans-section" id="planos">
      <div className="plans-header">
        <span className="plans-tag">ESCOLHA SUA FREQUÊNCIA</span>

        <h2 className="plans-title">
          Planos para cada <span>ritual</span>
        </h2>

        <p className="plans-subtitle">
          Sem fidelidade obrigatória. Cancele ou troque de plano quando quiser.
        </p>

        <div className="plans-divider"></div>
      </div>

      <div className="plans-grid">
        <article className="plan-card">
          <h3 className="plan-name">Mensal</h3>
          <p className="plan-description">Flexível, cancele quando quiser.</p>

          <div className="plan-price">
            <span className="price">R$ 119</span>
            <span className="period">/mês</span>
          </div>

          <ul className="plan-features">
            <li>1 kit por mês</li>
            <li>Frete grátis BR</li>
            <li>Cancele a qualquer momento</li>
          </ul>

          <button className="plan-button gold">Assinar Mensal</button>
        </article>

        <article className="plan-card featured">
          <div className="featured-badge">✦ MAIS POPULAR</div>

          <h3 className="plan-name">Quinzenal</h3>
          <p className="plan-description">
            Mais frequente, melhor custo-benefício.
          </p>

          <div className="plan-price featured-price">
            <span className="price">R$ 219</span>
            <span className="period">/mês</span>
          </div>

          <ul className="plan-features featured-features">
            <li>2 kits por mês</li>
            <li>Itens bônus exclusivos</li>
            <li>Acesso a drops limitados</li>
          </ul>

          <button className="plan-button green">Assinar Quinzenal</button>
        </article>

        <article className="plan-card">
          <h3 className="plan-name">Anual</h3>
          <p className="plan-description">Maior desconto + brindes exclusivos.</p>

          <div className="plan-price">
            <span className="price">R$ 1.190</span>
            <span className="period">/ano</span>
          </div>

          <ul className="plan-features">
            <li>12 kits + 2 grátis</li>
            <li>Kit aniversário Gold</li>
            <li>Acesso vitalício a drops</li>
          </ul>

          <button className="plan-button gold">Assinar Anual</button>
        </article>
      </div>
    </section>
  );
}