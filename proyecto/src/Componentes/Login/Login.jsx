
import axios from 'axios';
import { Base64 } from 'js-base64';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoSinFondo from '../Logo/LogoSinFondo';
import { useUserContext } from '../UserContext/userContext';
import './Login.css';

export default function Login() {
   const {setearToken, setearTipoUsuario} = useUserContext();
   const [dataForm, setDataForm] = useState({ email: '', password: ''})
   const [user , setUser] = useState('');
   const [token , setToken] = useState('');
   var hash = Base64.encode(dataForm.password); 
   var acceso = {
  
    email: dataForm.email,

    pass: hash,

  } ;



  useEffect(() => {
    
   setearTipoUsuario(user)
   setearToken(token)
   
           
         },[][token, user])
        




        async function acceder(e) {
          e.preventDefault();
          const response =  await axios.post(`http://localhost:8080/usuario/login`, acceso) 
          setUser(response.data.tipo)
          setToken(response.data.jwToken)
          console.log("VARIABLE LOGIN "+ user)
           console.log("VARIABLE TOKEN"+ token)
         } 
            
        const handleChange = (e) => {
         setDataForm({
           ...dataForm,
           [e.target.name]: e.target.value
         })
       }

    return (

<div class="overlay">
<form>
<div class="forml">
   <div class="con">
   <header class="head-form">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css" />
   <LogoSinFondo />
      <h4>¡Bienvenidos!</h4>
   </header>
   <br />
   <div class="field-set">
        
         
         <input required class="form-input1" name='email' type='text' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input>
      <br />
     
      <input required type='password' name='password' class="form-input1" value={dataForm.password} onChange={handleChange} placeholder='Ingrese Password'></input>
     
      <br />
     
      <button class="log-in"  onClick={acceder}> Acceder </button>
   </div>

   <div class="other">
   <Link to="/registro">
      
      <button class="sign-up">Registrarse </button>
      </Link>

      <Link to="/forgot">
      <button class="btn submits frgt-pass" >¿Olvidaste tu contraseña?</button>
      </Link>
     

   </div>

  </div>
  </div>
</form>
</div>
 )
}  