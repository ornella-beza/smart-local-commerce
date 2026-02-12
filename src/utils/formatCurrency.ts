export function formatCurrency(amount: number, currency: string = 'RWF'): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d.-]/g, ''));
}