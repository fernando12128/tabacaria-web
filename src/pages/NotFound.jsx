import { Link } from "react-router-dom";
import "./InfoPage.css";

export default function NotFound() {
  return (
    <main className="info-page">
      <div className="info-shell">
        <span className="info-kicker">ERRO 404</span>
        <h1>Página não encontrada.</h1>
        <p className="info-intro">O endereço pode ter mudado ou estar incorreto. Continue pelo catálogo ou volte ao início.</p>
        <div className="info-actions">
          <Link to="/produtos">Explorar catálogo</Link>
          <Link to="/">Voltar ao início</Link>
        </div>
      </div>
    </main>
  );
}
