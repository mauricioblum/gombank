export function formatCurrency(value: number, currency: string = 'EUR'): string {
  try {
    const number = new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(value);
    return number;
  } catch (err) {
    return new Intl.NumberFormat('de-DE').format(value) + ` ${currency.toUpperCase()}`;
  }
}
