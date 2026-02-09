import Table from 'react-bootstrap/Table';

const AdjustmentTable = ({ adjustments, onDelete }) => (
  <Table striped responsive>
    <thead>
      <tr>
        <th>Date</th>
        <th>Customer</th>
        <th>Type</th>
        <th>Details</th>
        <th>Amount</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {adjustments.map((adjustment) => (
        <tr key={adjustment.id}>
          <td>{new Date(adjustment.date).toLocaleString()}</td>
          <td>{adjustment.customerId}</td>
          <td>{adjustment.type}</td>
          <td>{adjustment.note || adjustment.item}</td>
          <td>{adjustment.amount || adjustment.quantity * adjustment.rate}</td>
          <td>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(adjustment.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default AdjustmentTable;
