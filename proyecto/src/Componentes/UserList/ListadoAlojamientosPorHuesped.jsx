
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import { Col, FloatingLabel, Row, Form, CardGroup } from "react-bootstrap";

import NavBarHuesped from '../Navbar/NavBarHuesped';


export default function ListadoAlojamientosPorHuesped() {

    const [isLoading, setIsLoading] = useState(true);
    const [alojamiento, setAlojamiento] = useState([]);

    const { userToken, userType, userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [val , setVal] = useState();
    const [val1 , setVal1] = useState(true);
    const [paises, setPaises] =  useState([])


    useEffect(() => {


        var enviar =
        {
            //id_Anf: userId
            idHuespedSeQuedoEnAloj: 10053

        }
        axios.post("http://localhost:8080/alojamiento/listarAlojamientos", enviar)
            .then(res => {
                const aloj = res.data;
                setAlojamiento(aloj);
         
                setIsLoading(false);
            })

            axios.get(`http://localhost:8080/alojamiento/getPaises`, {
                headers: {
                  'Authorization': `token ${userToken}`
                }
              })
              .then(res => {
              let paises = res.data;
                setPaises(paises);
              })
     
    }, [])

 


    
    const handleChange = (e) => {
        console.log(`Seleccionaste ${e.target.value}`);
        setVal(e.target.value);
      }

      const handleChange1= (e) => {
        console.log(`Seleccionaste ${e.target.value}`);
        setVal1(e.target.value);
        
      }
    


            async function buscarConFiltro() {
      
    
              
              var aloj = {
              
                  aloj_activo: val1,
                  aloj_idPais: val,
                  idHuespedSeQuedoEnAloj: 10053
                 
                
              }; 
            
          
                    const response =   await axios.post("http://localhost:8080/alojamiento/listarAlojamientos", aloj ) 
                  //  console.log(response.data);
                  setAlojamiento(response.data)
                 // setBotonType('concards')
                // setBotonType("sinactualizar")
                    return response.data;
                 
                    
                 
                } 







    return (

        botonType === "sinActualizar" ?

    
            <>
               <NavBarHuesped />

    <div style={{marginLeft: "18%", width: "1000px" , padding:"15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px"}}>      
<Row className="g-3">

 
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="País">
      <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>
      
   
        {paises.map((option) => {
            return (<option key={option.id} value={option.id}>{option.valor}</option>);
        })}
 
    
        
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Tipo de Usuario">
      <Form.Select aria-label="Floating label select example" value={val1} onChange={handleChange1}> 
        <option value="true">Disponible</option>
        <option value="false">No disponible</option>
   
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px", paddingRight:"90px"}} >
  <button className = "boton" onClick={buscarConFiltro} >Buscar</button>
  </Col>
  
</Row>
</div>      


{console.log(botonType+"SOY BOTONTYPE")}
             
                {isLoading ? <h2>Cargando...</h2> :
                    <Table striped bordered hover variant="light" style={{ padding: 10 }}>

                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Dirección</th>
                                <th>Ciudad</th>
                                <th>País</th>
                               

                            </tr>
                        </thead>
                        {alojamiento.map(alojamiento => <tbody key={alojamiento.id} >
                            <tr>

                                <td>{alojamiento.descripcion}</td>
                                
                                <td>{alojamiento.direcion.calle}{alojamiento.direcion.numero}</td>
                                <td>{alojamiento.direcion.ciudad}</td>
                                <td>{alojamiento.direcion.pais.nombre}</td>
                             
                            </tr>

                        </tbody>)}
                    </Table>

                }

            </>
            :   <ListadoAlojamientosPorHuesped/>
            
    )
}
