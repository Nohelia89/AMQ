
//import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Registro.css';





export default function Registro() {


    return (

<>
<div class="bod">
      <form class="form1">
      <div class="tit">REGISTRO</div>

      <Link to={'/huesped'}>
      <Button variant="dark" >Huesped</Button>
            </Link>
   
            <Link to={'/anfitrion'}>
            <Button variant="dark" >Anfitrion</Button>
            </Link>

            
            <Link to={'/admin'}>
            <Button variant="dark" >Administrador</Button>
            </Link>
    
   
 </form>

    
  </div>
  </>
 )
} 