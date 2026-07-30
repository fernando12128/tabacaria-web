import "./Categorias.css";

const Icon = ({ type }) => {
  const paths = {
    diamond: <path d="m4 9 4-5h8l4 5-8 11L4 9Zm0 0h16M8 4l4 16 4-16" />,
    spark: <path d="M12 3c.8 4.2 2.8 6.2 7 7-4.2.8-6.2 2.8-7 7-.8-4.2-2.8-6.2-7-7 4.2-.8 6.2-2.8 7-7Z" />,
    box: <path d="m5 8 7-4 7 4-7 4-7-4Zm0 0v8l7 4 7-4V8m-7 4v8" />,
    truck: <path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
    shield: <path d="M12 3 19 6v5c0 4.7-2.9 8-7 10-4.1-2-7-5.3-7-10V6l7-3Zm-3 8 2 2 4-4" />,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {paths[type]}
      </g>
    </svg>
  );
};

export default function Categorias() {
  return (
    <section className="categories-section" id="categorias">
      <div className="categories-heading">
        <p>CATEGORIAS</p>
        <h2>
          Uma seleção curta.
          <span> Escolhida com critério.</span>
        </h2>
      </div>

      <div className="categories-grid">
        <article className="category-card category-card-featured">
          <Icon type="diamond" />
          <div>
            <h3>Acessórios premium</h3>
            <p>
              Peças em alumínio anodizado, vidro e materiais nobres, com
              acabamento fosco e detalhes dourados.
            </p>
          </div>
        </article>

        <article className="category-card">
          <Icon type="spark" />
          <div>
            <h3>Isqueiros de design</h3>
            <p>Modelos recarregáveis, resistentes e feitos para durar.</p>
          </div>
        </article>

        <article className="category-card">
          <Icon type="box" />
          <div>
            <h3>Kits exclusivos</h3>
            <p>Combinações prontas em embalagens premium.</p>
          </div>
        </article>

        <article className="category-card">
          <Icon type="truck" />
          <div>
            <h3>Entrega discreta</h3>
            <p>Embalagem neutra e rastreio do pedido.</p>
          </div>
        </article>

        <article className="category-card">
          <Icon type="shield" />
          <div>
            <h3>Compra segura</h3>
            <p>Atendimento próximo e troca simples em até 7 dias.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
