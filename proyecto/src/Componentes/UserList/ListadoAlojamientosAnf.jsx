
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import AgregarHabitacion from '../Alojamiento/AgregarHabitacion';
import ListadoReseñas from './ListadoReseñas';
import ModificarAlojamiento from '../Modificar/ModificarAlojamiento';
import Loading from '../Loading/Loading';


export default function ListadoAlojamientosAnf() {

    const [isLoading, setIsLoading] = useState(true);
    const [alojamiento, setAlojamiento] = useState([]);
    const [idAloj, setIdAloj] = useState();
    const { userToken,  userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
  


    useEffect(() => {


        var idAnf =
        {
            
            id_anf: userId
        }
        axios.post("http://localhost:8080/alojamiento/listarAlojamientos",  idAnf , {
            headers: {
              'Authorization': `${userToken}`
            }
          })
            .then(res => {
                const aloj = res.data;
                setAlojamiento(aloj);
         
                setIsLoading(false);
            })
            .catch(error => {
                alert("ERROR: " + error.response.data.mensaje);
              });

     
    }, [])




    const AgregarHab = (id) => {
     

       setIdAloj(id)
  
    
       setBotonType("habitacion")
       
    }


    
    const VerReseñas = (id) => {
     
    
        setIdAloj(id)
  
         
        setBotonType("reseñas")
     }
 
 

    const ModificarAloj = (id) => {

        setIdAloj(id)
     
        setBotonType("modificar")
    }

    const DesactivarAloj = (id) => {
        axios.post(`http://localhost:8080/alojamiento/desactivarAlojamiento/` + id , {
            headers: {
              'Authorization': `${userToken}`
            }
          })

            .then(res => {
                alert("Usuario Desactivado")
          
                setBotonType("desactivado")
            })
            .catch(error => {
                alert("ERROR: " + error.response.data.mensaje);
              });

    }












    return (

        botonType === "sinActualizar" ?

    
            <>




                <NavBarAnfitrion />

                {isLoading ? <Loading/> :
                <div style={{ marginLeft: "18%", width: "1000px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px",  marginBottom: "40px"}}>
                    <Table striped bordered hover variant="light" style={{ padding: 10 }}>

                        <thead>
                            <tr>
                            <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Dirección</th>
                                <th>Ciudad</th>
                                <th>País</th>
                                <th>Modificar</th>
                                <th>Reseñas</th>
                                <th>Habitaciones</th>
                                <th>Baja</th>

                            </tr>
                        </thead>
                        {alojamiento.map(alojamiento => <tbody key={alojamiento.id} >
                            <tr>
                            <td>{alojamiento.nombre}</td>
                                <td>{alojamiento.descripcion}</td>
                                
                                <td>{alojamiento.direcion.calle}{alojamiento.direcion.numero}</td>
                                <td>{alojamiento.direcion.ciudad}</td>
                                <td>{alojamiento.direcion.pais.nombre}</td>
                                { alojamiento.activo === true && alojamiento.activo===true? 
                                <td><button class="modificar" onClick={() => ModificarAloj(alojamiento.id)}>Modificar</button></td> : <td>---</td>  } 
                                  { alojamiento.activo === true ? 
                                <td><button class="calificar" onClick={() => VerReseñas(alojamiento.id)}>Reseñas</button></td> : <td>Reseñas</td>  }
                                 { alojamiento.activo === true && alojamiento.activo===true? 
                                <td><button class="calificar" onClick={() => AgregarHab(alojamiento.id)}>Agregar</button></td> : <td>---</td>  }

                                { alojamiento.activo === true ? 
                             <td><button class="eliminar" onClick={() => DesactivarAloj(alojamiento.id)}> X </button></td> : <td>Desactivado</td>   
                                     } 
                               
                            </tr>

                        </tbody>)}
                    </Table>

                    </div> }

            </>
            :    (botonType === "habitacion" ) ? 
               <AgregarHabitacion id={idAloj}/>:  (botonType === "reseñas" ) ? <ListadoReseñas id={idAloj}/>:   (botonType === "modificar" ) ?<ModificarAlojamiento id={idAloj}/> :<ListadoAlojamientosAnf/>  
            
    )
}
