
import { Link } from "react-router-dom";
import "./HoverEffects.scss";



export default function HoverEffectsAdmin() {


    return (

      
    <>
  
  <div class="container">
  <div class="content">
     <div class="wrapper">
     <Link to='/userList'>
      <div class="box vintage">
        <img src="https://source.unsplash.com/900x900/?pc" alt="EMMYLOU"/>
        <h2>Listado de Usuarios</h2>
        
      </div>
      </Link>
    </div>
    <div class="wrapper">
    <Link to='/listadoAnfitrion'>
      <div class="box w-content">
        <img src="https://source.unsplash.com/900x900/?users" alt="Jenny of Oldstones"/>
        <div class="frame">
          <h2>Listado de Anfitriones</h2>
        </div>
      </div>
      </Link>
    </div>
   
    <div class="wrapper">
    <Link to='/listarHuesped'>
      <div class="box postcard">
        <img src="https://source.unsplash.com/900x900/?office" alt="BOX"/>
        <h2>Listado de huespedes</h2> 
      </div>
      </Link>
    </div>
    
    </div>
    </div>

    </>
      
 )
} 