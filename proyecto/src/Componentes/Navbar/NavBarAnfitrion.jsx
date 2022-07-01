import { useState } from "react";
import { Button, Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import LogoSinFondoNavBar from "../Logo/LogoSinFondoNavBar";
import { useUserContext } from "../UserContext/userContext";

import Login from '../Login/Login';



function NavBarAnfitrion() {



  const { userId, userName, cerrarSesion } = useUserContext();
  const [botontype, setBotonType ] = useState('aloj');

  const cerrar = () => {
    console.log("entre al cerrar")
    cerrarSesion()
    setBotonType('hab')
    console.log("soy userId del cerrar despues de llamar a la funcion"+userId )
    }

 


    return (
    
<>
<Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
<Container>
  <Link to='/MainAnfitrion'>
    <Navbar.Brand ><LogoSinFondoNavBar /></Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
   
   
    <Nav.Link as={Link} to='/listadoAlojamientos'> <li className="nav-item" >Listado de alojamientos</li></Nav.Link>

    </Nav>

    <Nav className="me-auto">
   
   
    <Nav.Link as={Link} to='/reservas'> <li className="nav-item">Reservas</li></Nav.Link>

    </Nav>
  
   
   <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/AgregarAlojamiento'> <li className="nav-item">Agregar Alojamiento</li></Nav.Link>

   </Nav>
   
   <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/HistoricoAlojamientosAnfitrion'> <li className="nav-item">Historial</li></Nav.Link>

   </Nav>

   <Nav className="me-auto">
   
   
   <Nav.Link as={Link} to='/perfil'> <li className="nav-item">Perfil de usuario</li></Nav.Link>

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
  
  export default NavBarAnfitrion;