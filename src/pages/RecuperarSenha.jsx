import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Auth.css";

function recoveryMessage(error) {
  const message = error?.message?.toLowerCase() ?? "";

  if (message.includes("rate limit")) {
    return "Muitas solicitações seguidas. Aguarde um instante e tente novamente.";
  }

  return error?.message || "Não foi possível enviar o link. Tente novamente.";
}

export default function RecuperarSenha() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { resetPassword, isConfigured } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    setSubmitting(true);

    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (error) {
      setFeedback(recoveryMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="Prime Tobacco">
        <Link className="auth-brand" to="/">
          <i aria-hidden="true" />
          PRIME <strong>TOBACCO.</strong>
        </Link>

        <div className="auth-copy">
          <span className="auth-eyebrow">RECUPERAÇÃO DE ACESSO</span>
          <h1>
            Sua conta,
            <span>de volta em minutos.</span>
          </h1>
          <p>
            Enviaremos um link seguro para você criar uma nova senha e voltar
            à sua conta.
          </p>
        </div>

        <Link className="auth-back" to="/login">
          ← Voltar para o login
        </Link>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          {sent ? (
            <>
              <span className="auth-success-mark" aria-hidden="true">✓</span>
              <h2>Confira seu e-mail.</h2>
              <p className="auth-intro">
                Se existir uma conta vinculada a <strong>{email.trim()}</strong>,
                você receberá o link para criar uma nova senha.
              </p>
              <div className="auth-form">
                <button
                  className="auth-submit"
                  type="button"
                  onClick={() => setSent(false)}
                >
                  Reenviar o link
                </button>
                <Link className="auth-secondary-action" to="/login">
                  Voltar para o login
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2>Esqueceu sua senha?</h2>
              <p className="auth-intro">
                Digite o e-mail usado no cadastro para receber o link de
                recuperação.
              </p>

              {!isConfigured && (
                <p className="auth-configuration" role="status">
                  A autenticação aguarda a configuração do Supabase neste ambiente.
                </p>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-field">
                  <label htmlFor="recovery-email">E-mail</label>
                  <input
                    id="recovery-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={submitting}
                    required
                    autoFocus
                  />
                </div>

                {feedback && (
                  <p className="auth-feedback is-error" role="alert">
                    {feedback}
                  </p>
                )}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={submitting || !isConfigured}
                >
                  {submitting ? "Enviando..." : "Enviar link de recuperação"}
                </button>
              </form>

              <p className="auth-assist">
                Lembrou a senha? <Link to="/login">Entrar na conta</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
