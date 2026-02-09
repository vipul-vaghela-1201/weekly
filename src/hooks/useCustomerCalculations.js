import { useMemo } from 'react';
import { calculateCustomerBalance } from '../utils/calculations';

export const useCustomerCalculations = (customers, settings) =>
  useMemo(
    () =>
      customers.map((customer) => {
        const result = calculateCustomerBalance(customer, settings);
        return {
          ...customer,
          deposit: result.deposit,
          depositUsed: result.depositUsed,
          creditAddedToDeposit: result.creditAddedToDeposit,
          newBalance: result.balance,
          overpaymentAmount: result.overpaymentAmount
        };
      }),
    [customers, settings]
  );
