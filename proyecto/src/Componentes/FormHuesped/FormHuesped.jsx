
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';

function FormHuesped() {


    const [dataForm, setDataForm] = useState({ nombre: '', apellido: '', email: '', password: '', password2:'' })

    var hash = Base64.encode(dataForm.password); 
  
    
  const generateUser = async (e) => {
    e.preventDefault();

  
    
    var huesped = {

      email: dataForm.email,
      nombre: dataForm.nombre,
      apellido: dataForm.apellido,
      activo: true,
      pass: hash,
      calificacionGlobal: 0
    } ;

    if (dataForm.password === dataForm.password2) {
      
         
            axios.post(`http://localhost:8080/usuario/altaHuesped`, huesped )
            
            .then(res => {
              alert("El usuario ha sido ingresado con éxito al sistema");
            })
            .catch(error => {
              alert("ERROR: " + error.response.data.mensaje);
            });
            
      }
    }

    const handleChange = (e) => {
        setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value
        })
      }
    return (
        

        <div class="bod">
        <form class="form1"  onSubmit={generateUser}>
        <div class="tit">REGISTRO HUESPED</div>
      
  
  
        <div class="input_container">
        <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={dataForm.nombre} onChange={handleChange} placeholder='Ingrese Nombre'></input></p>
        <p class="form-input2" type="Apellido:"><input required class="form-input1" name='apellido' type='text' value={dataForm.apellido} onChange={handleChange} placeholder='Ingrese Apellido'></input></p>
        </div>
        <div>
        <p class="form-input2" type="Mail:"><input required class="form-input1" name='email' type='email' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input></p>
        <p class="form-input2" type="Password:"><input required type='password' name='password' class="form-input1" value={dataForm.password} onChange={handleChange} placeholder='Ingrese Password'></input></p>
        <input required type='password' name='password2' class="form-input1" value={dataForm.password2} onChange={handleChange} placeholder='Repita Password'></input>
        </div>
  
        <br />

        <div>
        <Link to={'/registro'}>
              <Button variant="dark" >Volver</Button>
            </Link>

        <button variant="dark" class = "btn submits boton">Registrar huesped</button>
        </div>
        
        
  
   </form>
   </div>
      
    );
  
   }
  export default FormHuesped;