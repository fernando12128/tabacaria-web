import { useState } from "react";
import { Link } from "react-router-dom";
import "./MinhaConta.css";

const orders = [
  {
    id: "PT-1048",
    date: "29 jul. 2026",
    status: "Em transporte",
    total: "R$ 189,70",
    items: "Kit Prime Mensal + 2 acessórios",
  },
  {
    id: "PT-0982",
    date: "02 jul. 2026",
    status: "Entregue",
    total: "R$ 94,80",
    items: "3 produtos",
  },
  {
    id: "PT-0911",
    date: "10 jun. 2026",
    status: "Entregue",
    total: "R$ 129,90",
    items: "Kit Essential",
  },
];

const tabs = [
  { id: "inicio", label: "Visão geral" },
  { id: "pedidos", label: "Meus pedidos" },
  { id: "dados", label: "Meus dados" },
];

function Icon({ name }) {
  const paths = {
    inicio: <path d="M4 11.5 12 5l8 6.5V20H4v-8.5ZM9 20v-5h6v5" />,
    pedidos: (
      <>
        <path d="M5 7h14v13H5V7Z" />
        <path d="M8 7a4 4 0 0 1 8 0" />
      </>
    ),
    dados: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20c.8-3.5 3-5.5 6.5-5.5s5.7 2 6.5 5.5" />
      </>
    ),
    sair: <path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" />,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function CurrentOrder() {
  return (
    <article className="account-current-order">
      <div className="account-order-heading">
        <div>
          <span className="account-kicker">PEDIDO EM ANDAMENTO</span>
          <h2>Seu pedido está a caminho.</h2>
        </div>
        <span className="account-status">
          <i aria-hidden="true" />
          Em transporte
        </span>
      </div>

      <div className="account-order-meta">
        <span>Pedido #PT-1048</span>
        <span>Previsão: 31 de julho</span>
        <strong>R$ 189,70</strong>
      </div>

      <ol className="order-timeline" aria-label="Acompanhamento do pedido">
        <li className="is-complete">
          <i />
          <span>Confirmado</span>
          <small>29 jul. · 14:20</small>
        </li>
        <li className="is-complete">
          <i />
          <span>Preparado</span>
          <small>29 jul. · 16:45</small>
        </li>
        <li className="is-active">
          <i />
          <span>Em transporte</span>
          <small>30 jul. · 09:10</small>
        </li>
        <li>
          <i />
          <span>Entregue</span>
          <small>Aguardando</small>
        </li>
      </ol>

      <div className="account-order-actions">
        <button type="button">Ver detalhes do pedido</button>
        <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
          Preciso de ajuda
        </a>
      </div>
    </article>
  );
}

function OrderHistory({ compact = false }) {
  const visibleOrders = compact ? orders.slice(1, 3) : orders;

  return (
    <section className="account-section">
      <div className="account-section-heading">
        <div>
          <span className="account-kicker">HISTÓRICO</span>
          <h2>{compact ? "Últimos pedidos" : "Todos os pedidos"}</h2>
        </div>
        {compact && (
          <button type="button" className="account-text-button">
            Ver histórico completo →
          </button>
        )}
      </div>

      <div className="orders-list">
        {visibleOrders.map((order) => (
          <article className="order-row" key={order.id}>
            <div className="order-row-id">
              <strong>#{order.id}</strong>
              <span>{order.date}</span>
            </div>
            <p>{order.items}</p>
            <span
              className={`order-row-status ${
                order.status === "Entregue" ? "is-delivered" : ""
              }`}
            >
              {order.status}
            </span>
            <strong className="order-row-total">{order.total}</strong>
            <button type="button" aria-label={`Ver pedido ${order.id}`}>
              →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfileForm() {
  const [editing, setEditing] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setEditing(false);
    setFeedback(
      "Alterações validadas. Elas serão salvas de verdade quando conectarmos o backend."
    );
  }

  return (
    <section className="account-section">
      <div className="account-section-heading">
        <div>
          <span className="account-kicker">CADASTRO</span>
          <h2>Dados pessoais e entrega</h2>
        </div>
        {!editing && (
          <button
            className="account-outline-button"
            type="button"
            onClick={() => {
              setEditing(true);
              setFeedback("");
            }}
          >
            Alterar dados
          </button>
        )}
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Nome completo
          <input defaultValue="Cliente Prime" disabled={!editing} />
        </label>
        <label>
          E-mail
          <input
            type="email"
            defaultValue="cliente@exemplo.com"
            disabled={!editing}
          />
        </label>
        <label>
          Telefone
          <input defaultValue="(00) 00000-0000" disabled={!editing} />
        </label>
        <label>
          CEP
          <input defaultValue="00000-000" disabled={!editing} />
        </label>
        <label className="profile-field-wide">
          Endereço
          <input
            defaultValue="Rua Exemplo, 100 — Centro"
            disabled={!editing}
          />
        </label>
        <label>
          Complemento
          <input defaultValue="Apto. 42" disabled={!editing} />
        </label>

        {feedback && (
          <p className="profile-feedback" role="status">
            {feedback}
          </p>
        )}

        {editing && (
          <div className="profile-actions">
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFeedback("");
              }}
            >
              Cancelar
            </button>
            <button type="submit">Salvar alterações</button>
          </div>
        )}
      </form>

      <div className="account-security">
        <div>
          <strong>Senha e segurança</strong>
          <span>Atualize sua senha de acesso à Prime Tobacco.</span>
        </div>
        <button type="button">Alterar senha</button>
      </div>
    </section>
  );
}

export default function MinhaConta() {
  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <main className="account-page">
      <div className="account-shell">
        <aside className="account-sidebar">
          <div className="account-profile">
            <span>CP</span>
            <div>
              <strong>Cliente Prime</strong>
              <small>Cliente Prime</small>
            </div>
          </div>

          <nav aria-label="Menu da conta">
            {tabs.map((tab) => (
              <button
                className={activeTab === tab.id ? "is-active" : ""}
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon name={tab.id} />
                {tab.label}
              </button>
            ))}
          </nav>

          <Link className="account-signout" to="/login">
            <Icon name="sair" />
            Sair da conta
          </Link>
        </aside>

        <div className="account-content">
          <header className="account-welcome">
            <div>
              <span className="account-kicker">MINHA CONTA</span>
              <h1>
                Olá, cliente.<br />
                <strong>Bom ter você aqui.</strong>
              </h1>
            </div>
            <span className="account-preview-badge">Modo demonstração</span>
          </header>

          {activeTab === "inicio" && (
            <>
              <CurrentOrder />
              <OrderHistory compact />
            </>
          )}
          {activeTab === "pedidos" && (
            <>
              <CurrentOrder />
              <OrderHistory />
            </>
          )}
          {activeTab === "dados" && <ProfileForm />}
        </div>
      </div>
    </main>
  );
}
