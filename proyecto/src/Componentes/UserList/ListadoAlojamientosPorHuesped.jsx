
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import { Col, FloatingLabel, Row, Form, CardGroup } from "react-bootstrap";

import NavBarHuesped from '../Navbar/NavBarHuesped';
import AgregarCalificacionDeAnfitrion from '../Calificacion/AgregarCalificacionDeAnfitrion';
import ModificarCalificacionDeAnfitrion from '../Calificacion/ModificarCalificacionDeAnfitrion';



export default function ListadoAlojamientosPorHuesped() {

    const [isLoading, setIsLoading] = useState(true);
    const [alojamiento, setAlojamiento] = useState([]);
    const [idRes, setIdRes] = useState('');
    const [idCal, setIdCal] = useState('');
    const { userToken, userType, userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [val , setVal] = useState();
    const [val1 , setVal1] = useState(true);
    const [paises, setPaises] =  useState([])


    useEffect(() => {


        var enviar =
        {
            //id_Anf: userId
            idUsuario: 10053

        }
        axios.post("http://localhost:8080/reserva/listarDatosRequeridosCalificar", enviar)
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
              
            .catch(error => {
                alert("ERROR: " + error.response.data.mensaje);
              });
     
    }, [])

 


    
    const handleChange = (e) => {
     
        setVal(e.target.value);
      }

      const handleChange1= (e) => {
      
        setVal1(e.target.value);
        
      }
    
      const CalificarAnf = (id) => {

        setIdRes(id)
        
   
     
        setBotonType("calificar")
    }


    const EliminarCal = (id) => {
    
              var calificacion = {
        
                idUsuario: 10053,
                idReserva: id,
                calificacion: 0,
            
              } ;

                    axios.post("http://localhost:8080/reserva/calificar", calificacion )
                    
                    .then(res => {
                     alert("SE ELIMINO LA CALIFICACION CORRECTAMENTE")
                  })
                  .catch(error => {
                      alert("ERROR: " + error.response.data.mensaje);
                    });

              
            
        setBotonType("recargar")
                    
     
     
       
    }

    
    const ModificarCal = (id, cal) => {



     setIdRes(id)
      setIdCal(cal)
  
        setBotonType("modificar")
    }
          
    
    
    
    
    
    async function buscarConFiltro() {
      
    
              
              var aloj = {
              
                  aloj_activo: val1,
                  idPais: val,
                  idUsuario: 10053
                 
                
              }; 
            
          
                    await axios.post("http://localhost:8080/reserva/listarDatosRequeridosCalificar", aloj ) 
                 
                    .then(res => {
                  
                      setAlojamiento(res.data)
              
                
                    })
                    .catch(error => {
                      alert("ERROR: " + error.response.data.mensaje);
                    });
              
                    
                 
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
                                <th>Calificacion obtenida</th>
                                <th>Calificacion otorgada</th>
                                <th>Actividad</th>
                                <th>Calificacion</th>
                                <th>Eliminar Calificacion</th>
                            </tr>
                        </thead>
                        {alojamiento.map(alojamiento => <tbody key={alojamiento.res_id} >
                            <tr>

                                <td>{alojamiento.aloj_descripcion}</td>
                                <td>{alojamiento.aloj_dir_calle}{alojamiento.aloj_dir_numero}</td>
                                <td>{alojamiento.aloj_dir_ciudad}</td>
                                <td>{alojamiento.aloj_dir_pais_nombre}</td>
                                <td>{alojamiento.hu_calificacion}</td>
                                <td>{alojamiento.anf_calificacion}</td>
                                {alojamiento.aloj_activo	  ?      <td>DISPONIBLE</td>:      <td>NO DISPONIBLE</td>}
                                {alojamiento.hu_calificacion === 0	  ? 
                                <td><Button variant="dark" onClick={() => CalificarAnf(alojamiento.res_id)}>Calificar</Button></td>
                                :
                                <td><Button variant="dark" onClick={() => ModificarCal(alojamiento.res_id, alojamiento.anf_calificacion)}>Modificar</Button></td>}
                                
                             
                                <td><Button variant="dark" onClick={() => EliminarCal(alojamiento.res_id)}>X</Button></td>
                            </tr>

                        </tbody>)}
                    </Table>

                }

            </>
            : (botonType === "calificar" ) ? <AgregarCalificacionDeAnfitrion id={idRes}/>:
            (botonType === "modificar" ) ? <ModificarCalificacionDeAnfitrion id={idRes} cal={idCal}/>: 
             <ListadoAlojamientosPorHuesped/>
            
    )
}
