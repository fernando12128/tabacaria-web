import "./FooterCTA.css";

export default function FooterCTA() {
  return (
    <footer className="footer-cta-section">
      <div className="footer-cta-container">
        <section className="cta-box">
          <h2 className="cta-title">
            Pronto para abrir <span>sua primeira caixa?</span>
          </h2>

          <p className="cta-subtitle">
            Entre no clube hoje e receba o próximo drop em casa.
          </p>

          <button className="cta-button">Assinar Agora</button>
        </section>

        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="footer-logo-icon">S</div>
            <span>
              SmokeBox <strong>Club</strong>
            </span>
          </div>

          <p className="footer-copy">
            © 2026 SmokeBox Club. Venda permitida apenas para maiores de 18 anos.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a href="#" aria-label="Twitter" className="social-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 5.8c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.7-2.2 8 8 0 0 1-2.5 1A4 4 0 0 0 12 8.1a11.3 11.3 0 0 1-8.2-4.2 4 4 0 0 0 1.2 5.4A4 4 0 0 1 3 8.8v.1A4 4 0 0 0 6.2 13a4 4 0 0 1-1.8.1A4 4 0 0 0 8.1 16a8 1 8 0 0 1-5 1.7A11.3 11.3 0 0 0 9.3 19c7.4 0 11.5-6.2 11.5-11.5v-.5A8 8 0 0 0 22 5.8z" />
              </svg>
            </a>

            <a href="#" aria-label="YouTube" className="social-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12s0-3.3-.4-4.8a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.3 22 12 22 12Z" />
                <path d="M10 9.5 15 12l-5 2.5v-5Z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}