import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";
import { formatMoney, productPriceValue } from "../src/lib/money.js";

let server;
let Checkout;
let CartProvider;
let AuthContext;
const originalWindow = globalThis.window;

before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  ({ default: Checkout } = await server.ssrLoadModule("/src/pages/Checkout.jsx"));
  ({ CartProvider } = await server.ssrLoadModule("/src/context/CartContext.jsx"));
  ({ AuthContext } = await server.ssrLoadModule("/src/context/auth-context.js"));
});

after(async () => {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  await server?.close();
});

function renderCheckout(items) {
  globalThis.window = { localStorage: { getItem: () => JSON.stringify(items) } };
  return renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: ["/checkout"] },
      createElement(AuthContext.Provider, { value: { user: { user_metadata: {
        street: "Rua de teste", number: "10", complement: "Apto 2",
        neighborhood: "Centro", city: "Cidade", state: "SP", cep: "00000000",
      } } } }, createElement(CartProvider, null, createElement(Checkout)))
    )
  );
}

test("preserva os formatos de preço recebidos do catálogo", () => {
  assert.equal(productPriceValue({ priceValue: 19.9, price: "R$ 99,90" }), 19.9);
  assert.equal(productPriceValue({ price: 19.9 }), 19.9);
  assert.equal(productPriceValue({ price: "R$ 1.234,56" }), 1234.56);
});

test("revisão calcula subtotal por quantidade e inclui complemento", () => {
  const html = renderCheckout([{ id: "fixture", name: "Acessório de teste", image: "/test.png", price: "R$ 19,90", stock: 5, quantity: 3 }]);
  assert.ok(html.includes(formatMoney(59.7)));
  assert.ok(html.includes("Apto 2"));
  assert.ok(html.includes("/minha-conta?aba=dados"));
  assert.ok(html.includes("Nenhum pedido foi enviado"));
  assert.ok(!html.includes("Saldo disponível para usar"));
});

test("o aumento de quantidade fica indisponível ao atingir o estoque", () => {
  const html = renderCheckout([{ id: "fixture", name: "Acessório de teste", image: "/test.png", priceValue: 10, stock: 1, quantity: 1 }]);
  assert.match(html, /<button[^>]*disabled=""[^>]*aria-label="Aumentar quantidade/);
});
