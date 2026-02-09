import Table from 'react-bootstrap/Table';
import BalanceIndicator from '../common/UI/BalanceIndicator';

const CreditReport = ({ customers }) => {
  const credits = customers.filter((customer) => customer.newBalance > 0);
  return (
    <div>
      <h5>Customers We Owe</h5>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {credits.map((customer) => (
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

export default CreditReport;
