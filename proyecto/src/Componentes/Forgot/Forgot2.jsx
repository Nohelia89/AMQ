
import axios from 'axios';
import { useState } from 'react';
import './Forgot.css';
export default function Forgot2() {



  const [dataForm, setDataForm] = useState({ token:'', email:''})



  const Resetear = async (e) => {
    e.preventDefault();
  var sendPass = {

    token: dataForm.token,
    email: dataForm.email

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
        ...dataForm,
        [e.target.name]: e.target.value
      })
    }
    return (
<div class="bod">
      <form class="form3" onSubmit={Resetear}>
      <div class="tit2"><h2>Ingrese los datos para recuperar la contraseña</h2>
    
      </div>
      <p class="form-input2" type="Token" ><input required class="form-input1" name='token' type='token' value={dataForm.token} onChange={handleChange} placeholder='Ingrese Token'></input></p>
    
      <p class="form-input2" type="Mail" ><input required class="form-input1" name='email' type='email' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input></p>
    
      <button class = "btn submits boton">Enviar</button>
     
    </form>
  </div>
      
 )
} 