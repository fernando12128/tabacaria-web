import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function Cadastro() {
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("passwordConfirmation")) {
      setFeedback("As senhas precisam ser iguais.");
      return;
    }

    setFeedback(
      "Cadastro validado. A criação da conta será ativada quando conectarmos esta tela ao backend."
    );
  }

  return (
    <main className="auth-page">
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
            Crie sua conta para agilizar compras, salvar o endereço de entrega
            e acompanhar sua assinatura Prime Club.
          </p>
        </div>

        <Link className="auth-back" to="/">
          ← Voltar para a loja
        </Link>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <h2>Crie sua conta.</h2>
          <p className="auth-intro">Preencha seus dados para começar.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="register-name">Nome completo</label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-address">Endereço</label>
              <input
                id="register-address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="Rua, número, complemento e bairro"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">E-mail</label>
              <input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                required
              />
            </div>

            <div className="auth-fields-row">
              <div className="auth-field">
                <label htmlFor="register-password">Senha</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mínimo de 6 caracteres"
                  minLength="6"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="register-password-confirmation">
                  Confirmar senha
                </label>
                <input
                  id="register-password-confirmation"
                  name="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repita sua senha"
                  minLength="6"
                  required
                />
              </div>
            </div>

            {feedback && (
              <p className="auth-feedback" role="status">
                {feedback}
              </p>
            )}

            <button className="auth-submit" type="submit">
              Criar conta
            </button>
          </form>

          <p className="auth-assist">
            Já possui uma conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
