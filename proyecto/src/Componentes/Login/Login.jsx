 import { Link } from 'react-router-dom';
import LogoSinFondo from '../Logo/LogoSinFondo';
import './Login.css';

export default function Login() {
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
         <span class="input-item">
         <i class="bi bi-person-circle"></i>
         </span>
         <input class="form-input" id="txt-input" type="text" placeholder="Usuario" required />
     
      <br />
      <span class="input-item">
      <i class="bi bi-key"></i>
      </span>
      <input class="form-input" type="password" placeholder="Contraseña" id="pwd"  name="password" required />
     
      <br />
     
      <button class="log-in"> Acceder </button>
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