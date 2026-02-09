import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SyncStatus from './UI/SyncStatus';

const Header = ({ status }) => (
  <Navbar bg="light" className="border-bottom">
    <Container className="justify-content-between">
      <Navbar.Brand>Weekly Customer Settlement</Navbar.Brand>
      <SyncStatus status={status} />
    </Container>
  </Navbar>
);

export default Header;
