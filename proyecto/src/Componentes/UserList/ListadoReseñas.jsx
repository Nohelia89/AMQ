
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";

import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";





export default function ListadoReseñas({id}) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [reseñas, setReseñas] = useState([]);
  const [val1 , setVal1] = useState('APROBADO');
  const [valC , setValC] = useState();
  const [valH , setValH] = useState('');
  const [idAloj, setIdAloj] = useState()


  const [botonType, setBotonType ] = useState('sinActualizar');

  
  useEffect(() => {
    
    
   

   axios.get("http://localhost:8080/alojamiento/resenasDeAlojamiento/"+id)
  .then(res => {
  const rese = res.data;
    setReseñas(res);
    setIsLoading(false);
  })

   
      
    
  },[],[botonType])

/* 

              const handleChange = (e) => {
                console.log(`Seleccionaste ${e.target.value}`);
                setVal1(e.target.value);
              }
            
              const handleChangeC = (e) => {
                console.log(`Seleccionaste ${e.target.value}`);
                setValC(e.target.value);
                
              }
            
              
            


      const Aprobar = (id) => {
        axios.get(`http://localhost:8080/usuario/aprobarAnfitrion/` + id)
                    
                    .then(res => {
                      alert("Usuario Aprobado")
                      setBotonType("aprobado")
                      console.log(res.data)
                    })
        }

      const Rechazar = (id) => {
        axios.get(`http://localhost:8080/usuario/rechazarAnfitrion/` + id)
                    
                    .then(res => {
                      alert("Usuario Rechazado")
                      setBotonType("rechazado")
                      console.log(res.data)
                    })
        }


return (
  botonType === "sinActualizar" ? 
  <>
  <NavBarAnfitrion/>
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
              <th>Calificacion</th>
              <th>Reseña</th>
            
              
            </tr>
          </thead>
          {reseña.map(anfitrion => <tbody key={anfitrion.id} >
            <tr>
            {anfitrion.tipo === "Ad" ? 
             <td>Administrador</td> : (anfitrion.tipo === "Hu" ? <td>Huesped</td>  : <td>Anfitrion</td> )            
            }
              <td>{anfitrion.nombre}</td>
              <td>{anfitrion.apellido}</td>
              <td>{anfitrion.email}</td>
              <td>{anfitrion.calificacionGlobal}</td>
             { anfitrion.estado === 'PENDIENTE' ?  
          <td><Button variant="success" onClick={() => Aprobar(anfitrion.id)}> Aprobar </Button></td>:
             <td>{anfitrion.estado}</td>
               
            } 
             { anfitrion.estado === 'PENDIENTE' ?  
               <td><Button variant="dark" onClick={() => Rechazar(anfitrion.id)}>Rechazar</Button></td>:
         
             <td>--- </td>
            }
              </tr>
         
          </tbody>)}
        </Table>
  
    }

  </>
  :
  <>
  <ListadoReseñas/>
  </>
) */
}
