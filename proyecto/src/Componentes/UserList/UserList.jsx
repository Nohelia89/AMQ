
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';

export default function UserList() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const {userToken, userType} = useUserContext();

  useEffect(() => {
    
   axios.post("http://localhost:8080/usuario/listar", {})
  .then(res => {
  const usuario = res.data;
    setUsuario(usuario);
    setIsLoading(false);
  })

  console.log("ENTRE AL TOKEN LISTADO" + userToken )
  console.log("GUARDE EL TIPO DE USUARIO LISTADO: " + userType )  
      
    
  },[])




  const Desactivar = (id) => {
      axios.post(`http://localhost:8080/usuario/desactivar/` + id, id )
                  
                  .then(res => {
                    alert("Usuario Desactivado")
                    console.log(res.data)
                  })
      }


      const Desbloquear = (id) => {
        axios.post(`http://localhost:8080/usuario/desbloquear/` + id, id)
                    
                    .then(res => {
                      alert("Usuario Desbloqueado")
                      console.log(res.data)
                    })
        }

      const Bloquear = (id) => {
        axios.post(`http://localhost:8080/usuario/bloquear/` + id, id)
                    
                    .then(res => {
                      alert("Usuario Bloqueado")
                      console.log(res.data)
                    })
        }


return (

  <>

    {isLoading ? <h2>Cargando...</h2> : 
          <Table striped bordered hover variant="light" style={{ padding: 10 }}>

          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Mail</th>
              <th>Activo/Desactivo</th>
              <th>Bloqueado/Desbloqueado</th>
              
            </tr>
          </thead>
          {usuario.map(usuario => <tbody key={usuario.id} >
            <tr>
            {usuario.tipo === "Ad" ? 
             <td>Administrador</td> : (usuario.tipo === "Hu" ? <td>Huesped</td>  : <td>Anfitrion</td> )            
            }
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              { usuario.tipo !== "Ad" ? (usuario.activo === true ? 
              <td><Button variant="danger" onClick={() => Desactivar(usuario.id)}>Desactivar</Button></td> : <td><Button variant="success" >Activar</Button></td>) : <td>Activo</td>  
            }
             { usuario.tipo !== "Ad" ? (usuario.bloqueado === true ? 
              <td><Button variant="success" onClick={() => Desbloquear(usuario.id)}> Desbloquear </Button></td> : <td><Button variant="dark" onClick={() => Bloquear(usuario.id)}>Bloquear</Button></td>) : <td>Desbloqueado</td>   
            } 
            
              </tr>
         
          </tbody>)}
        </Table>
  
    }

  </>
)
}
