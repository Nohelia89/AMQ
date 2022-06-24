
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBarInvitado from '../Navbar/NavbarInvitado';
import './Forgot.css';
import Forgot2 from './Forgot2';
export default function Forgot() {



  const [dataForm, setDataForm] = useState({ email:''})
  const [botontype, setBotonType ] = useState('forgot1');



  const Resetear = async (e) => {
    e.preventDefault();
  var sendMail = {

    email: dataForm.email

  } ;


    axios.post(`http://localhost:8080/usuario/resetPassword` , sendMail
    
      )
                
                .then(res => {
                  alert("Se envió email")
           
                })
                .catch(error => {
                  alert("ERROR: " + error.response.data.mensaje);
                });
                setBotonType('forgot2')
    }


    const handleChange = (e) => {
      setDataForm({
    
        [e.target.name]: e.target.value
      })
    }


    
    const Olvidar = () => {
      return (
           
        <div class="overlay">
            <NavBarInvitado/>
              <form class="form3">
              <div class="tit2"><h2>¿Olvidaste tu contraseña?</h2>Si tu correo es correcto se enviarán los datos para reestablecerla
            
              </div>
        
              <p class="form-input2" type="Mail" ><input required class="form-input1" name='email' type='email' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input></p>
        
              <button class = "btn submits boton" onClick={Resetear}>Enviar</button>
        
            </form>
          </div>
              
         )
    }

    const Olvidar2 = () => {
      return (

        <Forgot2/>

      )
    }

    return (
      botontype === "forgot1" ? <Olvidar /> : <Olvidar2 />

 )
} 