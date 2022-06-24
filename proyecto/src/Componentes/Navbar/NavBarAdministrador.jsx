import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import LogoSinFondoNavBar from "../Logo/LogoSinFondoNavBar";
import LogWidget from "./LogWidget";



function NavBarAdministrador() {
    return (
<>
<Navbar  collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/MainAdministrador'>
    <Navbar.Brand ><LogoSinFondoNavBar /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   
   
    <Nav.Link as={Link} to='/listadoAnfitrion'> <li className="nav-item">Listado de anfitriones</li></Nav.Link>

    </Nav>
    <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/userList'> <li className="nav-item">Listado de usuarios</li></Nav.Link>

   </Nav>
   <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/listarHuesped'> <li className="nav-item">Listado de huespedes</li></Nav.Link>
   
   </Nav>
   <Nav>
   <Nav.Link as={Link} to='/admin'> <li className="nav-item">Registrar Admin</li></Nav.Link>
   </Nav>
    <Nav>

            <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
            <Nav.Link as={Link} to="/login"><LogWidget /></Nav.Link>
          
            </NavLink>
          </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>  
   
 
</>
    )
  }
  
  export default NavBarAdministrador;