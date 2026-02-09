import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MaterialAdjustment = ({ customers, onAdd }) => {
  const [formState, setFormState] = useState({ customerId: '', item: '', quantity: 0, rate: 0, asDeposit: false });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.customerId) return;
    onAdd({
      ...formState,
      type: 'material',
      date: new Date().toISOString()
    });
    setFormState({ customerId: '', item: '', quantity: 0, rate: 0, asDeposit: false });
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
          <Form.Label>Item</Form.Label>
          <Form.Control
            value={formState.item}
            onChange={(event) => setFormState((prev) => ({ ...prev, item: event.target.value }))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={formState.quantity}
            onChange={(event) => setFormState((prev) => ({ ...prev, quantity: event.target.value }))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rate</Form.Label>
          <Form.Control
            type="number"
            value={formState.rate}
            onChange={(event) => setFormState((prev) => ({ ...prev, rate: event.target.value }))}
          />
        </Form.Group>
        <Form.Group className="align-self-center">
          <Form.Check
            type="switch"
            id="material-as-deposit"
            label="As Material Deposit"
            checked={formState.asDeposit}
            onChange={(event) => setFormState((prev) => ({ ...prev, asDeposit: event.target.checked }))}
          />
        </Form.Group>
      </div>
      <Button type="submit" className="mt-3">Add Material Adjustment</Button>
    </Form>
  );
};

export default MaterialAdjustment;
