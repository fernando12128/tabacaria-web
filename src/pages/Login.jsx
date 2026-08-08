import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Auth.css";

function authMessage(error) {
  const message = error?.message?.toLowerCase() ?? "";

  if (message.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (message.includes("email not confirmed")) {
    return "Confirme o e-mail enviado para você antes de entrar.";
  }
  if (message.includes("rate limit")) {
    return "Muitas tentativas seguidas. Aguarde um instante e tente novamente.";
  }

  return error?.message || "Não foi possível entrar. Tente novamente.";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, user, loading, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const requestedDestination = location.state?.from || searchParams.get("next");
  const destination =
    requestedDestination === "/checkout" ? "/checkout" : "/minha-conta";
  const isCheckoutLogin = destination === "/checkout";

  useEffect(() => {
    if (!loading && user) navigate(destination, { replace: true });
  }, [destination, loading, navigate, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
      navigate(destination, { replace: true });
    } catch (error) {
      setFeedbackType("error");
      setFeedback(authMessage(error));
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
            {isCheckoutLogin
              ? "Entre para continuar sua compra. Seu carrinho está guardado."
              : "Entre com os dados usados no seu cadastro."}
          </p>

          {!isConfigured && (
            <p className="auth-configuration" role="status">
              A autenticação aguarda a configuração do Supabase neste ambiente.
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">E-mail</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">Senha</label>
                <Link
                  className="auth-forgot-link"
                  to="/recuperar-senha"
                  state={{ email: email.trim() }}
                >
                  Esqueci minha senha
                </Link>
              </div>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={submitting}
                minLength="8"
                required
              />
            </div>

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
              {submitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="auth-assist">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" state={{ from: destination }}>
              Criar cadastro
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
