import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Planos from "./components/Planos/Planos";
import Categorias from "./components/Categorias/Categorias";
import LojaPreview from "./components/LojaPreview/LojaPreview";
import Historia from "./components/Historia/Historia";
import VisitePrime from "./components/VisitePrime/VisitePrime";
import FooterCTA from "./components/FooterCTA/FooterCTA";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Produtos from "./pages/Produtos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import NovaSenha from "./pages/NovaSenha";
import MinhaConta from "./pages/MinhaConta";
import Checkout from "./pages/Checkout";

function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  useEffect(() => {
    const selectors = [
      ".hero-section",
      ".categories-section",
      ".shop-preview-section",
      ".plans-section",
      ".history-section",
      ".visit-prime-section",
      ".footer-cta-section",
    ];

    const sections = selectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector))
    );

    sections.forEach((section, index) => {
      section.classList.add("reveal-section");

      if (index === 0) {
        section.classList.add("is-visible");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    sections.forEach((section, index) => {
      if (index !== 0) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Categorias />
      <LojaPreview />
      <Planos />
      <Historia />
      <VisitePrime />
      <FooterCTA />
    </>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="route-loading" aria-live="polite">
        <span />
        Carregando sua conta...
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/cadastro" ||
    pathname === "/nova-senha";
  const hideFloatingUi = isAuthPage || pathname === "/checkout";

  return (
    <>
      <RouteScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/produtos"
          element={
            <>
              <Header />
              <Produtos />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/nova-senha"
          element={
            <ProtectedRoute>
              <NovaSenha />
            </ProtectedRoute>
          }
        />
        <Route
          path="/minha-conta"
          element={
            <ProtectedRoute>
              <Header />
              <MinhaConta />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Header />
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFloatingUi && (
        <>
          <FloatingActions />
          <CartDrawer />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}
