
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserContext } from '../UserContext/userContext';
import { FloatingLabel, Form } from 'react-bootstrap';
import PayPal from '../PayPal/PayPal';

export default function ReservaAloj() {

  const {aloj} = useUserContext();
  const [val , setVal] = useState(aloj[0].aloj.habs[0].id);
  const [fechaDesde , setFechaDesde] = useState('');
  const [fechaHasta , setFechaHasta] = useState('');
  const[cantDias , setCantDias] = useState();
  const[precioNoche , setPrecioNoche] = useState(aloj[0].aloj.habs[0].precioNoche);
  const[descripcion , setDescripcion] = useState(aloj[0].aloj.habs[0].descripcion);

  const [botonType, setBotonType] = useState('sinpaypal');

  const Pay = () => {
    
     return(<PayPal cant={cantDias} fechaDesde={fechaDesde} fechaHasta={fechaHasta} idHab={val} precioNoche={precioNoche} descripcion={descripcion} /> )
    }

  const reservar = () => {
    var diaEnMils = 1000 * 60 * 60 * 24,
  desde = new Date(fechaDesde.substr(0, 10)),
  hasta = new Date(fechaHasta.substr(0, 10)),
  diff = hasta.getTime() - desde.getTime()
var diferencia = diff / diaEnMils;
setCantDias(diferencia);
setBotonType('conpaypal')

    }

const handleChange = (e) => {

  setVal(e.target.value);

 
}


    const handleChangeDateFrom = (e) => {
      setFechaDesde(e.target.value)
    }

    const handleChangeDateTo = (e) => {
      setFechaHasta(e.target.value)
    }

    useEffect(() => {


       aloj[0].aloj.habs.map((option, index) => {

        if(parseInt(option.id) === parseInt(val)){
          
     
          setPrecioNoche(aloj[0].aloj.habs[index].precioNoche)
          setDescripcion(aloj[0].aloj.habs[index].descripcion)    
       
        }
    })
              
            },[val])


    return (
      botonType === 'sinpaypal' ?  
      (<div class="overlay">
      <form class="form3" onSubmit={reservar} >
      <div className="input_container">
      <p class="form-input2">Fecha Desde: <input required class="form-input1" name='fechaDesde' type='date' value={fechaDesde} onChange={handleChangeDateFrom}></input> </p>  
    
      <p class="form-input2">Fecha Hasta:  <input required class="form-input1" name='fechaHasta' type='date' value={fechaHasta} onChange={handleChangeDateTo}></input>  </p>  
  </div>
  <div className="input_container">
  
  <FloatingLabel controlId="floatingSelectGrid" label="Habitacion">
  <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>
    
      {
      aloj[0].aloj.habs.map((option, index) => {
          return (<option key={index.id} value={option.id}>{option.descripcion}</option>);
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