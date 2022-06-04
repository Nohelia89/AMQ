
import axios from 'axios';
import { useState } from 'react';
import './Forgot.css';
export default function Forgot() {


  const [email, setEmail] = useState('')
  const Resetear = (email) => {
    
    axios.post(`http://localhost:8080/usuario/resetPassword` , email,{
      headers: 
      { "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": 
      "Origin, X-Requested-With, Content-Type, Accept"
      }
    }  )
                
                .then(res => {
                  alert("Se envió email")
                  console.log(res.data)
                })
    }
    return (
<div class="bod">
      <form class="form3">
      <div class="tit2"><h2>¿Olvidaste tu contraseña?</h2>Si tu correo es correcto se enviarán los datos para reestablecerla
    
      </div>

      <p class="form-input2" type="Email" ><input class="form-input1" onChange={(event) => setEmail(event.target.value)} placeholder="Ingrese su mail aquí"></input></p>
    
      <button class = "btn submits boton" onClick={() => Resetear(email)}>Enviar</button>
     
    </form>
  </div>
      
 )
} 