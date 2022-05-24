import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import LogWidget from "./LogWidget";


function NavBar() {
    return (

<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/'>
    <Navbar.Brand ><Logo /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">



    </Nav>
    <Nav>

            <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
            <Nav.Link as={Link} to="/login"><LogWidget /></Nav.Link>

            </NavLink>
          </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>  
                 
    )
  }
  
  export default NavBar;