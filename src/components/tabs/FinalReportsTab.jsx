import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DebtReport from '../reports/DebtReport';
import CreditReport from '../reports/CreditReport';
import DepositReport from '../reports/DepositReport';
import FinalReport from '../reports/FinalReport';

const FinalReportsTab = ({ customers }) => (
  <div className="tab-section">
    <Row>
      <Col lg={6}>
        <DebtReport customers={customers} />
      </Col>
      <Col lg={6}>
        <CreditReport customers={customers} />
      </Col>
    </Row>
    <Row className="mt-4">
      <Col lg={6}>
        <DepositReport customers={customers} />
      </Col>
      <Col lg={6}>
        <FinalReport customers={customers} />
      </Col>
    </Row>
  </div>
);

export default FinalReportsTab;
