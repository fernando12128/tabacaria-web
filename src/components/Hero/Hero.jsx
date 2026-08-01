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

  const boxFrames = [
    "/images/box-sequence/frame-01.webp",
    "/images/box-sequence/frame-02.webp",
    "/images/box-sequence/frame-03.webp",
    "/images/box-sequence/frame-04.webp",
    "/images/box-sequence/frame-05.webp",
  ];

  const frameTransitions = [
    { start: 0.18, end: 0.22 },
    { start: 0.38, end: 0.42 },
    { start: 0.58, end: 0.62 },
    { start: 0.78, end: 0.82 },
  ];

  function getFrameOpacities(progress) {
    const opacities = boxFrames.map(() => 0);
    const activeTransition = frameTransitions.findIndex(
      ({ start, end }) => progress >= start && progress < end
    );

    if (activeTransition >= 0) {
      const { start, end } = frameTransitions[activeTransition];
      const transitionProgress = (progress - start) / (end - start);

      opacities[activeTransition] = 1 - transitionProgress;
      opacities[activeTransition + 1] = transitionProgress;
      return opacities;
    }

    const completedTransitions = frameTransitions.filter(
      ({ end }) => progress >= end
    ).length;
    opacities[completedTransitions] = 1;
    return opacities;
  }

  const frameOpacities = getFrameOpacities(openProgress);

  const partnershipWords = [
    { label: "PARCEIRA", start: -0.12, end: 0 },
    { label: "OFICIAL", start: 0.3, end: 0.45 },
    { label: "DA", start: 0.48, end: 0.6 },
    { label: "BEM", start: 0.62, end: 0.78, accent: true },
    { label: "BOLADO", start: 0.8, end: 0.98, accent: true },
  ];

  function getWordProgress(start, end) {
    return Math.min(Math.max((openProgress - start) / (end - start), 0), 1);
  }

  return (
    <section className="hero-section" id="topo" ref={sectionRef}>
      <div className="background-glow"></div>
      <div className="background-noise"></div>

      <main className="hero">
        <aside
          className="partnership-rail"
          aria-label="Parceira oficial da Bem Bolado"
          style={{ "--partnership-progress": openProgress }}
        >
          <span className="partnership-copy" aria-hidden="true">
            {partnershipWords.map(({ label, start, end, accent }) => {
              const wordProgress = getWordProgress(start, end);

              return (
                <span
                  className={`partnership-word${accent ? " is-accent" : ""}`}
                  key={label}
                  style={{
                    "--word-progress": wordProgress,
                    "--word-shift": `${(1 - wordProgress) * -18}px`,
                  }}
                >
                  {label}
                </span>
              );
            })}
          </span>
        </aside>

        <div className="hero-copy">
          <div className="hero-badges" aria-label="Destaques da Prime Tobacco">
            <div className="edition-badge">
              <span className="dot"></span>
              CURADORIA PREMIUM
            </div>
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
                transform: `translateY(${Math.round(openProgress * -12)}px)`,
              }}
            >
              {boxFrames.map((src, index) => (
                <img
                  src={src}
                  alt=""
                  className="box-image"
                  key={src}
                  style={{
                    opacity: frameOpacities[index],
                    zIndex: index + 2,
                  }}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              ))}
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
