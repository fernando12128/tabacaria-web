import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Planos from "./components/Planos/Planos";
import Categorias from "./components/Categorias/Categorias";
import LojaPreview from "./components/LojaPreview/LojaPreview";
import Historia from "./components/Historia/Historia";
import FooterCTA from "./components/FooterCTA/FooterCTA";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Produtos from "./pages/Produtos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import MinhaConta from "./pages/MinhaConta";

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
      <FooterCTA />
    </>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/cadastro";

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
          path="/minha-conta"
          element={
            <>
              <Header />
              <MinhaConta />
            </>
          }
        />
      </Routes>

      {!isAuthPage && (
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
