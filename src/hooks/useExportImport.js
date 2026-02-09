import { exportCustomersToCsv } from '../utils/exportImport';

export const useExportImport = () => ({
  exportCustomers: (customers) => exportCustomersToCsv(customers)
});
