export const formatCurrency = (value) => {
  const number = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(number);
};

export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  const formatter = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
};
