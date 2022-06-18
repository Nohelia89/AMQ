import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import LogWidget from "./LogWidget";



function NavBarAnfitrion() {
    return (
<>
<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/MainAnfitrion'>
    <Navbar.Brand ><Logo /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   
   
    <Link to='/listadoAlojamientos'> <li className="nav-item">Listado de alojamientos</li></Link>

    </Nav>
  
   
   <Nav className="me-auto">
   
   
   <Link to='/AgregarAlojamiento'> <li className="nav-item">Agregar Alojamiento</li></Link>

   </Nav>
   
   <Nav className="me-auto">
   
   
   <Link to='/HistoricoAlojamientosAnfitrion'> <li className="nav-item">Historial</li></Link>

   </Nav>

   <Nav className="me-auto">
   
   
   <Link to='/perfil'> <li className="nav-item">Perfil de usuario</li></Link>

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
  
  export default NavBarAnfitrion;