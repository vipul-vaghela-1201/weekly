import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdjustmentPanel from '../adjustments/AdjustmentPanel';
import AdjustmentTable from '../adjustments/AdjustmentTable';

const WeeklyAdjustmentsTab = ({ customers, adjustments, onAddAdjustment, onDeleteAdjustment }) => (
  <Row className="tab-section">
    <Col lg={6}>
      <AdjustmentPanel customers={customers} onAddAdjustment={onAddAdjustment} />
    </Col>
    <Col lg={6}>
      <AdjustmentTable adjustments={adjustments} onDelete={onDeleteAdjustment} />
    </Col>
  </Row>
);

export default WeeklyAdjustmentsTab;
