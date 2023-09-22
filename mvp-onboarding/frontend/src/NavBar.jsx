import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Customers</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Products</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Stores</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/">Sales</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
