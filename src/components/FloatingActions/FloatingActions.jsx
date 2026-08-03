import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import "./FloatingActions.css";

const WHATSAPP_NUMBER = "5511999999999";

const quickTopics = [
  {
    label: "Produtos",
    message: "Quero ajuda para escolher um produto.",
    reply:
      "Claro! Conte o que você procura ou adicione os produtos ao carrinho. Nosso atendimento pode ajudar a comparar as opções.",
  },
  {
    label: "Assinaturas",
    message: "Quero saber mais sobre as assinaturas.",
    reply:
      "Temos opções de assinatura para diferentes perfis. Você pode ver os planos no site ou chamar nossa equipe para escolher o melhor.",
  },
  {
    label: "Entrega",
    message: "Tenho uma dúvida sobre entrega.",
    reply:
      "Informe seu CEP e os produtos desejados ao continuar no WhatsApp. A equipe confirma prazo e disponibilidade para sua região.",
  },
  {
    label: "Meu pedido",
    message: "Preciso de ajuda com meu pedido.",
    reply:
      "Para localizar seu pedido com segurança, continue no WhatsApp e envie o nome usado na compra e o número do pedido.",
  },
];

const initialMessages = [
  {
    id: "welcome",
    sender: "assistant",
    text: "Olá! Bem-vindo à Prime Tobacco. Como podemos ajudar?",
  },
];

export default function FloatingActions() {
  const { cartItems, totalItems, formattedTotalPrice, isCartOpen } =
    useCart();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const messageIdRef = useRef(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") setIsChatOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  const whatsappUrl = useMemo(() => {
    const conversation = messages
      .filter((message) => message.sender === "customer")
      .map((message) => `• ${message.text}`)
      .join("\n");

    const cartSummary = cartItems.length
      ? cartItems
          .map((item) => `• ${item.quantity}x ${item.name || item.title}`)
          .join("\n")
      : "Nenhum produto no carrinho.";

    const text = [
      "Olá! Vim pelo site da Prime Tobacco.",
      conversation ? `\nMinhas dúvidas:\n${conversation}` : "",
      `\nMeu carrinho:\n${cartSummary}`,
      cartItems.length ? `Total: ${formattedTotalPrice}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [cartItems, formattedTotalPrice, messages]);

  function addExchange(customerText, assistantText) {
    messageIdRef.current += 1;
    const exchangeId = messageIdRef.current;

    setMessages((current) => [
      ...current,
      {
        id: `customer-${exchangeId}`,
        sender: "customer",
        text: customerText,
      },
      {
        id: `assistant-${exchangeId}`,
        sender: "assistant",
        text: assistantText,
      },
    ]);
  }

  function selectTopic(topic) {
    addExchange(topic.message, topic.reply);
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();

    if (!text) return;

    addExchange(
      text,
      "Recebemos sua mensagem. Para conversar com nossa equipe e ter uma resposta personalizada, continue pelo WhatsApp."
    );
    setDraft("");
  }

  return (
    <>
      {isChatOpen && (
        <aside
          className="support-chat"
          aria-label="Atendimento Prime Tobacco"
          aria-live="polite"
        >
          <header className="support-chat-header">
            <div className="support-chat-avatar" aria-hidden="true">
              <img src="/prime-tobacco-logo.png" alt="" />
            </div>
            <div>
              <strong>Prime Tobacco</strong>
              <span>
                <i aria-hidden="true" /> Atendimento via WhatsApp
              </span>
            </div>
            <button
              className="support-chat-close"
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Fechar chat"
            >
              ×
            </button>
          </header>

          <div className="support-chat-body">
            <p className="support-chat-day">Hoje</p>

            <div className="support-chat-messages">
              {messages.map((message) => (
                <p
                  key={message.id}
                  className={`support-message support-message-${message.sender}`}
                >
                  {message.text}
                </p>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="support-chat-topics" aria-label="Assuntos rápidos">
              {quickTopics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => selectTopic(topic)}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          <form className="support-chat-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="support-message">
              Digite sua mensagem
            </label>
            <input
              id="support-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Digite sua mensagem..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Enviar mensagem">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m4 4 17 8-17 8 3-8-3-8Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="support-whatsapp"
          >
            Continuar no WhatsApp
            {totalItems > 0 && <span>{totalItems} item(ns) no carrinho</span>}
          </a>

          <p className="support-chat-note">
            Ao continuar, sua mensagem e o carrinho serão preparados para o
            atendimento.
          </p>
        </aside>
      )}

      <div className="floating-actions">
        <button
          type="button"
          onClick={() => setIsChatOpen((current) => !current)}
          className="floating-btn floating-btn-chat"
          aria-label={isChatOpen ? "Fechar chat" : "Abrir chat"}
          aria-expanded={isChatOpen}
        >
          <svg viewBox="0 0 24 24" className="floating-icon" fill="none">
            <path
              d="M20 11.5C20 16.194 16.194 20 11.5 20c-1.493 0-2.896-.385-4.115-1.06L4 20l1.123-3.218A8.456 8.456 0 0 1 3 11.5C3 6.806 6.806 3 11.5 3S20 6.806 20 11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>
    </>
  );
}
