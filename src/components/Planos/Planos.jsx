import { Link } from "react-router-dom";
import { plans } from "../../config/plans";
import "./Planos.css";

export default function Planos() {
  return (
    <section className="plans-section" id="prime-club">
      <div className="plans-header">
        <span className="plans-tag">PRIME CLUB</span>
        <h2 className="plans-title">Kits mensais, sem <span>esforço.</span></h2>
        <p className="plans-subtitle">Conheça os planos. Assinaturas online em breve.</p>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <article className={`plan-card${plan.featured ? " featured" : ""}`} key={plan.id}>
            {plan.featured && <div className="featured-badge">Em destaque</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className={`plan-price${plan.featured ? " featured-price" : ""}`}>
              <span className="price">{plan.price}</span>
              <span className="period">/mês</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <Link className={`plan-button ${plan.featured ? "green" : "gold"}`} to={`/prime-club/${plan.id}`}>
              Conhecer {plan.name}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
