import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CurrencyDisplay from './UI/CurrencyDisplay';

const SummaryCards = ({ customers }) => {
  const totalCredit = customers.filter((c) => c.newBalance > 0).reduce((sum, c) => sum + c.newBalance, 0);
  const totalDebt = customers.filter((c) => c.newBalance < 0).reduce((sum, c) => sum + Math.abs(c.newBalance), 0);
  const totalDeposit = customers.reduce((sum, c) => sum + Number(c.deposit || 0), 0);
  return (
    <Row className="g-3">
      <Col md={4}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Customers We Owe</Card.Title>
            <CurrencyDisplay className="text-success" value={totalCredit} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Customers Owing Us</Card.Title>
            <CurrencyDisplay className="text-danger" value={totalDebt} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="summary-card">
          <Card.Body>
            <Card.Title>Total Deposits</Card.Title>
            <CurrencyDisplay className="text-primary" value={totalDeposit} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
