import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BalanceIndicator from '../common/UI/BalanceIndicator';
import ToggleSwitch from '../common/UI/ToggleSwitch';
import CurrencyDisplay from '../common/UI/CurrencyDisplay';

const CustomerRow = ({ customer, onUpdate, onDelete, enablePartialDeposit }) => {
  const updateField = (field, value) => {
    onUpdate({ ...customer, [field]: value });
  };

  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td><BalanceIndicator value={customer.lastWeekBalance} /></td>
      <td>
        <Form.Control
          type="number"
          value={customer.thisWeekBusiness}
          onChange={(event) => updateField('thisWeekBusiness', event.target.value)}
        />
      </td>
      <td><BalanceIndicator value={customer.adjustments} /></td>
      <td><BalanceIndicator value={customer.newBalance} /></td>
      <td>
        <CurrencyDisplay value={customer.deposit} className="text-primary" />
      </td>
      <td>
        <ToggleSwitch
          id={`deposit-${customer.id}`}
          label="Use"
          checked={customer.useDeposit}
          onChange={(value) => updateField('useDeposit', value)}
        />
        {enablePartialDeposit && (
          <Form.Control
            type="number"
            placeholder="Partial amount"
            value={customer.partialDepositAmount}
            onChange={(event) => updateField('partialDepositAmount', event.target.value)}
          />
        )}
      </td>
      <td>
        <ToggleSwitch
          id={`credit-${customer.id}`}
          label="Add Credit"
          checked={customer.addToDeposit}
          onChange={(value) => updateField('addToDeposit', value)}
        />
      </td>
      <td>
        <Button size="sm" variant="outline-danger" onClick={() => onDelete(customer.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CustomerRow;
