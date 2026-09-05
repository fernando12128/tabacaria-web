import { Link } from "react-router-dom";
import "./FooterCTA.css";

export default function FooterCTA() {
  return (
    <footer className="footer-cta-section" id="sobre">
      <div className="footer-cta-container">
        <div className="footer-bottom">
          <div className="footer-brand-column">
            <Link className="footer-brand" to="/#topo">
              <i aria-hidden="true" />
              PRIME <strong>TOBACCO.</strong>
            </Link>
            <p>
              Curadoria para quem valoriza design, materiais nobres e uma
              experiência de compra simples.
            </p>
            <small>Venda permitida apenas para maiores de 18 anos.</small>
          </div>

          <div className="footer-links">
            <strong>Navegação</strong>
            <Link to="/produtos">Catálogo</Link>
            <Link to="/#categorias">Categorias</Link>
            <Link to="/#prime-club">Prime Club</Link>
            <Link to="/#historia">História</Link>
            <Link to="/#visite-nos">Visite-nos</Link>
            <Link to="/#faq">Perguntas frequentes</Link>
          </div>

          <div className="footer-links">
            <strong>Atendimento</strong>
            <span>Seg a sab, 9h às 22h</span>
            <span>Dom e feriado, 9h às 18h</span>
            <a href="mailto:contato@primetobacco.com.br">
              contato@primetobacco.com.br
            </a>
            <Link to="/entregas-e-trocas">Entregas e trocas</Link>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos de uso</Link>
          </div>
        </div>

        <p className="footer-copy">
          © 2026 Prime Tobacco. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
