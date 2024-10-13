export function formatCurrency(amount) {
  return amount.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
}

export function formatDateToLocal(date, locale = "es-PE") {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
