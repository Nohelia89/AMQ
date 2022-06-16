import axios from "axios";
import { useState } from "react";
import { Base64 } from 'js-base64';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


function AltaHabitacionAlojamiento({dataAloj,pais, direccion}) {
    const idUser = 10034
    const [dataFormH, setDataFormH] = useState({descripcion: '', camas: '', precionoche: ''})
    const [aloj, setAloj] = useState([])

    //var hash = Base64.encode(dataUser.password2); 

    const handleChangeH = (e) => {
        setDataFormH({
          ...dataFormH,
          [e.target.name]: e.target.value,
        
      })
    }

    const generateData = async (e) => {
        e.preventDefault();
        //setAloj(dataAloj)
        console.log("ENTRE A GENERATE");
       


      

        

      

               var enviar = {

                
                    idAnfitrion: idUser,
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
  
            
            
            
       //     console.log("Aloj: "+aloj.id+ aloj.direccion.calle + aloj.direccion.numero + aloj.direccion.pais.nombre+ "habitacion"+habitacion.camas, habitacion.descripcion, habitacion.dtservicios, habitacion.precionoche)
                axios.post('http://localhost:8080/alojamiento/altaAlojHab', enviar )
                
                .then(res => {
             
               //   console.log(habitacion+"SOY HABITACION");
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
             <Link to={'/mainAnfitrion'}>
              <Button variant="dark" >Volver</Button>
            </Link>

           </form>
         </div>
   
       
     )
}
  
    export default AltaHabitacionAlojamiento;