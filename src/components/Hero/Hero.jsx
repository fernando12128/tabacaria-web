import { useEffect, useRef, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [openProgress, setOpenProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let animationFrameId = null;

    function handleScroll() {
      if (animationFrameId) return;

      animationFrameId = window.requestAnimationFrame(() => {
        const section = sectionRef.current;

        if (!section) {
          animationFrameId = null;
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;
        const openingDistance = Math.max(window.innerHeight * 0.5, 360);
        const progress = Math.min(
          Math.max((-sectionTop - 36) / openingDistance, 0),
          1
        );

        setOpenProgress(progress);
        animationFrameId = null;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
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
    <section className="hero-section" id="topo" ref={sectionRef}>
      <div className="background-glow"></div>
      <div className="background-noise"></div>

      <main className="hero">
        <div className="hero-copy">
          <div className="edition-badge">
            <span className="dot"></span>
            CURADORIA PREMIUM
          </div>

          <h1 className="title">
            Eleve a sua <span className="highlight">experiência.</span>
          </h1>

          <p className="subtitle">
            Produtos selecionados, acessórios premium e kits exclusivos
            entregues todos os meses.
          </p>

          <div className="hero-buttons">
            <a href="#catalogo" className="btn btn-primary">
              Explorar catálogo <span aria-hidden="true">→</span>
            </a>

            <a href="#prime-club" className="btn btn-secondary">
              Conhecer o Prime Club
            </a>
          </div>

          <p className="scroll-text">
            <span aria-hidden="true">↓</span> Role para abrir a caixa
          </p>
        </div>

        <div className="hero-visual" aria-label="Caixa Prime Tobacco abrindo">
          <div className="hero-box-stage">
            <div
              className="hero-box-image-wrap"
              style={{
                transform: `translateY(${openProgress * -12}px) scale(${1 + openProgress * 0.04})`,
              }}
            >
              <img
                src="/images/box-closed.png"
                alt=""
                className="box-image layer-closed"
                style={{ opacity: closed }}
              />
              <img
                src="/images/box-opening.png"
                alt=""
                className="box-image layer-opening"
                style={{ opacity: opening }}
              />
              <img
                src="/images/box-open.png"
                alt=""
                className="box-image layer-open"
                style={{ opacity: open }}
              />
              <div
                className="box-image-glow"
                style={{
                  opacity: 0.22 + openProgress * 0.72,
                  transform: `translateX(-50%) scale(${1 + openProgress * 0.38})`,
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
