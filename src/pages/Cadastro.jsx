import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  findAddressByCep,
  formatCep,
  formatPhone,
  onlyDigits,
} from "../services/cepService";
import "./Auth.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  password: "",
  passwordConfirmation: "",
  isAdult: false,
};

function registrationMessage(error) {
  const message = error?.message?.toLowerCase() ?? "";

  if (message.includes("already registered") || message.includes("already exists")) {
    return "Já existe uma conta com este e-mail.";
  }
  if (message.includes("password")) {
    return "A senha precisa ter pelo menos 8 caracteres.";
  }
  if (message.includes("rate limit")) {
    return "Muitas tentativas seguidas. Aguarde um instante e tente novamente.";
  }

  return error?.message || "Não foi possível criar sua conta. Tente novamente.";
}

export default function Cadastro() {
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [cepStatus, setCepStatus] = useState("idle");
  const [cepFeedback, setCepFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const cepRequest = useRef(null);
  const { signUp, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedDestination = location.state?.from;
  const destination =
    requestedDestination === "/checkout" ? "/checkout" : "/minha-conta";
  const isCheckoutRegistration = destination === "/checkout";

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function lookupCep(cep) {
    if (onlyDigits(cep).length !== 8) return;

    cepRequest.current?.abort();
    cepRequest.current = new AbortController();
    setCepStatus("loading");
    setCepFeedback("Buscando endereço...");

    try {
      const address = await findAddressByCep(cep, cepRequest.current.signal);
      setForm((current) => ({ ...current, ...address }));
      setCepStatus("success");
      setCepFeedback("Endereço encontrado. Agora informe o número.");
    } catch (error) {
      if (error.name === "AbortError") return;
      setCepStatus("error");
      setCepFeedback(error.message);
    }
  }

  function handleCepChange(event) {
    const cep = formatCep(event.target.value);
    updateField("cep", cep);
    setCepStatus("idle");
    setCepFeedback("");

    if (onlyDigits(cep).length === 8) lookupCep(cep);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (form.password !== form.passwordConfirmation) {
      setFeedbackType("error");
      setFeedback("As senhas precisam ser iguais.");
      return;
    }

    if (!form.isAdult) {
      setFeedbackType("error");
      setFeedback("Confirme que você tem 18 anos ou mais para continuar.");
      return;
    }

    setSubmitting(true);

    const profile = {
      full_name: form.name.trim(),
      phone: onlyDigits(form.phone),
      cep: onlyDigits(form.cep),
      street: form.street.trim(),
      number: form.number.trim(),
      complement: form.complement.trim(),
      neighborhood: form.neighborhood.trim(),
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
      adult_confirmed: true,
    };

    try {
      const data = await signUp({
        email: form.email.trim(),
        password: form.password,
        profile,
        redirectTo: destination,
      });

      if (data.session) {
        navigate(destination, { replace: true });
        return;
      }

      setFeedbackType("success");
      setFeedback(
        "Conta criada! Confirme o link enviado para o seu e-mail antes de entrar."
      );
      setForm((current) => ({
        ...current,
        password: "",
        passwordConfirmation: "",
      }));
    } catch (error) {
      setFeedbackType("error");
      setFeedback(registrationMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page auth-page-register">
      <section className="auth-showcase" aria-label="Prime Tobacco">
        <Link className="auth-brand" to="/">
          <i aria-hidden="true" />
          PRIME <strong>TOBACCO.</strong>
        </Link>

        <div className="auth-copy">
          <span className="auth-eyebrow">NOVO CADASTRO</span>
          <h1>
            Tudo pronto para
            <span>receber o melhor.</span>
          </h1>
          <p>
            Salve seu endereço uma vez e deixe as próximas compras muito mais
            rápidas.
          </p>
        </div>

        <Link className="auth-back" to="/">
          ← Voltar para a loja
        </Link>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap auth-form-register">
          <h2>Crie sua conta.</h2>
          <p className="auth-intro">
            {isCheckoutRegistration
              ? "Crie sua conta para continuar a compra. Seu carrinho está guardado."
              : "Digite o CEP e nós completamos o endereço para você."}
          </p>

          {!isConfigured && (
            <p className="auth-configuration" role="status">
              A autenticação aguarda a configuração do Supabase neste ambiente.
              A consulta de CEP já pode ser testada.
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-fields-row">
              <div className="auth-field">
                <label htmlFor="register-name">Nome completo</label>
                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="register-phone">WhatsApp</label>
                <input
                  id="register-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", formatPhone(event.target.value))
                  }
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            <div className="auth-address-block">
              <div className="auth-address-heading">
                <span>Endereço de entrega</span>
                <small>Preenchimento automático pelo CEP</small>
              </div>

              <div className="auth-address-grid">
                <div className="auth-field auth-field-cep">
                  <label htmlFor="register-cep">CEP</label>
                  <div className={`auth-input-status is-${cepStatus}`}>
                    <input
                      id="register-cep"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="00000-000"
                      value={form.cep}
                      onChange={handleCepChange}
                      onBlur={() => lookupCep(form.cep)}
                      maxLength="9"
                      aria-busy={cepStatus === "loading"}
                      aria-invalid={cepStatus === "error"}
                      aria-describedby={
                        cepFeedback ? "register-cep-feedback" : undefined
                      }
                      disabled={submitting}
                      required
                    />
                    {cepStatus === "loading" && (
                      <i className="cep-status-spinner" aria-hidden="true" />
                    )}
                    {cepStatus === "success" && (
                      <span className="cep-status-icon" aria-hidden="true">
                        ✓
                      </span>
                    )}
                    {cepStatus === "error" && (
                      <span className="cep-status-icon" aria-hidden="true">
                        ×
                      </span>
                    )}
                  </div>
                  {cepFeedback && (
                    <small
                      id="register-cep-feedback"
                      className="cep-feedback-sr"
                      role="status"
                    >
                      {cepFeedback}
                    </small>
                  )}
                </div>

                <div className="auth-field auth-field-street">
                  <label htmlFor="register-street">Rua / Avenida</label>
                  <input
                    id="register-street"
                    type="text"
                    autoComplete="address-line1"
                    placeholder="Logradouro"
                    value={form.street}
                    onChange={(event) => updateField("street", event.target.value)}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="auth-field auth-field-number">
                  <label htmlFor="register-number">Número</label>
                  <input
                    id="register-number"
                    type="text"
                    inputMode="numeric"
                    autoComplete="address-line2"
                    placeholder="123"
                    value={form.number}
                    onChange={(event) => updateField("number", event.target.value)}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="auth-field auth-field-complement">
                  <label htmlFor="register-complement">Complemento</label>
                  <input
                    id="register-complement"
                    type="text"
                    placeholder="Apto., bloco... (opcional)"
                    value={form.complement}
                    onChange={(event) =>
                      updateField("complement", event.target.value)
                    }
                    disabled={submitting}
                  />
                </div>

                <div className="auth-field auth-field-neighborhood">
                  <label htmlFor="register-neighborhood">Bairro</label>
                  <input
                    id="register-neighborhood"
                    type="text"
                    autoComplete="address-level3"
                    placeholder="Bairro"
                    value={form.neighborhood}
                    onChange={(event) =>
                      updateField("neighborhood", event.target.value)
                    }
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="auth-field auth-field-city">
                  <label htmlFor="register-city">Cidade</label>
                  <input
                    id="register-city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Cidade"
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    disabled={submitting}
                    required
                  />
                </div>

                <div className="auth-field auth-field-state">
                  <label htmlFor="register-state">UF</label>
                  <input
                    id="register-state"
                    type="text"
                    autoComplete="address-level1"
                    placeholder="SP"
                    value={form.state}
                    onChange={(event) =>
                      updateField("state", event.target.value.slice(0, 2))
                    }
                    disabled={submitting}
                    maxLength="2"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">E-mail</label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <div className="auth-fields-row">
              <div className="auth-field">
                <label htmlFor="register-password">Senha</label>
                <input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mínimo de 8 caracteres"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  disabled={submitting}
                  minLength="8"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="register-password-confirmation">
                  Confirmar senha
                </label>
                <input
                  id="register-password-confirmation"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repita sua senha"
                  value={form.passwordConfirmation}
                  onChange={(event) =>
                    updateField("passwordConfirmation", event.target.value)
                  }
                  disabled={submitting}
                  minLength="8"
                  required
                />
              </div>
            </div>

            <label className="auth-consent">
              <input
                type="checkbox"
                checked={form.isAdult}
                onChange={(event) => updateField("isAdult", event.target.checked)}
                disabled={submitting}
                required
              />
              <span>Confirmo que tenho 18 anos ou mais.</span>
            </label>

            {feedback && (
              <p
                className={`auth-feedback is-${feedbackType}`}
                role={feedbackType === "error" ? "alert" : "status"}
              >
                {feedback}
              </p>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={submitting || !isConfigured}
            >
              {submitting ? "Criando sua conta..." : "Criar conta"}
            </button>
          </form>

          <p className="auth-assist">
            Já possui uma conta?{" "}
            <Link to="/login" state={{ from: destination }}>
              Fazer login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
