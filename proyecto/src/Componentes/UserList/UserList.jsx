
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from "react";

//const gfetch = new Promise((resolve) => {resolve("http://localhost:8080/usuarios")})
export default function UserList() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  /*useEffect(() => {
    fetch("http://localhost:8080/usuarios")
      .then((response) => {
        setUsuario(response.);
        setIsLoading(false);
        console.log(usuario)
        
      });
  }, []);*/
  
  useEffect(() => {
    fetch("http://localhost:8080/usuarios")
    //simulacion de llamado a una api

        .then((resp) => setUsuario(resp))
        .catch((err) => console.log(err)) // capturamos todos los errores con el catch
        .finally(() => setIsLoading(false))//ej loading
      

}, [])

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
              <td>{usuario.activo}</td>
              <td>     <Button variant="dark" >X</Button></td>
            </tr>
  
          </tbody>)}
  
          {usuario.length > 0 ?
  
  
            <tbody >
  
              <td><h6>Total de su compra:</h6></td>
              <td>US$PRECIO</td>
  
  
  
            </tbody>
            : null}
        </Table>
  
    }

  </>
)
}
