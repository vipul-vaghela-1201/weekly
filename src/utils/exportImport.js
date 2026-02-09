import { formatCurrency } from './formatters';

export const exportCustomersToCsv = (customers) => {
  const headers = ['ID', 'Name', 'New Balance', 'Deposit', 'Material Deposit'];
  const rows = customers.map((customer) => [
    customer.id,
    customer.name,
    customer.newBalance,
    customer.deposit,
    customer.materialDeposit
  ]);
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
};

export const formatReportRow = (customer) => ({
  ...customer,
  newBalanceFormatted: formatCurrency(customer.newBalance),
  depositFormatted: formatCurrency(customer.deposit)
});
