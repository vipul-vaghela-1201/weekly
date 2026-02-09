export const validateAdjustment = (adjustment) => {
  if (!adjustment.customerId) {
    return 'Customer is required.';
  }
  if (Number(adjustment.amount || adjustment.quantity * adjustment.rate) === 0) {
    return 'Amount must be greater than zero.';
  }
  return '';
};
