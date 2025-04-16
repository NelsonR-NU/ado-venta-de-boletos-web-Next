/**
 * Format a price value to display as currency.
 * @param price - Price value to format
 * @returns Formatted price string (e.g., "$350.00 MXN")
 */
export const formatPrice = (price?: number): string => {
  if (price === undefined || isNaN(price)) {
    return "$0.00 MXN";
  }

  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    // Fallback in case of error
    return `$${price.toFixed(2)} MXN`;
  }
};
