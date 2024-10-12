export function formatCurrency(amount) {
  return amount.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
}
