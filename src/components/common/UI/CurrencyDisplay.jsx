import { formatCurrency } from '../../../utils/formatters';

const CurrencyDisplay = ({ value, className }) => (
  <span className={className}>{formatCurrency(value)}</span>
);

export default CurrencyDisplay;
