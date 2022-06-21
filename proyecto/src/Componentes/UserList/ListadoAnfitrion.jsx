
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";

import NavBarAdministrador from '../Navbar/NavBarAdministrador';
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
export default function ListadoAnfitrion() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [anfitrion, setAnfitrion] = useState([]);
  const [val1 , setVal1] = useState('APROBADO');
  const [valC , setValC] = useState();
  const [valH , setValH] = useState('');
  const [calDesde , setCalDesde] = useState();
  const [calHasta , setCalHasta] = useState();

  const [botonType, setBotonType ] = useState('sinActualizar');

  
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

   
      
    
  },[],[botonType])

  useEffect(() => {
    setCalDesde("0")
    setCalHasta("2")
        if (valC === "1"){
          console.log("entre al if 1" )
          setCalDesde("0")
          setCalHasta("2")
        } else if (valC === "2"){
          console.log("entre al if 2" )
          setCalDesde("2")
          setCalHasta("3")
        } else if (valC === "3") {
          setCalDesde("4")
          setCalHasta("5")
        } 
          
       
        
      
    }, [valC] )
  async function buscarConFiltro() {
  

            
            var usuario = {
            
                estado: val1,
                tipo: valH,
                calificacion_desde: calDesde,
                calificacion_hasta: calHasta
               
              
            }; 
          
        
                  const response =   await axios.post(`http://localhost:8080/usuario/listar`, usuario ) 
                //  console.log(response.data);
                setAnfitrion(response.data)
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
  <NavBarAdministrador/>
  <div style={{marginLeft: "18%", width: "1000px" , padding:"15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px"}}>      
<Row className="g-3">

  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Calificacion Global">
      <Form.Select aria-label="Floating label select example" value={valC} onChange={handleChangeC}>
      
      <option value="1">Menor que 2</option>
        <option value="2">Entre 2 y 3</option>
        <option value="3">Entre 4 y 5</option>

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
  <ListadoAnfitrion/>
  </>
)
}
