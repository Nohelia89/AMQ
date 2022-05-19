import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'



export default function UserList() {
    return (
<div>
<Table striped bordered hover variant="light" style={{ padding: 10 }}>

<thead>
  <tr>
    <th>Cantidad</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Eliminar</th>
  </tr>
</thead>
<tbody  >
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>     <Button variant="dark" >X</Button></td>
  </tr>

</tbody>




  <tbody >

    <td><h6>Total de su compra:</h6></td>
    <td>US$ PRECIO</td>



  </tbody>
 
</Table>
</div>
    )

} 




