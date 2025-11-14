export function formatCurrency(amount, currency = 'INR') {
  if (amount == null) return '₹ 0.00';
  const num = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
  if (Number.isNaN(num)) return '₹ 0.00';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);
}

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
