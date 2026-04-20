import { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [openProgress, setOpenProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const heroSection = document.querySelector(".hero-section");

      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const sectionHeight = heroSection.offsetHeight;
      const visibleScroll = Math.min(Math.max(-rect.top, 0), sectionHeight * 0.9);
      const progress = Math.min(visibleScroll / (sectionHeight * 0.55), 1);

      setOpenProgress(progress);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getLayerOpacities(progress) {
    let closed = 0;
    let opening = 0;
    let open = 0;

    if (progress <= 0.18) {
      closed = 1;
      opening = progress / 0.18;
      open = 0;
    } else if (progress <= 0.45) {
      closed = 1 - (progress - 0.18) / 0.27;
      opening = 1;
      open = 0;
    } else if (progress <= 0.72) {
      closed = 0;
      opening = 1;
      open = (progress - 0.45) / 0.27;
    } else {
      closed = 0;
      opening = 1 - (progress - 0.72) / 0.28;
      open = 1;
    }

    return {
      closed: Math.max(0, Math.min(closed, 1)),
      opening: Math.max(0, Math.min(opening, 1)),
      open: Math.max(0, Math.min(open, 1)),
    };
  }

  const { closed, opening, open } = getLayerOpacities(openProgress);

  return (
    <section className="hero-section" id="topo">
      <div className="background-glow"></div>
      <div className="background-noise"></div>

      <main className="hero">
        <div className="edition-badge">
          <span className="dot"></span>
          EDIÇÃO #012 — ABRIL
        </div>

        <h1 className="title">
          Todo mês, uma <span className="highlight">nova</span>
          <br />
          <span className="highlight">experiência.</span>
        </h1>

        <p className="subtitle">Kits exclusivos para quem vive o ritual.</p>

        <div className="hero-buttons">
          <a href="#planos" className="btn btn-primary">
            Assinar Agora
          </a>

          <a href="#kits" className="btn btn-secondary">
            Ver kits
          </a>
        </div>

        <p className="scroll-text">↓ ROLE PARA ABRIR A CAIXA</p>

        <div className="hero-box-stage">
          <div
            className="hero-box-image-wrap"
            style={{
              transform: `translateY(${openProgress * -12}px) scale(${1 + openProgress * 0.05})`,
            }}
          >
            <img
              src="/images/box-closed.png"
              alt="Caixa fechada"
              className="box-image layer-closed"
              style={{
                opacity: closed,
                transform: `translateY(${openProgress * 4}px) scale(${1 - openProgress * 0.01})`,
              }}
            />

            <img
              src="/images/box-opening.png"
              alt="Caixa abrindo"
              className="box-image layer-opening"
              style={{
                opacity: opening,
                transform: `translateY(${openProgress * -4}px) scale(${1 + openProgress * 0.015})`,
              }}
            />

            <img
              src="/images/box-open.png"
              alt="Caixa aberta"
              className="box-image layer-open"
              style={{
                opacity: open,
                transform: `translateY(${openProgress * -10}px) scale(${1 + openProgress * 0.025})`,
              }}
            />

            <div
              className="box-image-glow"
              style={{
                opacity: 0.18 + openProgress * 0.95,
                transform: `translateX(-50%) scale(${1 + openProgress * 0.45})`,
              }}
            ></div>
          </div>
        </div>
      </main>
    </section>
  );
}