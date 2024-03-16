export function formatCurrencyVND(amount) {
  // Check if the amount is not a number
  if (isNaN(amount)) {
    return "Invalid amount";
  }

  // Convert amount to string and split into array of integer and decimal parts
  const parts = amount.toString().split(".");

  // Format the integer part with commas every 3 digits from right to left
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted amount with "₫" symbol
  return parts.join(".") + "₫";
}