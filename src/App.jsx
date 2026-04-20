import { useEffect } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Planos from "./components/Planos/Planos";
import Kits from "./components/Kits/Kits";
import ComoFunciona from "./components/ComoFunciona/ComoFunciona";
import Depoimentos from "./components/Depoimentos/Depoimentos";
import FAQ from "./components/FAQ/FAQ";
import FooterCTA from "./components/FooterCTA/FooterCTA";

export default function App() {
  useEffect(() => {
    const selectors = [
      ".hero-section",
      ".plans-section",
      ".kits-section",
      ".how-section",
      ".testimonials-section",
      ".faq-section",
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
      <Kits />
      <ComoFunciona />
      <Depoimentos />
      <FAQ />
      <FooterCTA />
    </>
  );
}