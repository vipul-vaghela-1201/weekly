import CurrencyDisplay from './CurrencyDisplay';

const BalanceIndicator = ({ value }) => {
  const status = value < 0 ? 'text-danger' : value > 0 ? 'text-success' : 'text-muted';
  return <CurrencyDisplay className={status} value={value} />;
};

export default BalanceIndicator;
