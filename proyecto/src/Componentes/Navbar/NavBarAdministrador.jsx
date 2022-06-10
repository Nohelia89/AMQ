import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import LogWidget from "./LogWidget";



function NavBarAdministrador() {
    return (
<>
<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/MainAdministrador'>
    <Navbar.Brand ><Logo /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   
   
    <Link to='/listadoAnfitrion'> <li className="nav-item">Listado de anfitriones</li></Link>

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
   
 
</>
    )
  }
  
  export default NavBarAdministrador;