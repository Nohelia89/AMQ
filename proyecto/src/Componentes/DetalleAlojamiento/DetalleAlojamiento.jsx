
import { Link } from 'react-router-dom';
import { Button, Card, Carousel, Table } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReservaAloj from "../DetalleAlojamiento/ReservaAloj";
import { Base64 } from 'js-base64';
    
import { useUserContext } from "../UserContext/userContext";

function DetalleAlojamiento() {
    
      const {aloj} = useUserContext();
      const [reseña, setReseña] = useState([]);
  
      const [botonType, setBotonType] = useState('sinActualizar');

      console.log(aloj);
      console.log("ESTOY EN DETALLE " + aloj)
 
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
                //id_Anf: userId
                idAloj: aloj[0].aloj.id
            }
           
           axios.post('http://localhost:8080/reserva/listarResenas', datos)
          .then(res => {
          const rese = res.data;
            setReseña(rese);
          })
        
           
              
            
        }, [])


    return (

   botonType === 'sinActualizar' ?  
   (<div class="bod">
    
    <form className="form21" >
  <Card>
  <Carousel  activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            src={aloj[0].url1}
            alt="First slide"
            width="850"
            height="500"
            
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            src={aloj[0].url2}
            alt="Second slide"
            width="850"
            height="500"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            src={aloj[0].url3}
            alt="Third slide"
            width="850"
            height="500"
          />
  
        </Carousel.Item>
      </Carousel>
      <Card.Body>
      <p>{aloj[0].aloj.nombre}</p>
      <p>{aloj[0].aloj.descripcion}</p>
      <p>Direccion: {aloj[0].aloj.direcion.calle} {aloj[0].aloj.direcion.numero}, {aloj[0].aloj.direcion.ciudad}, {aloj[0].aloj.direcion.pais.nombre}</p>
      Habitaciones: <Table striped bordered hover variant="light" style={{ padding: 10 }}>

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
</Table>
      Reseñas : <Table striped bordered hover variant="light" style={{ padding: 10 }}>

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

      </Card.Body>
      
      <button class="log-in" onClick={reservar} > RESERVAR </button>
  </Card>

  </form>
  </div>
  
   ) :  <Reserva />
    );
  
   }
  export default DetalleAlojamiento;