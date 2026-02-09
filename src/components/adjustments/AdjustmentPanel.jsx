import Card from 'react-bootstrap/Card';
import CashAdjustment from './CashAdjustment';
import MaterialAdjustment from './MaterialAdjustment';

const AdjustmentPanel = ({ customers, onAddAdjustment }) => (
  <Card className="adjustment-panel">
    <Card.Body>
      <Card.Title>Adjustments</Card.Title>
      <CashAdjustment customers={customers} onAdd={onAddAdjustment} />
      <hr />
      <MaterialAdjustment customers={customers} onAdd={onAddAdjustment} />
    </Card.Body>
  </Card>
);

export default AdjustmentPanel;
