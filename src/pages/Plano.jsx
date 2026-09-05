import { Link, useParams } from "react-router-dom";
import { plans } from "../config/plans";
import NotFound from "./NotFound";
import "./InfoPage.css";

export default function Plano() {
  const { planId } = useParams();
  const plan = plans.find((item) => item.id === planId);
  if (!plan) return <NotFound />;

  return (
    <main className="info-page">
      <div className="info-shell">
        <span className="info-kicker">PRIME CLUB · {plan.price}/MÊS</span>
        <h1>Conheça o {plan.name}.</h1>
        <p className="info-intro">{plan.description}</p>
        <div className="info-sections">
          <section>
            <h2>O que está previsto no plano</h2>
            <ul className="plan-detail-features">
              {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </section>
          <section>
            <h2>Assinaturas online em breve</h2>
            <p>A contratação deste plano ainda não está disponível. Nenhuma assinatura foi criada e nenhuma cobrança será feita nesta página.</p>
            <p>Quando a contratação estiver disponível, você poderá conferir as condições de entrega, cobrança e cancelamento antes de assinar.</p>
            <div className="info-actions">
              <Link to="/#prime-club">Comparar planos</Link>
              <Link to="/produtos">Explorar catálogo</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
