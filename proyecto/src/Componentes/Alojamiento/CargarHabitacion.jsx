import axios from "axios";
import { useState } from "react";
import { Base64 } from 'js-base64';


function CargarHabitacion({dataUser, dataAloj}) {
    console.log("Dta user");
   console.log(dataUser);
    console.log("data aloJ");
    console.log(dataAloj);
    const [dataFormH, setDataFormH] = useState({descripcion: '', camas: '', precionoche: ''})


    var hash = Base64.encode(dataUser.password2); 

    const handleChangeH = (e) => {
        setDataFormH({
          ...dataFormH,
          [e.target.name]: e.target.value,
        
      })
    }

    const generateData = async (e) => {
        e.preventDefault();
        console.log("ENTRE A GENERATE");
        var anfitrion = {
    
          email: dataUser.email,
          nombre: dataUser.nombre,
          apellido: dataUser.apellido,
          activo: true,
          pass: hash,
          tipo: "anfitrion",
          calificacionGlobal: 0,
          estado: "PENDIENTE"
        } ;

        var alojamiento = {
    
            activo: true,
            descripcion: dataAloj.descripcion,
            direcion: {
                id: 0,
                calle: dataAloj.direccion,
                numero: dataAloj.direccion,
                ciudad: dataAloj.direccion,
                pais: dataAloj.direccion
              },
            nombre: dataAloj.nombre
          };

          var habitacion = {
    
            descripcion: dataFormH.descripcion,
            precionoche: dataFormH.precionoche,
            camas: dataFormH.camas,
            dtservicios: {
                id: 0,
                aire: true,
                tvCable: true,
                jacuzzi: true,
                wifi: true,
                desayuno: true,
                parking: true
              },
          } ;

                console.log("soyanfitrion"+anfitrion.nombre, anfitrion.apellido, anfitrion.email, anfitrion.pass, anfitrion.calificacionGlobal)
                axios.post(`http://localhost:8080/usuario/altaAnfitiron/` + "1", anfitrion )
                
                .then(res => {
                  console.log("ANFITRION");
                  console.log(res.data);
                })

                console.log("aloj"+alojamiento.activo, alojamiento.descripcion, alojamiento.direcion, alojamiento.nombre)
                axios.post(`http://localhost:8080/alojamiento/alta/` + "1", alojamiento )
                
                .then(res => {
                  console.log("ALOJAMIENTO");
                  console.log(res.data);
                })

                console.log("habitacion"+ habitacion.camas, habitacion.descripcion, habitacion.dtservicios, habitacion.precionoche)
                axios.post(`http://localhost:8080/alojamiento/agregarHabitaciones/` + "1", habitacion )
                
                .then(res => {
                  alert("Se creo el anfitrion correctamente")
                  console.log("HABITACION");
                  console.log(res.data);
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

             <button className = "btn submits boton">Registrar</button>
               
           </form>
         </div>
   
       
     )
}
  
    export default CargarHabitacion;