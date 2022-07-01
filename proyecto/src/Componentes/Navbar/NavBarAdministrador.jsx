import { Button, Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import LogoSinFondoNavBar from "../Logo/LogoSinFondoNavBar";
import { useUserContext } from "../UserContext/userContext";




function NavBarAdministrador() {

  const {  userName, cerrarSesion } = useUserContext();
 

  const cerrar = () => {
   
    cerrarSesion()

  
    }

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
   {"Bienvenido "+userName+"   "}
   </Nav>
   <Nav>
   <Nav.Link as={Link} to='/'>
<Button variant="dark" onClick={() => cerrar()}>Cerrar Sesión</Button>
  </Nav.Link> 
 </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>  
   
 
</>
    )
  }
  
  export default NavBarAdministrador;