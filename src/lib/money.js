export function productPriceValue(product) {
  if (typeof product.priceValue === "number") return product.priceValue;
  if (typeof product.price === "number") return product.price;
  if (typeof product.price === "string") {
    return Number(product.price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
  }
  return 0;
}

export function formatMoney(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
