import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CurrencyDisplay from './UI/CurrencyDisplay';

const SummaryCards = ({ customers }) => {
  const totalCredit = customers.filter((c) => c.newBalance > 0).reduce((sum, c) => sum + c.newBalance, 0);
  const totalDebt = customers.filter((c) => c.newBalance < 0).reduce((sum, c) => sum + Math.abs(c.newBalance), 0);
  const totalDeposit = customers.reduce((sum, c) => sum + Number(c.deposit || 0), 0);
  const activeCustomers = customers.filter((customer) => Number(customer.thisWeekBusiness || 0) !== 0).length;

  return (
    <Row className="g-3 sticky-top bg-white py-2 z-1">
      <Col md={3}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Our Credit</Card.Title>
            <CurrencyDisplay className="text-success" value={totalCredit} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Our Debt</Card.Title>
            <CurrencyDisplay className="text-danger" value={totalDebt} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Total Deposit</Card.Title>
            <CurrencyDisplay className="text-primary" value={totalDeposit} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Active / Total Customers</Card.Title>
            <div className="fs-4 fw-bold">{activeCustomers} / {customers.length}</div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
