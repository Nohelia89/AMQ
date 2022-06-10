
import axios from 'axios';
import { useState } from 'react';
import './Forgot.css';
export default function Forgot() {



  const [dataForm, setDataForm] = useState({ email:''})



  const Resetear = async (e) => {
    e.preventDefault();
  var sendMail = {

    email: dataForm.email

  } ;

console.log(sendMail+ "SOY SENDMAIL")    
    axios.post(`http://localhost:8080/usuario/resetPassword` , sendMail
    
      )
                
                .then(res => {
                  alert("Se envió email")
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
      <div class="tit2"><h2>¿Olvidaste tu contraseña?</h2>Si tu correo es correcto se enviarán los datos para reestablecerla
    
      </div>

      <p class="form-input2" type="Mail" ><input required class="form-input1" name='email' type='email' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input></p>
    
      <button class = "btn submits boton">Enviar</button>
     
    </form>
  </div>
      
 )
} 