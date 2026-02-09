import Table from 'react-bootstrap/Table';
import BalanceIndicator from '../common/UI/BalanceIndicator';

const DebtReport = ({ customers }) => {
  const debtors = customers.filter((customer) => customer.newBalance < 0);
  return (
    <div>
      <h5>Customers Owing Us</h5>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {debtors.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td><BalanceIndicator value={customer.newBalance} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DebtReport;
