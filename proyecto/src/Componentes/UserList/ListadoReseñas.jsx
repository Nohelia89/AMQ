
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";

import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { useUserContext } from '../UserContext/userContext';
import Loading from '../Loading/Loading';





export default function ListadoReseñas({id}) {
  
  const [isLoading, setIsLoading] = useState(true);
  const [reseña, setReseña] = useState([]);
  const { userToken } = useUserContext();
  const [valP , setValP] = useState();
  const [idAloj, setIdAloj] = useState('')

  const [botonType, setBotonType ] = useState('sinActualizar');
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [sort, setSort] = useState('sinOrdenar');
  const [sort2, setSort2] = useState('sinOrdenar');


  useEffect(() => {
    setIdAloj(id)
  
    var datos =
    {
       
        idAloj: id
    }
   
console.log(idAloj)
   axios.post('http://localhost:8080/reserva/listarResenas', datos , {
    headers: {
      'Authorization': `${userToken}`
    }
  })
  .then(res => {
  const rese = res.data;
    setReseña(rese);
    setIsLoading(false);
  })
  .catch(error => {
    alert("ERROR: " + error.response.data.mensaje);
  });

   
      
    
}, [], [botonType])


  
  async function buscarConFiltro() {
  

            

    
      var datos =
      {
          
          idAloj: id,
          calHuesped: valP
      }
     
       
    
    
  

          const response =   await axios.post('http://localhost:8080/reserva/listarResenas',  datos , {
            headers: {
              'Authorization': `${userToken}`
            }
          })
          .then(res => {
                  
            setReseña(res.data)
    
      
          })
          .catch(error => {
            alert("ERROR: " + error.response.data.mensaje);
          });
    
       
      }

      const handleChange = (e) => {
      
       setValP(e.target.value);
      }
    
      const ordenarDescCal = () => {
        setSort2('sinOrdenar');
        setSort('sinOrdenar');
        var lista =  reseña.sort((a, b) => (a.calHuesp > b.calHuesp ? 1 : a.calHuesp < b.calHuesp ? -1 : 0))
        setList(lista);
        setSort('Ordenado');
        
      }
    
      const ordenarAscCal = () => {
        setSort('sinOrdenar');
        setSort2('sinOrdenar');
        var lista =  reseña.sort((a, b) => (a.calHuesp > b.calHuesp ? -1 : a.calHuesp < b.calHuesp ? 1 : 0))
        setList2(lista);
        setSort2('Ordenado');
        
      }
 


return (
  botonType === "sinActualizar" ? 
  <>
  <NavBarAnfitrion/>
  <div style={{marginLeft: "18%", width: "1000px", marginBottom: "40px" , padding:"15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px"}}>      
<Row className="g-3">

  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Calificacion Global">
      <Form.Select aria-label="Floating label select example" value={valP} onChange={handleChange}>
      
      <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </Form.Select>
    </FloatingLabel>
  </Col>
  
  <Col md style={{padding:"10px", paddingRight:"90px"}} >
  <button className = "boton" onClick={buscarConFiltro} >Buscar</button>
  </Col>

  
</Row>
</div>    
    {isLoading ? <Loading/> : 
             <Table striped bordered hover variant="light" style={{ marginLeft: "18%", width: "1000px",marginBottom: "40px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>

          <thead>
            <tr>
              <th>Calificacion Huesped <button onClick={ordenarAscCal}>↑</button> <button onClick={ordenarDescCal}>↓</button></th>
       
              <th>Fecha</th>
              <th>Reseña</th>
            </tr>
          </thead>
          { sort === 'sinOrdenar' || sort2 === 'sinOrdenar' ?
          reseña.map(reseña => <tbody key={reseña.id} >
            <tr>
        
              <td>{reseña.calHuesp}</td>
    
              <td>{reseña.fechaResena}</td>
              <td>{reseña.resena}</td>
          
           
              </tr>
         
          </tbody>) : (sort === 'Ordenado' ?
            list.map(reseña => <tbody key={reseña.id} >
              <tr>
          
                <td>{reseña.calHuesp}</td>
      
                <td>{reseña.fechaResena}</td>
                <td>{reseña.resena}</td>
            
             
                </tr>
           
            </tbody>) :
              list2.map(reseña => <tbody key={reseña.id} >
                <tr>
            
                  <td>{reseña.calHuesp}</td>
        
                  <td>{reseña.fechaResena}</td>
                  <td>{reseña.resena}</td>
              
               
                  </tr>
             
              </tbody>))
          }
        </Table>
  
    }

  </>
  :
  <>
  <ListadoReseñas/>
  </>
) 
}
