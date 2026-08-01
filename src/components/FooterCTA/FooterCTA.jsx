import "./FooterCTA.css";

export default function FooterCTA() {
  return (
    <footer className="footer-cta-section" id="sobre">
      <div className="footer-cta-container">
        <div className="footer-bottom">
          <div className="footer-brand-column">
            <a className="footer-brand" href="#topo">
              <i aria-hidden="true" />
              PRIME <strong>TOBACCO.</strong>
            </a>
            <p>
              Curadoria para quem valoriza design, materiais nobres e uma
              experiência de compra simples.
            </p>
            <small>Venda permitida apenas para maiores de 18 anos.</small>
          </div>

          <div className="footer-links">
            <strong>Navegação</strong>
            <a href="#catalogo">Catálogo</a>
            <a href="#categorias">Categorias</a>
            <a href="#prime-club">Prime Club</a>
            <a href="#historia">História</a>
            <a href="#visite-nos">Visite-nos</a>
          </div>

          <div className="footer-links">
            <strong>Atendimento</strong>
            <span>Seg a sex, 9h às 18h</span>
            <a href="mailto:contato@primetobacco.com.br">
              contato@primetobacco.com.br
            </a>
            <span>Trocas em até 7 dias</span>
          </div>
        </div>

        <p className="footer-copy">
          © 2026 Prime Tobacco. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
