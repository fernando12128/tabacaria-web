import { useState } from "react";
import "./Kits.css";

export default function Kits() {
  const [selectedKit, setSelectedKit] = useState("premium");

  const kits = [
    {
      id: "artesanal",
      title: "Kit Artesanal",
      description: "Produtos feitos à mão, vibe natural e raiz.",
      label: "HANDMADE",
      theme: "green",
      icon: "🍃",
    },
    {
      id: "bio",
      title: "Kit Biodegradável",
      description: "Consciência ecológica, materiais sustentáveis.",
      label: "ECO",
      theme: "green",
      icon: "🌱",
    },
    {
      id: "420",
      title: "Kit 4:20",
      description: "Lifestyle descontraído, acessórios temáticos.",
      label: "LIFESTYLE",
      theme: "green",
      icon: "✨",
    },
    {
      id: "premium",
      title: "Kit Premium Gold",
      description: "Itens limitados, materiais nobres e luxo.",
      label: "LIMITED",
      theme: "gold",
      icon: "👑",
    },
  ];

  return (
    <section className="kits-section" id="kits">
      <div className="kits-header">
        <span className="kits-tag">CURADORIA</span>

        <h2 className="kits-title">
          Escolha seu <span>estilo de kit</span>
        </h2>

        <p className="kits-subtitle">
          Quatro universos. Você escolhe a vibe e a gente cura tudo o que vem dentro.
        </p>

        <div className="kits-divider"></div>
      </div>

      <div className="kits-grid">
        {kits.map((kit) => {
          const isSelected = selectedKit === kit.id;

          return (
            <article
              key={kit.id}
              className={`kit-card ${kit.theme} ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedKit(kit.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedKit(kit.id);
                }
              }}
            >
              <div className={`kit-icon ${kit.theme}`}>{kit.icon}</div>

              <span className="kit-label">{kit.label}</span>

              <h3>{kit.title}</h3>
              <p>{kit.description}</p>

              <div className={`kit-footer ${isSelected ? "selected-footer" : ""}`}>
                <span>{isSelected ? "SELECIONADO" : "SELECIONAR"}</span>
                <div className={`circle ${isSelected ? "filled" : ""}`}></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}