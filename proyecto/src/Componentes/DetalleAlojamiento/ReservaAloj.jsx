
import axios from 'axios';
import { useState } from 'react';

import { Base64 } from 'js-base64';
import { useUserContext } from '../UserContext/userContext';
import { Form } from 'react-bootstrap';
import moment from 'js-moment';

export default function ReservaAloj() {

  const {aloj, userId} = useUserContext();
  const [val , setVal] = useState();
  const [fechaDesde , setFechaDesde] = useState('');
  const [fechaHasta , setFechaHasta] = useState('');



  const reservar = async (e) => {
    e.preventDefault();
  
    var diaEnMils = 1000 * 60 * 60 * 24,
  desde = new Date(fechaDesde.substr(0, 10)),
  hasta = new Date(fechaHasta.substr(0, 10)),
  diff = hasta.getTime() - desde.getTime()// +1 incluir el dia de ini
var diferencia = diff / diaEnMils;
console.log(userId)
  var reserva = {

    idHu: userId,
    idHab: 101,
    cantDias: diferencia,
    descuento: 0,
    idPaypal: "pp",
    ffin: fechaDesde,
    finicio: fechaHasta
  } ;

  

console.log(reserva+ "SOY RESERVA")    
    axios.post(`http://localhost:8080/reserva/alta` , reserva
    
      )
                
                .then(res => {
                  alert("Se realizo la reserva correctamente")
                  console.log(res.data)
                })
    }


const handleChange = (e) => {
  console.log(`Seleccionaste ${e.target.value}`);
  setVal(e.target.value);
}


    const handleChangeDateFrom = (e) => {
      setFechaDesde(e.target.value)
    }

    const handleChangeDateTo = (e) => {
      setFechaHasta(e.target.value)
    }


    return (
<div class="bod">
      <form class="form3" onSubmit={reservar} >
      <div className="input_container">
      <p class="form-input2">Fecha Desde: <input required class="form-input1" name='fechaDesde' type='date' value={fechaDesde} onChange={handleChangeDateFrom}></input> </p>  
    
      <p class="form-input2">Fecha Hasta:  <input required class="form-input1" name='fechaHasta' type='date' value={fechaHasta} onChange={handleChangeDateTo}></input>  </p>  
  </div>
  <div className="input_container">
  <p class="form-input2">Habitacion: 
  <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>
      {aloj[0].aloj.habs.map((option) => {
          return (<option key={option.descripcion} value={option.descripcion}>{option.descripcion}</option>);
      })}      
    </Form.Select>
  </p>   
  </div>
      <button class = "btn submits boton">Reservar</button>
     
    </form>
  </div>
      
 )
} 