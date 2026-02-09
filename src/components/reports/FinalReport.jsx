import Table from 'react-bootstrap/Table';
import BalanceIndicator from '../common/UI/BalanceIndicator';
import CurrencyDisplay from '../common/UI/CurrencyDisplay';

const FinalReport = ({ customers }) => (
  <div>
    <h5>Final Weekly Report</h5>
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Balance</th>
          <th>Deposit</th>
          <th>Material Deposit</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td><BalanceIndicator value={customer.newBalance} /></td>
            <td><CurrencyDisplay value={customer.deposit} /></td>
            <td><CurrencyDisplay value={customer.materialDeposit} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default FinalReport;
