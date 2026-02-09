import Badge from 'react-bootstrap/Badge';

const SyncStatus = ({ status }) => (
  <Badge bg={status === 'Synced' ? 'success' : 'warning'}>{status}</Badge>
);

export default SyncStatus;
