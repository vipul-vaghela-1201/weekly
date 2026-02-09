import Table from 'react-bootstrap/Table';
import CustomerRow from './CustomerRow';

const CustomerTable = ({ customers, onUpdate, onDelete, enablePartialDeposit }) => (
  <div className="table-wrapper">
    <Table striped hover responsive>
      <thead className="sticky-header">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Last Week</th>
          <th>This Week</th>
          <th>Adjustments</th>
          <th>New Balance</th>
          <th>Deposit</th>
          <th>Use Deposit</th>
          <th>Add Credit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
            onUpdate={onUpdate}
            onDelete={onDelete}
            enablePartialDeposit={enablePartialDeposit}
          />
        ))}
      </tbody>
    </Table>
  </div>
);

export default CustomerTable;
