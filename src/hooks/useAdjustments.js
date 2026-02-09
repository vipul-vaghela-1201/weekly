import { useCallback } from 'react';
import { checkOverpayment } from '../utils/calculations';

export const useAdjustments = ({ customers, onCustomersChange }) =>
  useCallback(
    (customerId, adjustment) => {
      const updated = customers.map((customer) => {
        if (customer.id !== customerId) return customer;
        const newAdjustments = Number(customer.adjustments || 0) + Number(adjustment.amount || 0);
        const overpaymentAmount = checkOverpayment(customer.newBalance, adjustment.amount);
        return {
          ...customer,
          adjustments: newAdjustments,
          overpaymentAmount,
          overpaymentToDeposit: overpaymentAmount > 0 ? true : customer.overpaymentToDeposit
        };
      });
      onCustomersChange(updated);
    },
    [customers, onCustomersChange]
  );
