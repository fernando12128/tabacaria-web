import { useState } from "react";
import "./FAQ.css";

const faqItems = [
  {
    question: "Já posso assinar o Prime Club?",
    answer:
      "Você já pode conhecer os planos e seus benefícios. A contratação online ainda não está disponível. Consultar um plano não inicia uma assinatura nem gera cobrança.",
  },
  {
    question: "Consigo finalizar uma compra pelo site?",
    answer:
      "Ainda não. Você pode explorar o catálogo e organizar seu carrinho, mas as etapas de frete e pagamento ainda não estão disponíveis. Nenhum pedido é confirmado ao adicionar produtos ou revisar o carrinho.",
  },
  {
    question: "Meu carrinho fica salvo?",
    answer:
      "Sim, os itens ficam salvos neste navegador, inclusive ao entrar na conta. Isso não reserva o estoque e o carrinho não é sincronizado entre dispositivos. Em dispositivos compartilhados, remova os itens ao terminar se não quiser mantê-los.",
  },
  {
    question: "Onde confiro meu endereço?",
    answer:
      "Em Minha conta, abra Meus dados. O CEP ajuda a preencher rua, bairro e cidade; confira também o número e o complemento.",
  },
  {
    question: "Para quais regiões vocês entregam?",
    answer:
      "A cobertura e os prazos de entrega online ainda não estão disponíveis. A consulta por CEP no cadastro preenche seu endereço, mas não confirma uma modalidade de envio. Consulte Entregas e trocas no rodapé para mais orientações.",
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
                type="button"
                id={`faq-question-${index}`}
                aria-controls={`faq-answer-${index}`}
                aria-expanded={isOpen}
                aria-label={item.question}
              >
                <span>{item.question}</span>
                <span className={`faq-icon ${isOpen ? "rotate" : ""}`}>⌄</span>
              </button>

              <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={!isOpen}>
                <p className="faq-answer">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
