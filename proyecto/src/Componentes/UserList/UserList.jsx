
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from "react";

export default function UserList() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);

  
  axios.get("http://localhost:8080/usuario/listar")
  .then(res => {
 
  const usuario = res.data;
    setUsuario( usuario);
    setIsLoading(false);
  })

return (

  <>

    {isLoading ? <h2>Cargando...</h2> : 
          <Table striped bordered hover variant="light" style={{ padding: 10 }}>

          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Mail</th>
              <th>Activo</th>
            </tr>
          </thead>
          {usuario.map(usuario => <tbody key={usuario.email} >
            <tr>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              {usuario.activo === true ? 
              <td>Si</td> : <td>No</td> 
            }
              <td>     <Button variant="dark" >X</Button></td>
            </tr>
  
          </tbody>)}
        </Table>
  
    }

  </>
)
}
