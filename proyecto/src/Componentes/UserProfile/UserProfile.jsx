
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import NavBarHuesped from '../Navbar/NavBarHuesped';



function UserProfile() {
  const [user, setUser] = useState([]);
  const [idAnf, setIdAnf] = useState();
  const { userToken, userId, userType } = useUserContext();
  useEffect(() => {


   
      
    axios.post(`http://localhost:8080/usuario/buscar/`+ userId, {
      headers: {
        'Authorization': `${userToken}`
      }
    })
        .then(res => {
            const usuario = res.data;
            setUser(usuario);
     
         
        })
        .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

 
}, [])


    
   
  
    return (
        <>
      {
        userType === "Hu" ?
    
        <div class="overlay">
      
      <NavBarHuesped/>
        <form class="form6">
        <div class="tit">PERFIL HUESPED</div>
      
  
  
        <div class="input_container">
        <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={user.nombre} ></input></p>
        <p class="form-input2" type="Apellido:"><input required class="form-input1" name='apellido' type='text' value={user.apellido} ></input></p>
        </div>
        <div>
        <p class="form-input2" type="Mail:"><input required class="form-input1" name='email' type='email' value={user.email} ></input></p>
        <p class="form-input2" type="Calificacion Global:"><input required class="form-input1" name='calificacion' type='text' value={user.calificacionGlobal} ></input></p>
     {/*    <p class="form-input2" type="Password:"><input required type='password' name='password' class="form-input1" value={user.password} onChange={handleChange} placeholder='Ingrese Password'></input></p>
        <input required type='password' name='password2' class="form-input1" value={dataForm.password2} onChange={handleChange} placeholder='Repita Password'></input> */}
        </div>
  
        <br />

        <div>
        <Link to={'/mainHuesped'}>
              <button class="sign-up" style={{marginTop:"40px" }} >Volver</button>
            </Link>

       
        </div>
        
        
  
   </form>
   </div>  :
   <div class="overlay">
      
      <NavBarAnfitrion/>
        <form class="form6">
        <div class="tit">PERFIL ANFITRION</div>
      
  
  
        <div class="input_container">
        <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={user.nombre} ></input></p>
        <p class="form-input2" type="Apellido:"><input required class="form-input1" name='apellido' type='text' value={user.apellido} ></input></p>
        </div>
        <div>
        <p class="form-input2" type="Mail:"><input required class="form-input1" name='email' type='email' value={user.email} ></input></p>
        <p class="form-input2" type="Calificacion Global:"><input required class="form-input1" name='calificacion' type='text' value={user.calificacionGlobal} ></input></p>
     {/*    <p class="form-input2" type="Password:"><input required type='password' name='password' class="form-input1" value={user.password} onChange={handleChange} placeholder='Ingrese Password'></input></p>
        <input required type='password' name='password2' class="form-input1" value={dataForm.password2} onChange={handleChange} placeholder='Repita Password'></input> */}
        </div>
  
        <br />

        <div>
        <Link to={'/mainAnfitrion'}>
              <button class="sign-up" >Volver</button>
            </Link>

       
        </div>
        
        
  
   </form>
   </div>  }
   </>
    );
  
   }
  export default UserProfile;