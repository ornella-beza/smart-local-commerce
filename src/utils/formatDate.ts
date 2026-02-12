export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export function isDateExpired(date: string | Date): boolean {
  return new Date(date) < new Date();
}