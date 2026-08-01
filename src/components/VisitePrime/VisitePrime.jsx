import "./VisitePrime.css";

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Prime%20Tobacco%2C%20Alameda%20dos%20Guatas%2042%2C%20Sao%20Paulo";
const wazeUrl =
  "https://www.waze.com/ul?q=Alameda%20dos%20Guatas%2042%2C%20Sao%20Paulo&navigate=yes";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function VisitePrime() {
  return (
    <section className="visit-prime-section" id="visite-nos">
      <div className="visit-prime-container">
        <div className="visit-prime-heading">
          <span>Mais que uma tabacaria</span>
          <h2>
            Conheça a experiência <strong>Prime.</strong>
          </h2>
        </div>

        <div className="visit-prime-grid">
          <article className="reviews-card">
            <div className="reviews-card-top">
              <span className="google-mark" aria-hidden="true">G</span>
              <span>Avaliações no Google</span>
            </div>

            <div className="reviews-copy">
              <div className="review-stars" aria-label="Avaliações de clientes">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <h3>Clientes satisfeitos fazem parte da nossa história.</h3>
              <p>
                Confira as experiências compartilhadas por quem já visitou a
                Prime Tobacco e conheceu de perto nossa seleção e atendimento.
              </p>
            </div>

            <a
              className="reviews-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver avaliações no Google
              <ArrowIcon />
            </a>
          </article>

          <article className="store-visit-card">
            <div className="store-visit-glow" aria-hidden="true" />
            <div className="store-pin"><PinIcon /></div>

            <div className="store-visit-copy">
              <span>Loja física • Vila da Saúde</span>
              <h3>Venha viver a experiência Prime de perto.</h3>
              <p>
                Alameda dos Guatás, 42<br />
                Dentro do posto de gasolina<br />
                São Paulo — SP, CEP 04053-040
              </p>
              <small>Segunda a sábado, das 11h às 22h</small>
            </div>

            <div className="store-visit-actions">
              <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                Abrir no Google Maps
                <ArrowIcon />
              </a>
              <a href={wazeUrl} target="_blank" rel="noreferrer">
                Ir com Waze
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
