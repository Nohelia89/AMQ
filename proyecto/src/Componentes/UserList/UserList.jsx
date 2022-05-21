import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'


import { useEffect, useState } from "react";
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
  
  const gfetch = new Promise((resolve) => {resolve("http://localhost:8080/usuarios")})
 
  useEffect(() => {
    gfetch //simulacion de llamado a una api

        .then((resp) => setUsuario(resp))
        .catch((err) => console.log(err)) // capturamos todos los errores con el catch
        .finally(() => setIsLoading(false))//ej loading

}, [])

  if (isLoading) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div>
      <div>
<Table striped bordered hover variant="light" style={{ padding: 10 }}>

 <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>Activo</th>
          </tr>
        </thead> 
 {usuario.map((usu) => 
        <tbody key={usu.email}>
          <tr>
            <td>{usu.nombre}</td>
            <td>{usu.apellido}</td>
            <td>{usu.email}</td>
            <td>{usu.Activo}</td>            
            <td><Button variant="light" style={{  backgroundColor: "#F7B1BD", borderColor: "#F7B1BD" }}/></td>
          </tr>
        </tbody>
        )}
      </Table>
</div>
    </div>
  );
}
/*
export default function UserList() {
    return (
<div>
<Table striped bordered hover variant="light" style={{ padding: 10 }}>

 <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>Activo</th>
          </tr>
        </thead>
 {usuarios.map((usu) => 
        <tbody key={usu.email}>
          <tr>
            <td>{usu.nombre}</td>
            <td>{usu.apellido}</td>
            <td>{usu.email}</td>
            <td>{usu.Activo}</td>            
            <td><Button variant="light" style={{  backgroundColor: "#F7B1BD", borderColor: "#F7B1BD" }} onClick={() => eliminarItem(prod.id)}>Eliminar Item</Button></td>
          </tr>
        </tbody>
        )}
      </Table>
</div>
    )

} 



*/
