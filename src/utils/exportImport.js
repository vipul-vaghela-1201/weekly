const escapeCsv = (value) => {
  const stringValue = `${value ?? ''}`;
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const parseCsvLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
};

export const parseCsv = async (file) => {
  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((record, header, index) => {
      record[header] = values[index] ?? '';
      return record;
    }, {});
  });
};

const toNumber = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const toCustomerFromReportRow = (row) => ({
  id: row.id || row.customerid || row.customer_id || `CUST-${Date.now()}`,
  name: row.name || 'Unknown',
  lastWeekBalance: toNumber(row['last week balance'] || row.lastweekbalance),
  thisWeekBusiness: toNumber(row['this week business amount'] || row.thisweekbusinessamount),
  adjustments: toNumber(row['total final/all adjustments amount'] || row.adjustments),
  deposit: toNumber(row['total final/all deposit amount'] || row.deposit),
  materialDeposit: 0,
  materialDepositDetails: [],
  useDeposit: false,
  partialDepositAmount: 0,
  addToDeposit: false,
  creditAddedToDeposit: 0,
  originalDeposit: toNumber(row['total final/all deposit amount'] || row.deposit),
  depositUsed: 0,
  comment: row.comment || '',
  overpaymentToDeposit: false,
  overpaymentAmount: 0
});

export const mergeBusinessBillImport = (customers, rows) => {
  const map = new Map(customers.map((customer) => [customer.id, customer]));

  rows.forEach((row) => {
    const id = row.id || row.customerid || row.customer_id;
    if (!id) return;

    const amount = toNumber(row.amount);
    if (map.has(id)) {
      map.set(id, { ...map.get(id), thisWeekBusiness: amount });
    } else {
      map.set(id, {
        id,
        name: row.name || `Customer ${id}`,
        lastWeekBalance: 0,
        thisWeekBusiness: amount,
        adjustments: 0,
        deposit: 0,
        materialDeposit: 0,
        materialDepositDetails: [],
        useDeposit: false,
        partialDepositAmount: 0,
        addToDeposit: false,
        creditAddedToDeposit: 0,
        originalDeposit: 0,
        depositUsed: 0,
        comment: '',
        overpaymentToDeposit: false,
        overpaymentAmount: 0
      });
    }
  });

  return Array.from(map.values());
};

export const exportReportCsv = (customers) => {
  const headers = [
    'ID',
    'Name',
    'Last Week Balance',
    'Total Final/All Deposit Amount',
    'Total Final/All Adjustments Amount',
    'This Week Business Amount',
    'Final Amount/Balance',
    'Comment'
  ];

  const rows = customers.map((customer) => [
    customer.id,
    customer.name,
    customer.lastWeekBalance,
    customer.deposit,
    customer.adjustments,
    customer.thisWeekBusiness,
    customer.newBalance,
    customer.comment || ''
  ]);

  const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
};
