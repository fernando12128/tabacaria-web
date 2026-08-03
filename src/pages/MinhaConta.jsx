import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  findAddressByCep,
  formatCep,
  formatPhone,
  onlyDigits,
} from "../services/cepService";
import "./MinhaConta.css";

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

function EmptyOrders({ compact = false }) {
  return (
    <section className="account-section account-empty-orders">
      <span className="account-empty-icon" aria-hidden="true">
        <Icon name="pedidos" />
      </span>
      <div>
        <span className="account-kicker">
          {compact ? "PRIMEIRA COMPRA" : "SEUS PEDIDOS"}
        </span>
        <h2>{compact ? "Sua história começa aqui." : "Nenhum pedido ainda."}</h2>
        <p>
          Quando você finalizar uma compra, o acompanhamento e o histórico
          aparecerão nesta área.
        </p>
      </div>
      <a href="/produtos">Explorar catálogo →</a>
    </section>
  );
}

function profileToForm(metadata) {
  return {
    full_name: metadata.full_name ?? "",
    phone: formatPhone(metadata.phone ?? ""),
    cep: formatCep(metadata.cep ?? ""),
    street: metadata.street ?? "",
    number: metadata.number ?? "",
    complement: metadata.complement ?? "",
    neighborhood: metadata.neighborhood ?? "",
    city: metadata.city ?? "",
    state: metadata.state ?? "",
    adult_confirmed: metadata.adult_confirmed === true,
  };
}

function ProfileForm({ user }) {
  const metadata = user.user_metadata ?? {};
  const { updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");
  const [form, setForm] = useState(() => profileToForm(metadata));

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleCepChange(event) {
    const cep = formatCep(event.target.value);
    updateField("cep", cep);

    if (onlyDigits(cep).length !== 8) return;

    try {
      const address = await findAddressByCep(cep);
      setForm((current) => ({ ...current, ...address }));
      setFeedbackType("success");
      setFeedback("Endereço atualizado pelo CEP. Confira o número.");
    } catch (error) {
      setFeedbackType("error");
      setFeedback(error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setFeedback("");

    try {
      await updateProfile({
        ...form,
        phone: onlyDigits(form.phone),
        cep: onlyDigits(form.cep),
        state: form.state.toUpperCase(),
      });
      setFeedbackType("success");
      setFeedback("Dados atualizados com sucesso.");
      setEditing(false);
    } catch (error) {
      setFeedbackType("error");
      setFeedback(error.message || "Não foi possível salvar suas alterações.");
    } finally {
      setSaving(false);
    }
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
              setForm(profileToForm(metadata));
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
          <input
            value={form.full_name}
            onChange={(event) => updateField("full_name", event.target.value)}
            disabled={!editing || saving}
            required
          />
        </label>
        <label>
          E-mail
          <input type="email" value={user.email ?? ""} disabled />
        </label>
        <label>
          Telefone
          <input
            value={form.phone}
            onChange={(event) =>
              updateField("phone", formatPhone(event.target.value))
            }
            disabled={!editing || saving}
            required
          />
        </label>
        <label>
          CEP
          <input
            value={form.cep}
            onChange={handleCepChange}
            disabled={!editing || saving}
            maxLength="9"
            inputMode="numeric"
            required
          />
        </label>
        <label className="profile-field-wide">
          Rua / Avenida
          <input
            value={form.street}
            onChange={(event) => updateField("street", event.target.value)}
            disabled={!editing || saving}
            required
          />
        </label>
        <label>
          Número
          <input
            value={form.number}
            onChange={(event) => updateField("number", event.target.value)}
            disabled={!editing || saving}
            required
          />
        </label>
        <label>
          Complemento
          <input
            value={form.complement}
            onChange={(event) => updateField("complement", event.target.value)}
            disabled={!editing || saving}
          />
        </label>
        <label>
          Bairro
          <input
            value={form.neighborhood}
            onChange={(event) => updateField("neighborhood", event.target.value)}
            disabled={!editing || saving}
            required
          />
        </label>
        <label>
          Cidade
          <input
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            disabled={!editing || saving}
            required
          />
        </label>
        <label>
          Estado
          <input
            value={form.state}
            onChange={(event) =>
              updateField("state", event.target.value.slice(0, 2))
            }
            disabled={!editing || saving}
            maxLength="2"
            required
          />
        </label>

        {feedback && (
          <p className={`profile-feedback is-${feedbackType}`} role="status">
            {feedback}
          </p>
        )}

        {editing && (
          <div className="profile-actions">
            <button
              type="button"
              onClick={() => {
                setForm(profileToForm(metadata));
                setEditing(false);
                setFeedback("");
              }}
              disabled={saving}
            >
              Cancelar
            </button>
            <button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default function MinhaConta() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [signingOut, setSigningOut] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const metadata = user?.user_metadata ?? {};
  const name = metadata.full_name || user?.email?.split("@")[0] || "Cliente";
  const firstName = name.split(" ")[0];
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
    [name]
  );

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      navigate("/login", { replace: true });
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <main className="account-page">
      <div className="account-shell">
        <aside className="account-sidebar">
          <div className="account-profile">
            <span>{initials || "PT"}</span>
            <div>
              <strong>{name}</strong>
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

          <button
            className="account-signout"
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            <Icon name="sair" />
            {signingOut ? "Saindo..." : "Sair da conta"}
          </button>
        </aside>

        <div className="account-content">
          <header className="account-welcome">
            <div>
              <span className="account-kicker">MINHA CONTA</span>
              <h1>
                Olá, {firstName}.<br />
                <strong>Bom ter você aqui.</strong>
              </h1>
            </div>
            <span className="account-preview-badge">Conta verificada</span>
          </header>

          {activeTab === "inicio" && <EmptyOrders compact />}
          {activeTab === "pedidos" && <EmptyOrders />}
          {activeTab === "dados" && <ProfileForm user={user} />}
        </div>
      </div>
    </main>
  );
}
