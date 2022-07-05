import axios from "axios";
import { useState } from "react";
import { Base64 } from 'js-base64';

import { Form } from "react-bootstrap";

function CargarHabitacion({dataUser, dataAloj, dataAlojdir, pais}) {
console.log(dataAloj)
    const [dataFormH, setDataFormH] = useState({descripcion: '', camas: '', precionoche: ''})
    const [idAloj, setIdAloj] = useState('')
    
    const [valYa, setValYa] = useState(false)
    const [valW, setValW] = useState(false)
    const [valAi, setValAi] = useState(false)
    const [valTv, setValTv] = useState(false)
    const [valPa, setValPa] = useState(false)
    const [valDe, setValDe] = useState(false)
    
    var hash = Base64.encode(dataUser.password2); 

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
        console.log("ENTRE A GENERATE");
        
        
      var anfitrion = {
          id: 0,
          email: dataUser.email,
          nombre: dataUser.nombre,
          apellido: dataUser.apellido,
          activo: true,
          bloqueado: true,
          pass: hash,
          tipo: "an",
          calificacion: 0,
          calificacionGlobal: 0,
          bloqueado: false,
          estado: "PENDIENTE"
        } ;

        var alojamiento = {
          id: 0,
          activo: true,
          descripcion: dataAloj.descripcion,
          direcion: {
              id: 0,
              calle: dataAlojdir.calle,
              numero: dataAlojdir.numero,
              ciudad: dataAlojdir.ciudad,
              pais: 
              {
                id: pais,
                nombre: ''
              }
            },
          nombre: dataAloj.nombre,
          habs: [
            {
              id: 0,
              descripcion:  dataFormH.descripcion,
              precioNoche: dataFormH.precionoche,
              camas: dataFormH.camas,
              dtservicios: {
                id: idAloj,
              aire: valAi,
              tvCable: valTv,
              jacuzzi: valYa,
              wifi: valW,
              desayuno: valDe,
              parking: valPa
              }
            }
          ]
        } ;

        var habitacion = {
        
          descripcion: dataFormH.descripcion,
          precioNoche: dataFormH.precionoche,
          camas: dataFormH.camas,
          dtservicios: {
              id: idAloj,
              aire: valAi,
              tvCable: valTv,
              jacuzzi: valYa,
              wifi: valW,
              desayuno: valDe,
              parking: valPa
            }
        } ;

        var enviar = { anfitrion, alojamiento,habitacion }
           
                axios.post(`http://localhost:8080/usuario/altaAnfitiron`, enviar )
                
                .then(res => {
           
                  setIdAloj(res.data.id)
                  alert(response.data.mensaje);

                })
                .catch(error => {
                  alert("ERROR: " + error.response.data.mensaje);
                })

               
          
        }
       
    return (
    
        <div className="bod1">
             <form className="form1"  onSubmit={generateData} >
             <div className="tit">HABITACION</div>
             <div className="input_container">
             <p className="form-input2" type="Precio Por Noche (en US$):"><input required class="form-input1" name='precionoche' type='text' value={dataFormH.precionoche} onChange={handleChangeH} placeholder='Ingrese Precio por Noche'></input></p>
             <p className="form-input2" type="Camas"><input required class="form-input1" name='camas' type='text' value={dataFormH.camas} onChange={handleChangeH} placeholder='Ingrese Cantidad de Camas'></input></p></div>
             <p className="form-input2" type="Descripcion:"><textarea className="textarea" rows="7" cols="70" name='descripcion' type='text'  onChange={handleChangeH} value={dataFormH.descripcion}></textarea></p>
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
             <button className = "btn submits boton">Registrar</button>
               
           </form>
         </div>
   
       
     )
}
  
    export default CargarHabitacion;