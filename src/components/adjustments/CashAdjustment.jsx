import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CashAdjustment = ({ customers, onAdd }) => {
  const [formState, setFormState] = useState({ customerId: '', amount: 0, note: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.customerId) return;
    onAdd({
      ...formState,
      type: 'cash',
      date: new Date().toISOString()
    });
    setFormState({ customerId: '', amount: 0, note: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-grid">
        <Form.Group>
          <Form.Label>Customer</Form.Label>
          <Form.Select
            value={formState.customerId}
            onChange={(event) => setFormState((prev) => ({ ...prev, customerId: event.target.value }))}
          >
            <option value="">Select</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.id})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={formState.amount}
            onChange={(event) => setFormState((prev) => ({ ...prev, amount: event.target.value }))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Note</Form.Label>
          <Form.Control
            value={formState.note}
            onChange={(event) => setFormState((prev) => ({ ...prev, note: event.target.value }))}
          />
        </Form.Group>
      </div>
      <Button type="submit" className="mt-3">Add Cash Adjustment</Button>
    </Form>
  );
};

export default CashAdjustment;
