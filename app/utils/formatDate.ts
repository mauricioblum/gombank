export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-UK', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: 'numeric',
  });
}
