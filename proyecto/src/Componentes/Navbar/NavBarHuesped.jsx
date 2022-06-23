import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import LogWidget from "./LogWidget";


function NavBarHuesped() {
    return (

<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/'>
    <Navbar.Brand ><Logo /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   
   
    <Nav.Link as={Link} to='/listarAlojamientos'> <li className="nav-item">Encontra tu lugar!</li></Nav.Link>

    </Nav>

    <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/ListadoAlojamientosPorHuesped'> <li className="nav-item">Historial</li></Nav.Link>

   </Nav>

   <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/cancelarReserva'> <li className="nav-item">Cancelar Reserva</li></Nav.Link>

   </Nav>



    <Nav>
    <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/perfil'> <li className="nav-item">Perfil de usuario</li></Nav.Link>
  
   </Nav>
            <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
            <Nav.Link as={Link} to="/login"><LogWidget /></Nav.Link>
          
            </NavLink>
          </Nav>


       
  </Navbar.Collapse>
</Container>
</Navbar>  
                 
    )
  }
  
  export default NavBarHuesped;