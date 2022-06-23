
import axios from 'axios';
import { useState } from 'react';

import { Base64 } from 'js-base64';
import './Forgot.css';
export default function Forgot2() {



  const [dataForm, setDataForm] = useState({ token:'', password:''})

  var hash = Base64.encode(dataForm.password);


  const Resetear = async (e) => {
    e.preventDefault();
  var sendPass = {

    token: dataForm.token,
    newPassword: hash

  } ;


    axios.post(`http://localhost:8080/usuario/savePassword` , sendPass
    
      )
                
                .then(res => {
                  alert("Se recupero su contraseña exitosamente")
              
                })
                .catch(error => {
                  alert("ERROR: " + error.response.data.mensaje);
                });
    }


    const handleChange = (e) => {
      setDataForm({
    ...dataForm,
        [e.target.name]: e.target.value
      })
    }
    return (
<div class="bod">
      <form class="form3" onSubmit={Resetear}>
      <div class="tit2"><h2>Ingrese los datos solicitados para recuperar la contraseña</h2>
    
      </div>
     <input required class="form-input1" name='token' type='token' value={dataForm.token} onChange={handleChange} placeholder='Ingrese Token'></input>
    
  <input required class="form-input1" name='password' type='password' value={dataForm.password} onChange={handleChange} placeholder='Ingrese Password'></input>
    
      <button class = "btn submits boton">Enviar</button>
     
    </form>
  </div>
      
 )
} 