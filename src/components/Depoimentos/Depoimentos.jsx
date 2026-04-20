import "./Depoimentos.css";

export default function Depoimentos() {
  return (
    <section className="testimonials-section" id="depoimentos">
      <div className="testimonials-header">
        <span className="testimonials-tag">A COMUNIDADE</span>

        <h2 className="testimonials-title">
          Quem vive o <span>ritual</span>
        </h2>

        <div className="testimonials-divider"></div>
      </div>

      <div className="testimonials-grid">
        <article className="testimonial-card">
          <div className="stars">★★★★★</div>

          <p className="testimonial-text">
            “Cada caixa é uma surpresa. Sinto que estou abrindo um drop limitado
            todo mês. Vale cada centavo.”
          </p>

          <div className="testimonial-user">
            <div className="testimonial-avatar">R</div>

            <div>
              <h3>Rafael M.</h3>
              <span>Assinante há 8 meses</span>
            </div>
          </div>
        </article>

        <article className="testimonial-card">
          <div className="stars">★★★★★</div>

          <p className="testimonial-text">
            “Adorei o Kit Bio. Curadoria impecável e os brindes exclusivos são
            simplesmente lindos.”
          </p>

          <div className="testimonial-user">
            <div className="testimonial-avatar">B</div>

            <div>
              <h3>Bianca S.</h3>
              <span>Plano Anual</span>
            </div>
          </div>
        </article>

        <article className="testimonial-card">
          <div className="stars">★★★★★</div>

          <p className="testimonial-text">
            “Acessórios premium de verdade. O isqueiro do último kit virou meu
            favorito. Embalagem nível luxo.”
          </p>

          <div className="testimonial-user">
            <div className="testimonial-avatar">D</div>

            <div>
              <h3>Diego T.</h3>
              <span>Assinante quinzenal</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}