
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [idAnf, setIdAnf] = useState(10041);
  const { userToken } = useUserContext();
  useEffect(() => {


   
      
    axios.post(`http://localhost:8080/usuario/buscar/`+ idAnf, {}, {
      headers: {
        'Authorization': `token ${userToken}`
      }
    })
        .then(res => {
            const usuario = res.data;
            setUser(usuario);
     
           // setIsLoading(false);
        })
        .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

 
}, [])


    
   
  
    return (
        

        <div class="bod">
        <form class="form1">
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
        <Link to={'/mainAnfitrion'}>
              <Button variant="dark" >Volver</Button>
            </Link>

       
        </div>
        
        
  
   </form>
   </div>
      
    );
  
   }
  export default UserProfile;