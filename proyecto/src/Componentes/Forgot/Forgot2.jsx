
import axios from 'axios';
import { useState } from 'react';

import { Base64 } from 'js-base64';
import './Forgot.css';
export default function Forgot() {



  const [dataForm, setDataForm] = useState({ token:'', pass:''})

  var hash = Base64.encode(dataForm.pass);


  const Resetear = async (e) => {
    e.preventDefault();
  var sendPass = {

    token: dataForm.token,
    pass: hash

  } ;

console.log(sendPass+ "SOY SENDMAIL")    
    axios.post(`http://localhost:8080/usuario/savePassword` , sendPass
    
      )
                
                .then(res => {
                  alert("Se recupero su contraseña exitosamente")
                  console.log(res.data)
                })
    }


    const handleChange = (e) => {
      setDataForm({
    
        [e.target.name]: e.target.value
      })
    }
    return (
<div class="bod">
      <form class="form3" onSubmit={Resetear}>
      <div class="tit2"><h2>Ingrese los datos solicitados para recuperar la contraseña</h2>
    
      </div>
      <p class="form-input2" type="Token" ><input required class="form-input1" name='token' type='token' value={dataForm.token} onChange={handleChange} placeholder='Ingrese Token'></input></p>
    
      <p class="form-input2" type="Password" ><input required class="form-input1" name='password' type='password' value={dataForm.pass} onChange={handleChange} placeholder='Ingrese Password'></input></p>
    
      <button class = "btn submits boton">Enviar</button>
     
    </form>
  </div>
      
 )
} 