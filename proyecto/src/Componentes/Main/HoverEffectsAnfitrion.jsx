
import { Link } from "react-router-dom";
import "./HoverEffects.scss";



export default function HoverEffectsAnfitrion() {


    return (

      
    <>
  
  <div class="container">
  <div class="content">
     <div class="wrapper">
     <Link to='/listadoAlojamientos'>
      <div class="box vintage">
        <img src="https://source.unsplash.com/900x900/?houses" alt="EMMYLOU"/>
        <h2>Listado de Alojamientos</h2>
    
      </div>
      </Link>
    </div>
    <div class="wrapper">
    <Link to='/reservas'>
      <div class="box w-content">
        <img src="https://source.unsplash.com/900x900/?office" alt="Jenny of Oldstones"/>
        <div class="frame">
          <h2>Reservas</h2>
        </div>
      </div>
      </Link>
    </div>
   
    <div class="wrapper">
    <Link to='/AgregarAlojamiento'>
      <div class="box postcard">
        <img src="https://source.unsplash.com/900x900/?home" alt="BOX"/>
        <h2>Agregar Alojamiento</h2> 
      </div>
      </Link>
    </div>
    <div class="wrapper">
    <Link to='/HistoricoAlojamientosAnfitrion'>
      <div class="box zoom-in">
        
        <img src="https://source.unsplash.com/900x900/?historial" alt="Postcards From Italy"/>
        <h2>Historial de Alquileres</h2>
    
        
      </div>
      </Link>
    </div>
    
    <div class="wrapper">
    <Link to='/perfil'>
      <div class="box blury-card" >
        <img src="https://source.unsplash.com/900x900/?user" alt="Blue Ridge Mountains"/>
        <div class="frame">
          <h2>Perfil de Usuario</h2>
          
        </div>
  
      </div>
      </Link>
    </div>
    
  </div>
</div>
  
  

    </>
      
 )
} 