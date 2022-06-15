
import { Link } from 'react-router-dom';
import { Button, Card, Carousel } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
    
import { useUserContext } from "../UserContext/userContext";

function DetalleAlojamiento() {
    
      const {aloj} = useUserContext();
      console.log(aloj);
      console.log("ESTOY EN DETALLE " + aloj)
    /*  var nombre =  "Nombre: "+aloj.nombre
      var descripcion =  "Descripcion: "+aloj.descripcion
      var direccion =  "Dirección: "+aloj.direcion.calle + aloj.direcion.numero 
      var ubicacion = "Ubicación: "+aloj.direcion.ciudad+ aloj.direcion.pais.nombre */
    
   
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
  
          const [index, setIndex] = useState(0);
  
          const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
          };
        
    return (
        
/*
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
/*
   
        <Link to={'/'}>
              <Button variant="dark" >Volver</Button>
            </Link>
            <Link to={'/registro'}>
            <button variant="dark" class = "btn submits boton">Reservar</button>
            </Link>
       
        </div>
        
        
  
   </form>
   </div>
      */

   <div class="bod">
  <Card>
  <Carousel  activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={aloj[0].url1}
            alt="First slide"
            width={400}
            height={500}
            
          />
          <Carousel.Caption>
            <h3>Playas de Mexico</h3>
            <p>Ingresa acá y disfruta de los alojamientos mejor valorados de la temporada</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={aloj[0].url2}
            alt="Second slide"
            width={400}
            height={500}
          />
  
          <Carousel.Caption>
            <h3>New York</h3>
            <p>Reserva en la ciudad que nunca duerme</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={aloj[0].url3}
            alt="Third slide"
            width="400"
            height="500"
          />
  
          <Carousel.Caption>
            <h3>Europa low Cost</h3>
            <p>
             Conoce Suiza en Invierno !
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    <Card.Body>
      <Card.Text>
        ACA VA UN TEXTO
      </Card.Text>
    </Card.Body>
  </Card>
  </div>
    );
  
   }
  export default DetalleAlojamiento;