
import { Link } from "react-router-dom";
import "./HoverEffects.scss";



export default function HoverEffects() {


    return (

      
    <>
  
  <div class="container">
  <div class="content">
     <div class="wrapper">
     <Link to='/listarAlojamientos'>
      <div class="box vintage">
        <img src="https://source.unsplash.com/900x900/?newyork" alt="EMMYLOU"/>
        <h2>New York</h2>
        <p>Viví la navidad de tus sueños!</p>
      </div>
      </Link>
    </div>
    <div class="wrapper">
    <Link to='/listarAlojamientos'>
      <div class="box w-content">
        <img src="https://source.unsplash.com/900x900/?dubrovnik" alt="Jenny of Oldstones"/>
        <div class="frame">
          <h2>Dubrovnik</h2>
        </div>
      </div>
      </Link>
    </div>
   
    <div class="wrapper">
    <Link to='/listarAlojamientos'>
      <div class="box postcard">
        <img src="https://source.unsplash.com/900x900/?beach" alt="BOX"/>
        <h2>Conocé las mejores playas </h2> 
      </div>
      </Link>
    </div>
    <div class="wrapper">
    <Link to='/listarAlojamientos'>
      <div class="box zoom-in">
        
        <img src="https://source.unsplash.com/900x900/?italy" alt="Postcards From Italy"/>
        <h2>Quedate en Italia</h2>
        <p>Y descubrí lo mejor de la cocina local</p>
        
      </div>
      </Link>
    </div>
    
    <div class="wrapper">
    <Link to='/listarAlojamientos'>
      <div class="box blury-card" >
        <img src="https://source.unsplash.com/900x900/?swiss" alt="Blue Ridge Mountains"/>
        <div class="frame">
          <h2>Suiza</h2>
          <p>Lugares de ensueño</p>
        </div>
  
      </div>
      </Link>
    </div>
    <div class="wrapper">
    <Link to='/listarAlojamientos'>
      <div class="box zoom-out">
        <img src="https://source.unsplash.com/900x900/?paris" alt="Melody Noir"/>
        <div class="frame">
          <h2>PARIS</h2>
          <p>Je t' Aime</p>
        </div>
      </div>
      </Link>
    </div>
  </div>
</div>
  
  

    </>
      
 )
} 