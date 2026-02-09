import Badge from 'react-bootstrap/Badge';

const GroupBadge = ({ name }) => (
  <Badge bg="secondary" className="group-badge">
    {name}
  </Badge>
);

export default GroupBadge;
