import "./Historia.css";

const socialLinks = [
  {
    label: "Instagram",
    handle: "@primetobaccooficial",
    href: "https://www.instagram.com/primetobaccooficial/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "Prime Tobacco",
    href: "https://www.facebook.com/tabacaria.primetobacco/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.7 1.8-1.7H18V3.8c-.4-.1-1.4-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.5V10H8v3h3v8" />
      </svg>
    ),
  },
  {
    label: "Todos os links",
    handle: "@primetobacco",
    href: "https://allmylinks.com/primetobacco",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 14a4.5 4.5 0 0 0 6.4.1l2-2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1" />
        <path d="M14 10a4.5 4.5 0 0 0-6.4-.1l-2 2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1" />
      </svg>
    ),
  },
];

export default function Historia() {
  return (
    <section className="history-section" id="historia">
      <div className="history-container">
        <div className="history-heading">
          <span className="history-eyebrow">Nossa essência</span>
          <h2>
            Uma história construída <span>em família.</span>
          </h2>
        </div>

        <div className="history-grid">
          <article className="history-story-card">
            <div className="history-year" aria-hidden="true">
              <small>Desde</small>
              <strong>2017</strong>
            </div>

            <div className="history-copy">
              <span>História</span>
              <p>
                A Prime Tobacco saiu do papel em 2017 apenas com integrantes da
                família trabalhando e com pouquíssimo capital de investimento, e
                o que começou com um hobby se tornou o principal empreendimento
                dos seus Fundadores.
              </p>
              <p>
                Com muito amor e dedicação a Prime cresce mais a cada dia,
                levando as principais novidades do mundo do Tabaco/Headshop a
                seus amigos e clientes. Sendo uma das tabacarias pioneiras na
                região da Saúde, trabalhamos com diversos produtos importados
                que antes eram de difícil acesso em nosso país.
              </p>
            </div>
          </article>

          <aside className="history-side-card">
            <div>
              <span className="history-side-kicker">Acompanhe a Prime</span>
              <h3>Novidades, produtos e bastidores.</h3>
              <p>
                Siga nossos canais e fique por dentro de tudo o que chega à
                Prime Tobacco.
              </p>
            </div>

            <div className="history-socials" aria-label="Redes sociais da Prime Tobacco">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.label} da Prime Tobacco — abre em nova aba`}
                >
                  <span className="history-social-icon">{social.icon}</span>
                  <span>
                    <small>{social.label}</small>
                    <strong>{social.handle}</strong>
                  </span>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
