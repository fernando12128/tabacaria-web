import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Auth.css";

export default function NovaSenha() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (password !== confirmation) {
      setFeedback("As senhas precisam ser iguais.");
      return;
    }

    setSubmitting(true);

    try {
      await updatePassword(password);
      navigate("/minha-conta", {
        replace: true,
        state: { passwordChanged: true },
      });
    } catch (error) {
      setFeedback(error.message || "Não foi possível atualizar sua senha.");
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
          <span className="auth-eyebrow">SEGURANÇA</span>
          <h1>
            Nova senha,
            <span>acesso protegido.</span>
          </h1>
          <p>Escolha uma senha nova para voltar à sua conta Prime Tobacco.</p>
        </div>

        <Link className="auth-back" to="/">
          ← Voltar para a loja
        </Link>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <h2>Defina sua nova senha.</h2>
          <p className="auth-intro">Use pelo menos 8 caracteres.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="new-password">Nova senha</label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength="8"
                disabled={submitting}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="new-password-confirmation">Confirmar senha</label>
              <input
                id="new-password-confirmation"
                type="password"
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                minLength="8"
                disabled={submitting}
                required
              />
            </div>

            {feedback && (
              <p className="auth-feedback is-error" role="alert">
                {feedback}
              </p>
            )}

            <button className="auth-submit" type="submit" disabled={submitting}>
              {submitting ? "Atualizando..." : "Salvar nova senha"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
