
import { Form } from 'react-bootstrap';
import './Registro.css';





export default function Registro() {
    return (
<div class="bod">
      <form class="form1">
      <div class="tit">REGISTRO</div>
      <input type="checkbox" id="cbox1" value="pricheck"/> <label for="cbox2">Huesped</label> 
      <input type="checkbox" id="cbox2" value="segcheck"/> <label for="cbox2">Anfitrion</label>
      <div class="input_container">
      <p class="form-input2" type="Nombre:"><input class="form-input1" ></input></p>
      <p class="form-input2" type="Apellido:"><input class="form-input1" ></input></p></div>
      <p class="form-input2" type="Mail:"><input class="form-input1" ></input></p>
      <button class = "btn submits boton">Registrar</button>
     
    </form>
  </div>
      
 )
} 