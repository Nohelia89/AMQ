import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUserContext } from "../UserContext/userContext";


function AltaHabitacionAlojamiento({ dataAloj, pais, direccion }) {
  const { userToken, userId } = useUserContext();
  //const idUser = 10034
  const [dataFormH, setDataFormH] = useState({ descripcion: '', camas: '', precionoche: '' })
  const [aloj, setAloj] = useState([])



  const handleChangeH = (e) => {
    setDataFormH({
      ...dataFormH,
      [e.target.name]: e.target.value,

    })
  }

  const generateData = async (e) => {
    e.preventDefault();










    var enviar = {


      idAnfitrion: userId,
      aloj_descripcion: dataAloj.descripcion,

      aloj_direcion: {
        id: 0,
        calle: direccion.calle,
        numero: direccion.numero,
        ciudad: direccion.ciudad,
        pais: {
          id: pais,
          nombre: ''
        }
      },
      aloj_nombre: dataAloj.nombre,
      hab_descripcion: dataFormH.descripcion,
      hab_precioNoche: dataFormH.precionoche,
      hab_camas: dataFormH.camas,
      hab_dtservicios: {
        id: 0,
        aire: true,
        tvCable: true,
        jacuzzi: true,
        wifi: true,
        desayuno: true,
        parking: true


      }

    }




    axios.post('http://localhost:8080/alojamiento/altaAlojHab', enviar,{
      headers: {
        'Authorization': `${userToken}`
      }
    })

      .then(res => {

        alert("SE AGREGO EL ALOJAMIENTO CORRECTAMENTE ");
      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

  }

  return (

    <div className="bod1">
      <form className="form6" onSubmit={generateData} >
        <div className="tit">HABITACION</div>
        <div className="input_container">
          <p className="form-input2" type="Precio Por Noche (en US$):"><input required class="form-input1" name='precionoche' type='text' value={dataFormH.precionoche} onChange={handleChangeH} placeholder='Ingrese Precio por Noche'></input></p>
          <p className="form-input2" type="Camas"><input required class="form-input1" name='camas' type='text' value={dataFormH.camas} onChange={handleChangeH} placeholder='Ingrese Cantidad de Camas'></input></p></div>
        <p className="form-input2" type="Descripcion:"><textarea style={{ marginBottom:"40px" }} className="textarea" rows="5" cols="50" name='descripcion' type='text' onChange={handleChangeH} value={dataFormH.descripcion}></textarea></p>

  
        <button className="sign-up" style={{marginLeft:"30px", marginTop:"20px" }}>Agregar</button>
        <Link to={'/mainAnfitrion'}>
          <button class="sign-up" style={{marginLeft:"30px",marginTop:"10px" }} >Volver</button>
        </Link>
      </form>
    </div>


  )
}

export default AltaHabitacionAlojamiento;