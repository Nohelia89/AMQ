
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";

import NavBarAdministrador from '../Navbar/NavBarAdministrador';
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
export default function ListadoHuesped() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [huesped, setHuesped] = useState([]);
  const [val1 , setVal1] = useState('APROBADO');
  const [valC , setValC] = useState();
  const [valH , setValH] = useState('');

  const [botonType, setBotonType ] = useState('sinActualizar');

  
  useEffect(() => {
    

    var huespedes = {

      tipo:'Hu'
      
    } ;




   axios.post("http://localhost:8080/usuario/listar", huespedes)
  .then(res => {
  const huespedes = res.data;
    setHuesped(huespedes);
    setIsLoading(false);
  })

   
      
    
  },[],[botonType])


  async function buscarConFiltro() {
  

            
            var usuario = {
            
                estado: val1,
                tipo: valH
               
              
            }; 
          
        
                  const response =   await axios.post(`http://localhost:8080/usuario/listar`, usuario ) 
                //  console.log(response.data);
                setHuesped(response.data)
               // setBotonType('concards')
                  return response.data;
               
                  
               
              }

              const handleChange = (e) => {
                console.log(`Seleccionaste ${e.target.value}`);
                setVal1(e.target.value);
              }
            
              const handleChangeC = (e) => {
                console.log(`Seleccionaste ${e.target.value}`);
                setValC(e.target.value);
                
              }
            
          
            


   


return (
  botonType === "sinActualizar" ? 
  <>
  <NavBarAdministrador/>
  <div style={{marginLeft: "18%", width: "1000px" , padding:"15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px"}}>      
<Row className="g-3">

  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Calificacion Global">
      <Form.Select aria-label="Floating label select example" value={valC} onChange={handleChangeC}>
      
        <option value="6">1</option>
        <option value="7">2</option>
        <option value="8">3</option>
        <option value="9">4</option>
        <option value="10">5</option>
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Estado">
      <Form.Select aria-label="Floating label select example" value={val1} onChange={handleChange}>
      
      <option value="APROBADO">Aprobado</option>
        <option value="RECHAZADO">Rechazado</option>
      
    
        
      </Form.Select>
    </FloatingLabel>
  </Col>
 
  <Col md style={{padding:"10px", paddingRight:"90px"}} >
  <button className = "boton" onClick={buscarConFiltro} >Buscar</button>
  </Col>
  
</Row>
</div>    
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
    
              
            </tr>
          </thead>
          {huesped.map(huesped => <tbody key={huesped.id} >
            <tr>
            {huesped.tipo === "Ad" ? 
             <td>Administrador</td> : (huesped.tipo === "Hu" ? <td>Huesped</td>  : <td>Anfitrion</td> )            
            }
              <td>{huesped.nombre}</td>
              <td>{huesped.apellido}</td>
              <td>{huesped.email}</td>
              <td>{huesped.calificacionGlobal}</td>
              <td>{huesped.estado}</td>
             
              </tr>
         
          </tbody>)}
        </Table>
  
    }

  </>
  :
  <>
  <ListadoHuesped/>
  </>
)
}