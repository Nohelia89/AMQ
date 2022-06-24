import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavBarHuesped from "../Navbar/NavBarHuesped";

import HistoricoAlojamientosAnfitrion from "../UserList/HistoricoAlojamientosAnfitrion";
import NavBarAnfitrion from "../Navbar/NavBarAnfitrion";
import { useUserContext } from "../UserContext/userContext";



function AgregarModificarCalificacionDeHuesped({id}) {
   
    const [dataForm, setDataForm] = useState({calificacion: '', resena: ''})
    const [botonType, setBotonType] = useState('sinActualizar');
    const { userToken, userId } = useUserContext();
    const handleChange = (e) => {
        setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value,
        
      })
    }

    const generateData = async (e) => {
        e.preventDefault();
   
      
       


      

        

          var calificacion = {
    
            idUsuario: userId,
            idReserva: id,
            calificacion: dataForm.calificacion,
            resena: dataForm.resena
          } ;

               
        
                
  
           
                axios.post("http://localhost:8080/reserva/calificar",{calificacion},{
                  headers: {
                    'Authorization': `token ${userToken}`
                  }
                })
                
             
             
                    .then(res => {
             
                 
                  alert("CALIFICACION INGRESADA CORRECTAMENTE");
                  
                })
                .catch(error => {
                  alert("ERROR: " + error.response.data.mensaje);
                });
                
                setBotonType("actualizado")
          
        }

    return (
      botonType === "sinActualizar" ?
<>
<NavBarAnfitrion/>
        <div className="bod1">
             <form className="form1"  onSubmit={generateData} >
             <div className="tit">CALIFICACION</div>
             <div className="input_container">
             <p className="form-input2" type="Calificacion:"><input required class="form-input1" name='calificacion' type='text' value={dataForm.calificacion} onChange={handleChange} placeholder='Ingrese calificacion'></input></p>
</div>
             

             <button className = "btn submits boton">Calificar</button>
             <Link to={'/mainHuesped'}>
              <Button variant="dark" >Menu Principal</Button>
            </Link>

           </form>
         </div>
   
         </>
         :
         <HistoricoAlojamientosAnfitrion/>
     )
}
  
    export default AgregarModificarCalificacionDeHuesped;