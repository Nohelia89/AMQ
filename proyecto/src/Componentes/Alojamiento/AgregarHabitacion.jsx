import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../UserContext/userContext";


function AgregarHabitacion({ id }) {

  const [dataFormH, setDataFormH] = useState({ descripcion: '', camas: '', precionoche: '' })
  const [idAloj, setIdAloj] = useState('')
  const { userToken } = useUserContext();
  const [valYa, setValYa] = useState(false)
  const [valW, setValW] = useState(false)
  const [valAi, setValAi] = useState(false)
  const [valTv, setValTv] = useState(false)
  const [valPa, setValPa] = useState(false)
  const [valDe, setValDe] = useState(false)

  //var hash = Base64.encode(dataUser.password2); 
  const handleChangeYa = (e) => {
    console.log(`Seleccionaste ${e.target.checked}`);
   setValYa(e.target.checked);
    
}

  const handleChangeH = (e) => {
      setDataFormH({
        ...dataFormH,
        [e.target.name]: e.target.value,
      
    })
  }

  const handleChangeTv = (e) => {
    console.log(`Seleccionaste ${e.target.checked}`);
    setValTv(e.target.checked);
}
  const handleChangeAi = (e) => {
    console.log(`Seleccionaste ${e.target.checked}`);
    setValAi(e.target.checked);
}

const handleChangeW = (e) => {
  console.log(`Seleccionaste ${e.target.checked}`);
  setValW(e.target.checked);
}

const handleChangePa = (e) => {
console.log(`Seleccionaste ${e.target.checked}`);
setValPa(e.target.checked);
}

const handleChangeDe = (e) => {
console.log(`Seleccionaste ${e.target.checked}`);
setValDe(e.target.checked);
}


  const generateData = async (e) => {
    e.preventDefault();
    setIdAloj(id)



    var habitacion = {

      descripcion: dataFormH.descripcion,
      precionoche: dataFormH.precionoche,
      camas: dataFormH.camas,
      dtservicios: {
        aire: valAi,
        tvCable: valTv,
        jacuzzi: valYa,
        wifi: valW,
        desayuno: valDe,
        parking: valPa
      },
    };





    axios.post('http://localhost:8080/alojamiento/agregarHabitaciones/' + id, {habitacion},{
      headers: {
        'Authorization': `token ${userToken}`
      }
    })

      .then(res => {

        alert("SE AGREGO LA HABITACION CORRECTAMENTE ");
      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje); 
      });

  }

  return (

    <div className="bod1">
      <form className="form1" onSubmit={generateData} >
        <div className="tit">HABITACION</div>
        <div className="input_container">
          <p className="form-input2" type="Precio Por Noche (en US$):"><input required class="form-input1" name='precionoche' type='text' value={dataFormH.precionoche} onChange={handleChangeH} placeholder='Ingrese Precio por Noche'></input></p>
          <p className="form-input2" type="Camas"><input required class="form-input1" name='camas' type='text' value={dataFormH.camas} onChange={handleChangeH} placeholder='Ingrese Cantidad de Camas'></input></p></div>
        <p className="form-input2" type="Descripcion:"><textarea className="textarea" rows="7" cols="70" name='descripcion' type='text' onChange={handleChangeH} value={dataFormH.descripcion}></textarea></p>
        <div className="mb-3"> 
    <Form.Check
        inline
        type='checkbox'
        id='default-checkbox'
        label='Jacuzzi' onChange={handleChangeYa} value={valYa}
      /><Form.Check
      inline
        type='checkbox'
        id='default-checkbox'
        label='Aire' onChange={handleChangeAi} value={valAi}
      /> <Form.Check
      inline
      type='checkbox'
      id='default-checkbox'
      label='TvCable' onChange={handleChangeTv} value={valTv}
    /> <Form.Check
      inline
      type='checkbox'
      id='default-checkbox'
      label='Wifi' onChange={handleChangeW} value={valW}
    /> <Form.Check
      inline
      type='checkbox'
      id='default-checkbox'
      label='Desayuno' onChange={handleChangeDe} value={valDe}
    />
    <Form.Check
      inline
      type='checkbox'
      id='default-checkbox'
      label='Parking' onChange={handleChangePa} value={valPa}
    /></div>
        <button className="btn submits boton">Registrar</button>
        <Link to={'/mainAnfitrion'}>
          <Button variant="dark" >Volver</Button>
        </Link>

      </form>
    </div>
 

  )
}

export default AgregarHabitacion;