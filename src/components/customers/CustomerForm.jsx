import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { validateCustomer } from '../../utils/validators';

const CustomerForm = ({ customers, onAdd }) => {
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    lastWeekBalance: 0,
    deposit: 0,
    materialDeposit: 0,
    thisWeekBusiness: 0
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateCustomer(formState, customers.map((c) => c.id));
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onAdd({
      ...formState,
      adjustments: 0,
      materialDepositDetails: [],
      useDeposit: false,
      partialDepositAmount: 0,
      addToDeposit: false,
      creditAddedToDeposit: 0,
      originalDeposit: Number(formState.deposit),
      depositUsed: 0,
      newBalance: Number(formState.lastWeekBalance),
      isGroup: false,
      groupMembers: [],
      overpaymentToDeposit: false,
      overpaymentAmount: 0
    });
    setFormState({
      id: '',
      name: '',
      lastWeekBalance: 0,
      deposit: 0,
      materialDeposit: 0,
      thisWeekBusiness: 0
    });
    setErrors({});
  };

  const updateField = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Form onSubmit={handleSubmit} className="customer-form">
      <div className="form-grid">
        <Form.Group>
          <Form.Label>Customer ID</Form.Label>
          <Form.Control
            value={formState.id}
            onChange={(event) => updateField('id', event.target.value.trim())}
            isInvalid={Boolean(errors.id)}
          />
          <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={formState.name}
            onChange={(event) => updateField('name', event.target.value)}
            isInvalid={Boolean(errors.name)}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Week Balance</Form.Label>
          <Form.Control
            type="number"
            value={formState.lastWeekBalance}
            onChange={(event) => updateField('lastWeekBalance', event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Deposit</Form.Label>
          <Form.Control
            type="number"
            value={formState.deposit}
            onChange={(event) => updateField('deposit', event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material Deposit</Form.Label>
          <Form.Control
            type="number"
            value={formState.materialDeposit}
            onChange={(event) => updateField('materialDeposit', event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>This Week Business</Form.Label>
          <Form.Control
            type="number"
            value={formState.thisWeekBusiness}
            onChange={(event) => updateField('thisWeekBusiness', event.target.value)}
          />
        </Form.Group>
      </div>
      <Button type="submit" className="mt-3">Add Customer</Button>
    </Form>
  );
};

export default CustomerForm;
