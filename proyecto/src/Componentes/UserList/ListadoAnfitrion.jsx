
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAdministrador from '../Navbar/NavBarAdministrador';

export default function ListadoAnfitrion() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [anfitrion, setAnfitrion] = useState([]);
  const {userToken, userType} = useUserContext();


  
  useEffect(() => {
    

    var anfitriones = {

      tipo:'An'
      
    } ;




   axios.post("http://localhost:8080/usuario/listar", anfitriones)
  .then(res => {
  const anfitriones = res.data;
    setAnfitrion(anfitriones);
    setIsLoading(false);
  })

   
      
    
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
  <NavBarAdministrador/>

    {isLoading ? <h2>Cargando...</h2> : 
          <Table striped bordered hover variant="light" style={{ padding: 10 }}>

          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Mail</th>
              <th>Calificación</th>
              <th>Estado</th>
              <th>Rechazar</th>
              
            </tr>
          </thead>
          {anfitrion.map(anfitrion => <tbody key={anfitrion.id} >
            <tr>
            {anfitrion.tipo === "Ad" ? 
             <td>Administrador</td> : (anfitrion.tipo === "Hu" ? <td>Huesped</td>  : <td>Anfitrion</td> )            
            }
              <td>{anfitrion.nombre}</td>
              <td>{anfitrion.apellido}</td>
              <td>{anfitrion.email}</td>
              <td>{anfitrion.calificacionGlobal}</td>
             { anfitrion.estado === 'PENDIENTE' ?  
             <td><Button variant="success" onClick={() => Desbloquear(anfitrion.id)}> Aprobar </Button></td>:
             <td>{anfitrion.estado}</td>
               
            } 
             { anfitrion.estado === 'PENDIENTE' ?  
               <td><Button variant="dark" onClick={() => Bloquear(anfitrion.id)}>Rechazar</Button></td>:
         
             <td>--- </td>
            }
              </tr>
         
          </tbody>)}
        </Table>
  
    }

  </>
)
}
