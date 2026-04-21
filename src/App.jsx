import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Planos from "./components/Planos/Planos";
import Kits from "./components/Kits/Kits";
import ComoFunciona from "./components/ComoFunciona/ComoFunciona";
import Depoimentos from "./components/Depoimentos/Depoimentos";
import FAQ from "./components/FAQ/FAQ";
import LojaPreview from "./components/LojaPreview/LojaPreview";
import FooterCTA from "./components/FooterCTA/FooterCTA";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import Produtos from "./pages/Produtos";

function HomePage() {
  useEffect(() => {
    const selectors = [
      ".hero-section",
      ".plans-section",
      ".kits-section",
      ".how-section",
      ".testimonials-section",
      ".faq-section",
      ".shop-preview-section",
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
      <Planos />
      <LojaPreview />
      <Kits />
      <ComoFunciona />
      <Depoimentos />
      <FAQ />
      <FooterCTA />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
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
        </Routes>

        <FloatingActions />
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}