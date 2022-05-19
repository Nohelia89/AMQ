import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Nabvar() {
    return (
        <Navbar expand="lg" bg="light" style={{ 
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
</Navbar>
      
                 
    )
  }
  
  export default Nabvar;