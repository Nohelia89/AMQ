import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import LogWidget from "./LogWidget";

import Figure from 'react-bootstrap/Figure'

function NavBarAdministrador() {
    return (
<>
<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/'>
    <Navbar.Brand ><Logo /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   
   
    <Link to='/listarAlojamientos'> <li className="nav-item">Encontra tu lugar!</li></Link>

    </Nav>
    <Nav className="me-auto">
   
   
   <Link to='/userList'> <li className="nav-item">Listado de usuarios</li></Link>

   </Nav>
    <Nav>

            <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
            <Nav.Link as={Link} to="/login"><LogWidget /></Nav.Link>
          
            </NavLink>
          </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>  
   
   <Figure>
  <Figure.Image
    width={171}
    height={180}
    alt="171x180"
    src="../public/reparacionpc.jpg"
  />
  <Figure.Caption>
    Nulla vitae elit libero, a pharetra augue mollis interdum.
  </Figure.Caption>
</Figure>
</>
    )
  }
  
  export default NavBarAdministrador;