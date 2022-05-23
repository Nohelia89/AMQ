
import { Form } from 'react-bootstrap';
import './Registro.css';
import React, { useState } from 'react'




export default function Registro() {


  const [tipoUsuario, inputType] = useState('huesped');


  const setInputToHuesped = () => {

  inputType('huesped')
  }

  const setInputToHost= () => {

   inputType('anfitrion')
  }
    return (

<>
<div class="bod">
      <form class="form1">
      <div class="tit">REGISTRO</div>
      <input type="checkbox" id="cbox1" value="pricheck"/> onClick={setInputToHuesped()}<label for="cbox2">Huesped</label> 
      <input type="checkbox" id="cbox2" value="segcheck"/> onClick={setInputToHost()} <label for="cbox2">Anfitrion</label>

      {
        tipoUsuario === 'huesped' ?

          <>

<div class="input_container">
      <p class="form-input2" type="Nombre:"><input class="form-input1" ></input></p>
      <p class="form-input2" type="Apellido:"><input class="form-input1" ></input></p></div>
      <p class="form-input2" type="Mail:"><input class="form-input1" ></input></p>

      <button class = "btn submits boton">Registrar huesped</button>
     

          </>

          :

                <>

<div class="input_container">
      <p class="form-input2" type="Nombre:"><input class="form-input1" ></input></p>
      <p class="form-input2" type="Apellido:"><input class="form-input1" ></input></p></div>
      <p class="form-input2" type="Mail:"><input class="form-input1" ></input></p>

      <button class = "btn submits boton">Registrar anfitrion</button>
     
     

         

          </>
            
      }
 </form>

    
  </div>
  </>
 )
} 