
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
import { useUserContext } from "../UserContext/userContext";
import NavBarInvitado from '../Navbar/NavbarInvitado';
import Login from '../Login/Login';

function FormAdmin() {


  const [dataForm, setDataForm] = useState({ nombre: '', apellido: '', email: '', password: '', password2: '' })
  const { userToken } = useUserContext();
  var hash = Base64.encode(dataForm.password);
  const [botonType, setBotonType] = useState('sinActualizar');

  var admin = {

    email: dataForm.email,
    nombre: dataForm.nombre,
    apellido: dataForm.apellido,
    activo: true,
    bloqueado:false,
    pass: hash,
    tipo: "Ad"
  };

  const generateAdmin = async (e) => {
    e.preventDefault()

    if (dataForm.password === dataForm.password2) {


      axios.post(`http://localhost:8080/usuario/altaAdmin/`, admin, {
        headers: {
          'Authorization': `${userToken}`
        }
      } )
        .then(res => {
          alert("El usuario ha sido ingresado con éxito al sistema");
          setBotonType("actualizado")
        })
        .catch(error => {
          alert("ERROR: " + error.response.data.mensaje);
        });

    }
  }

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }
  return (

    botonType === 'sinActualizar' ?  
    <div class="overlay">
      <NavBarInvitado/>
      <form class="form1" onSubmit={generateAdmin}>
        <div class="tit">REGISTRO ADMINISTRADOR</div>



        <div class="input_container">
          <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={dataForm.nombre} onChange={handleChange} placeholder='Ingrese Nombre'></input></p>
          <p class="form-input2" type="Apellido:"><input required class="form-input1" name='apellido' type='text' value={dataForm.apellido} onChange={handleChange} placeholder='Ingrese Apellido'></input></p>
        </div>
        <div>
          <p class="form-input2" type="Mail:"><input required class="form-input1" name='email' type='email' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input></p>
          <p class="form-input2" type="Password:"><input required type='password' name='password' class="form-input1" value={dataForm.password} onChange={handleChange} placeholder='Ingrese Password'></input></p>
          <input required type='password' name='password2' class="form-input1" value={dataForm.password2} onChange={handleChange} placeholder='Repita Password'></input>
        </div>

        <br />

        <div  style={{ padding: "10px", marginTop: "60px" }}>

<Link to={'/mainAdministrador'}>
  <button style={{marginRight: "10px" }}  class="sign-up">Volver</button>
</Link>

<button style={{ marginLeft: "10px"}}  id="formulario" class="sign-up">Registrar Administardor</button>
</div>



      </form>
    </div>
:
<Login/>
  );

}
export default FormAdmin;