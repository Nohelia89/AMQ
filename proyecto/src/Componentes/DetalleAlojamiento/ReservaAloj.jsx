
import axios from 'axios';
import { useState } from 'react';
import { useUserContext } from '../UserContext/userContext';
import { FloatingLabel, Form } from 'react-bootstrap';
import PayPal from '../PayPal/PayPal';

export default function ReservaAloj() {

  const {aloj, userId} = useUserContext();
  const [val , setVal] = useState();
  const [fechaDesde , setFechaDesde] = useState('');
  const [fechaHasta , setFechaHasta] = useState('');
  const[cantDias , setCantDias] = useState();

  const [botonType, setBotonType] = useState('sinpaypal');

  const Pay = () => {
    
     return(<PayPal cant={cantDias} fechaDesde={fechaDesde} fechaHasta={fechaHasta} idHab={val} /> )
    }

  const reservar = () => {
    var diaEnMils = 1000 * 60 * 60 * 24,
  desde = new Date(fechaDesde.substr(0, 10)),
  hasta = new Date(fechaHasta.substr(0, 10)),
  diff = hasta.getTime() - desde.getTime()
var diferencia = diff / diaEnMils;
setCantDias(diferencia);
setBotonType('conpaypal')
console.log("VAL en reserva" + val)
    }

const handleChange = (e) => {
  console.log(`Seleccionaste ${e.target.value}`);
  setVal(e.target.value);
}

console.log("luego de handle change" + val)

    const handleChangeDateFrom = (e) => {
      setFechaDesde(e.target.value)
    }

    const handleChangeDateTo = (e) => {
      setFechaHasta(e.target.value)
    }


    return (
      botonType === 'sinpaypal' ?  
      (<div class="bod">
      <form class="form3" onSubmit={reservar} >
      <div className="input_container">
      <p class="form-input2">Fecha Desde: <input required class="form-input1" name='fechaDesde' type='date' value={fechaDesde} onChange={handleChangeDateFrom}></input> </p>  
    
      <p class="form-input2">Fecha Hasta:  <input required class="form-input1" name='fechaHasta' type='date' value={fechaHasta} onChange={handleChangeDateTo}></input>  </p>  
  </div>
  <div className="input_container">
  
  <FloatingLabel controlId="floatingSelectGrid" label="Habitacion">
  <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>
      {aloj[0].aloj.habs.map((option) => {
          return (<option key={option.id} value={option.id}>{option.descripcion}</option>);
      })}      
    </Form.Select>
    </FloatingLabel>
  
  </div>
      <button class = "btn submits boton">Pagar</button>
     
    </form>
  </div>
       ) :  <Pay />
 )
} 