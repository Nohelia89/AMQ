import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavBarHuesped from "../Navbar/NavBarHuesped";
import ListadoAlojamientosPorHuesped from "../UserList/ListadoAlojamientosPorHuesped";



function AgregarCalificacionDeAnfitrion({id}) {
   
    const [dataForm, setDataForm] = useState({calificacion: '', resena: ''})
    const [botonType, setBotonType] = useState('sinActualizar');

    const handleChange = (e) => {
        setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value,
        
      })
    }

    const generateData = async (e) => {
        e.preventDefault();
   
      
       


      

        

          var calificacion = {
    
            idUsuario: 10053,
            idReserva: id,
            calificacion: dataForm.calificacion,
            resena: dataForm.resena
          } ;

               
        
                
  
           
                axios.post("http://localhost:8080/reserva/calificar", calificacion )
                
                .then(res => {
             
                 
                  console.log(res.data);
                })
                setBotonType("actualizado")
          
        }

    return (
      botonType === "sinActualizar" ?
<>
<NavBarHuesped/>
        <div className="bod1">
             <form className="form1"  onSubmit={generateData} >
             <div className="tit">CALIFICACION</div>
             <div className="input_container">
             <p className="form-input2" type="Calificacion:"><input required class="form-input1" name='calificacion' type='text' value={dataForm.calificacion} onChange={handleChange} placeholder='Ingrese calificacion'></input></p>
</div>
             <p className="form-input2" type="Reseña:"><textarea className="textarea" rows="7" cols="70" name='resena' type='text'  onChange={handleChange} value={dataForm.resena}></textarea></p>

             <button className = "btn submits boton">Calificar</button>
             <Link to={'/mainHuesped'}>
              <Button variant="dark" >Menu Principal</Button>
            </Link>

           </form>
         </div>
   
         </>
         :
         <ListadoAlojamientosPorHuesped/>
     )
}
  
    export default AgregarCalificacionDeAnfitrion;