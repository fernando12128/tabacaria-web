export const cashbackBalance = 0;

export function formatCashback(value = cashbackBalance) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
