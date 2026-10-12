export function formatDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toISOString().split('T')[0];
}

