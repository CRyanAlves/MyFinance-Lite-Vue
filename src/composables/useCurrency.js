export function useCurrency() {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  const formatDate = (date) =>
    new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(
      new Date(`${date}T12:00:00`),
    );
  return { formatCurrency, formatDate };
}
