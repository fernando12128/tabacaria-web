import { useState } from "react";
import "./FAQ.css";

const faqItems = [
  {
    question: "Como funciona a assinatura?",
    answer:
      "Você escolhe o plano ideal, seleciona o estilo de kit que mais combina com você e recebe sua caixa de forma recorrente no endereço cadastrado.",
  },
  {
    question: "Posso trocar de kit todo mês?",
    answer:
      "Sim. Você pode alterar o estilo do seu kit antes do próximo ciclo de envio, de acordo com a disponibilidade da curadoria do mês.",
  },
  {
    question: "Tem fidelidade?",
    answer:
      "Não. Você pode cancelar, pausar ou trocar de plano quando quiser, sem burocracia.",
  },
  {
    question: "Como é a embalagem?",
    answer:
      "A embalagem é discreta, premium e pensada para proteger os itens durante o transporte, mantendo a experiência de unboxing especial.",
  },
  {
    question: "Para quais regiões vocês entregam?",
    answer:
      "Entregamos para todo o Brasil. O prazo pode variar conforme a sua região, mas você recebe rastreio para acompanhar cada etapa.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggleItem(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="faq-section" id="faq">
      <div className="faq-header">
        <span className="faq-tag">DÚVIDAS</span>

        <h2 className="faq-title">
          Perguntas <span>frequentes</span>
        </h2>

        <div className="faq-divider"></div>
      </div>

      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={item.question}
              className={`faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-label={item.question}
              >
                <span>{item.question}</span>
                <span className={`faq-icon ${isOpen ? "rotate" : ""}`}>⌄</span>
              </button>

              <div className={`faq-answer-wrapper ${isOpen ? "show" : ""}`}>
                <p className="faq-answer">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}