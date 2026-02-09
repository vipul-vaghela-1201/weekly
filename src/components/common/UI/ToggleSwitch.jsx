import Form from 'react-bootstrap/Form';

const ToggleSwitch = ({ id, label, checked, onChange }) => (
  <Form.Check
    type="switch"
    id={id}
    label={label}
    checked={checked}
    onChange={(event) => onChange(event.target.checked)}
  />
);

export default ToggleSwitch;
