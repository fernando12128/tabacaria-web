import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback("Abrindo a demonstração da sua conta...");
    window.setTimeout(() => navigate("/minha-conta"), 450);
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="Prime Tobacco">
        <Link className="auth-brand" to="/">
          <i aria-hidden="true" />
          PRIME <strong>TOBACCO.</strong>
        </Link>

        <div className="auth-copy">
          <span className="auth-eyebrow">ÁREA DO CLIENTE</span>
          <h1>
            Sua experiência,
            <span>mais pessoal.</span>
          </h1>
          <p>
            Acompanhe seus pedidos, gerencie o Prime Club e mantenha seus dados
            de entrega sempre atualizados.
          </p>
        </div>

        <Link className="auth-back" to="/">
          ← Voltar para a loja
        </Link>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <h2>Bem-vindo de volta.</h2>
          <p className="auth-intro">
            Entre com os dados usados no seu cadastro.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">E-mail</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Senha</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                minLength="6"
                required
              />
            </div>

            {feedback && (
              <p className="auth-feedback" role="status">
                {feedback}
              </p>
            )}

            <button className="auth-submit" type="submit">
              Entrar
            </button>
          </form>

          <p className="auth-assist">
            Ainda não tem uma conta? <Link to="/cadastro">Criar cadastro</Link>
          </p>
          <p className="auth-demo-note">
            Acesso demonstrativo enquanto a autenticação real não está conectada.
          </p>
        </div>
      </section>
    </main>
  );
}
