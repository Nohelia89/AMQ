

import { Button, Card, Carousel, Table } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReservaAloj from "../DetalleAlojamiento/ReservaAloj";

import { useUserContext } from "../UserContext/userContext";
import NavBarInvitado from '../Navbar/NavbarInvitado';
import { Link } from "react-router-dom";


function DetalleAlojamiento() {
    
      const {aloj} = useUserContext();
      const [reseña, setReseña] = useState([]);
  
    const { userToken, userId } = useUserContext();
      const [botonType, setBotonType] = useState('sinActualizar');

    
 
      const reservar = () => {
        setBotonType("habitacion")
        }

        const Reserva = () => {
          setBotonType("habitacion")
           return(<ReservaAloj /> )
          }
  
          const [index, setIndex] = useState(0);
  
          const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
          };
        
          useEffect(() => {
            var datos =
            {
            
                idAloj: aloj[0].aloj.id
            }
           
           axios.post('http://localhost:8080/reserva/listarResenas', datos,{
            headers: {
              'Authorization': `${userToken}`
            }
          })
          .then(res => {
          const rese = res.data;
            setReseña(rese);
          })
          .catch(error => {
            console.log("ERROR: " + error.response.data.mensaje);
          });
           
              
            
        }, [])


    return (

   botonType === 'sinActualizar' ?  
   
   (<div class="overlay">
      <NavBarInvitado/>
<div style={{padding:'16px 4px 16px 0', position:'center'}}>
  
  <Carousel   style={{padding:'16px 4px 16px 0'}} activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item >
          <img
            src={aloj[0].url1}
            alt="First slide"
            width="700"
            height="500"
            
            
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            src={aloj[0].url2}
            alt="Second slide"
            width="700"
            height="500"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            src={aloj[0].url3}
            alt="Third slide"
            width="700"
            height="500"
          />
  
        </Carousel.Item>
      </Carousel>
  
      <p>{aloj[0].aloj.nombre}</p>
      <p>{aloj[0].aloj.descripcion}</p>
      <p>Direccion: {aloj[0].aloj.direcion.calle} {aloj[0].aloj.direcion.numero}, {aloj[0].aloj.direcion.ciudad}, {aloj[0].aloj.direcion.pais.nombre}</p>
      Habitaciones: 
      
      
      <div style={{ marginLeft: "18%", width: "1000px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px",  marginBottom: "40px"}}>
      
      <Table striped bordered hover variant="light" style={{ padding:"10px" }}>

<thead>
  <tr>
    <th>Descripcion</th>
    <th>Camas</th>
    <th>Precio Por noche</th>
    <th>Servicios</th>
  </tr>
</thead>
{aloj[0].aloj.habs.map(hab => <tbody key={hab.nombre} >
  <tr>
    <td>{hab.descripcion}</td>
    <td>{hab.camas}</td>
    <td>{hab.precioNoche}</td>
    <td><p>Aire: {hab.dtservicios.aire === true ? "SI": "NO"}</p>
    <p>Cable:{hab.dtservicios.tvCable === true ? "SI": "NO"}</p>
    <p>Desayuno:{hab.dtservicios.desayuno === true ? "SI": "NO"}</p>
    <p>Yacuzzi:{hab.dtservicios.yacuzzi === true ? "SI": "NO"}</p>
    <p>Parking:{hab.dtservicios.parking === true ? "SI": "NO"}</p>
    <p>WiFi:{hab.dtservicios.wifi === true ? "SI": "NO"}</p></td>
    </tr>

</tbody>)}

</Table >

      Reseñas :   
      <Table striped bordered hover variant="light" style={{ padding:"10px" }}>

<thead>
  <tr>
    <th>Fecha</th>
    <th>Reseña</th>
  </tr>
</thead>
{reseña.map(reseña => <tbody key={reseña.id} >
  <tr>
    <td>{reseña.fechaResena}</td>
    <td>{reseña.resena}</td>
    </tr>

</tbody>)}
</Table>

{ userId ===""? 
    
   

    <div > 

<Link to={'/mainInvitado'}>

      <button class="log-in"  style={{margin:'10px'}} > VOLVER </button>
            </Link>
           
           
            <Link to={'/login'}>
            <button class="log-in" > RESERVAR </button>
            </Link>
    
      </div>
:
<div>
<Link to={'/mainInvitado'}>

<button class="log-in"  style={{margin:'10px'}} > VOLVER </button>
      </Link>
     
      <button class="log-in" onClick={reservar} > RESERVAR </button>
      </div>
}

      </div>
  </div>
  </div>
   ) :  <Reserva />
    );
  
   }
  export default DetalleAlojamiento;