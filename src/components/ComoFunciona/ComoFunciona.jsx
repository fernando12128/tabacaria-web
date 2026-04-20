import "./ComoFunciona.css";

export default function ComoFunciona() {
  return (
    <section className="how-section" id="como-funciona">
      <div className="how-header">
        <span className="how-tag">SIMPLES ASSIM</span>

        <h2 className="how-title">
          Como <span>funciona</span>
        </h2>

        <div className="how-divider"></div>
      </div>

      <div className="how-steps">
        <div className="how-line"></div>

        <article className="how-card">
          <div className="step-badge">1</div>

          <div className="how-icon-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="how-icon"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.3 7l8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>

          <h3>Escolha seu plano</h3>
          <p>Mensal, quinzenal ou anual — total flexibilidade.</p>
        </article>

        <article className="how-card">
          <div className="step-badge">2</div>

          <div className="how-icon-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="how-icon"
            >
              <path d="M12 2l3 3-3 3-3-3 3-3z" />
              <path d="M5 9l3 3-3 3-3-3 3-3z" />
              <path d="M19 9l3 3-3 3-3-3 3-3z" />
              <path d="M12 16l3 3-3 3-3-3 3-3z" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </div>

          <h3>Escolha seu estilo</h3>
          <p>Artesanal, Bio, 4:20 ou Premium Gold.</p>
        </article>

        <article className="how-card">
          <div className="step-badge">3</div>

          <div className="how-icon-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="how-icon"
            >
              <rect x="1" y="6" width="15" height="10" rx="2" />
              <path d="M16 10h3l3 3v3h-6z" />
              <circle cx="5.5" cy="18.5" r="1.5" />
              <circle cx="18.5" cy="18.5" r="1.5" />
            </svg>
          </div>

          <h3>Receba em casa</h3>
          <p>Entrega discreta, rastreável e com frete grátis.</p>
        </article>
      </div>
    </section>
  );
}