import Table from 'react-bootstrap/Table';
import CurrencyDisplay from '../common/UI/CurrencyDisplay';

const DepositReport = ({ customers }) => {
  const depositors = customers.filter((customer) => customer.deposit > 0 || customer.materialDeposit > 0);
  return (
    <div>
      <h5>Customers With Deposits</h5>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cash Deposit</th>
            <th>Material Deposit</th>
          </tr>
        </thead>
        <tbody>
          {depositors.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td><CurrencyDisplay value={customer.deposit} /></td>
              <td><CurrencyDisplay value={customer.materialDeposit} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepositReport;
