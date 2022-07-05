import { Button, Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import LogoSinFondoNavBar from "../Logo/LogoSinFondoNavBar";
import { useUserContext } from "../UserContext/userContext";
import LogWidget from "./LogWidget";


function NavBarHuesped() {

  
  const { userName,cerrarSesion } = useUserContext();


  const cerrar = () => {

    cerrarSesion()


    }

    return (

<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
<Container>
  <Link to='/'>
    <Navbar.Brand ><LogoSinFondoNavBar /></Navbar.Brand>
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
   
   
   <Nav.Link as={Link} to='/cancelarReserva'> <li className="nav-item">Reservas</li></Nav.Link>

   </Nav>



    <Nav>
    <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/perfil'> <li className="nav-item">Perfil de usuario</li></Nav.Link>
  
   </Nav>
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
                 
    )
  }
  
  export default NavBarHuesped;