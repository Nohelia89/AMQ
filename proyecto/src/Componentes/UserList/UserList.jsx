
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from "react";

export default function UserList() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);


  useEffect(() => {
    
   axios.get("http://localhost:8080/usuario/listar")
  .then(res => {
  const usuario = res.data;
    setUsuario( usuario);
    setIsLoading(false);
  })


      
    
  },[])




  const Desactivar = (id) => {
      axios.post(`http://localhost:8080/usuario/desactivar/` + id, id,{
        headers: 
        { "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": 
        "Origin, X-Requested-With, Content-Type, Accept"
        }
      }  )
                  
                  .then(res => {
                    alert("Usuario Desactivado")
                    console.log(res.data)
                  })
      }


      const Desbloquear = (id) => {
        axios.post(`http://localhost:8080/usuario/desbloquear/` + id, id,{
          headers: 
          { "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": 
          "Origin, X-Requested-With, Content-Type, Accept"
          }
        }  )
                    
                    .then(res => {
                      alert("Usuario Desbloqueado")
                      console.log(res.data)
                    })
        }

      const Bloquear = (id) => {
        axios.post(`http://localhost:8080/usuario/bloquear/` + id, id,{
          headers: 
          { "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": 
          "Origin, X-Requested-With, Content-Type, Accept"
          }
        }  )
                    
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
              <td><Button variant="dark" onClick={() => Desbloquear(usuario.id)}> Desbloquear </Button></td> : <td><Button variant="success" onClick={() => Bloquear(usuario.id)}>Bloquear</Button></td>) : <td>Desbloqueado</td>   
            } 
            
              </tr>
         
          </tbody>)}
        </Table>
  
    }

  </>
)
}
