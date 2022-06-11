
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
    
import { useUserContext } from "../UserContext/userContext";

function DetalleAlojamiento() {
    
      const {aloj, url} = useUserContext();
      console.log("ESTOY EN DETALLE " + aloj)
      console.log("ESTOY EN DETALLE IMAGENES " + url)
      var nombre =  "Nombre: "+aloj.nombre
      var descripcion =  "Descripcion: "+aloj.descripcion
      var direccion =  "Dirección: "+aloj.direcion.calle + aloj.direcion.numero 
      var ubicacion = "Ubicación: "+aloj.direcion.ciudad+ aloj.direcion.pais.nombre 
    
   
/*     useEffect(() => {
    
        const verAlojamiento = async (e) => {
            e.preventDefault();
        var alojamiento = {

           id:alojId
          } 
      
         
            
              await axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, alojamiento, {
                  headers: {
                    'Authorization': `Basic ${userToken}` 
                  }
                } ) 
                  
                  .then(response => {
                    (setDatosAloj(response.data));
                    console.log(response.data+"soy response.data");
                    console.log(datosAloj+"soy datosAloj");
                  })
            
          }
     
              },[]) */
        
           
        const reservar = async (e) => {
            e.preventDefault();
       
            console.log("reservo")
          }
  
  
    return (
        

        <div class="bod">
        <form class="form1"  onSubmit={reservar}>
        <div class="tit"></div>
      
  
  
        <div class="input_container">
        <p class="form-input2"  type={nombre}/>
        <p class="form-input2" type={direccion}/> 
        <p class="form-input2" type={ubicacion}/>
        <p class="form-input2" type={descripcion}/>

        <div>
     
        </div>
  
        <br />

   
        <Link to={'/'}>
              <Button variant="dark" >Volver</Button>
            </Link>
            <Link to={'/registro'}>
            <button variant="dark" class = "btn submits boton">Reservar</button>
            </Link>
       
        </div>
        
        
  
   </form>
   </div>
      
    );
  
   }
  export default DetalleAlojamiento;