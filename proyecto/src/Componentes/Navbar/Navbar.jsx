import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


function NavBar() {
    return (
     /*    <Navbar expand="lg" bg="light" style={{ 
            backgroundColor: "#f4efef", width: "100%"
       }}>
  <Container>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        
   
    <Nav>
    <Link to="login">
          Iniciar sesion
    </Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar> */
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<Container>
  <Link to='/'>
    <Navbar.Brand >Aqui Me Quedo</Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">



    </Nav>
    <Nav>

            <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>

            </NavLink>
          </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>  
                 
    )
  }
  
  export default NavBar;