
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import AgregarHabitacion from '../Alojamiento/AgregarHabitacion';
import ListadoReseñas from './ListadoReseñas';
import ModificarAlojamiento from '../Modificar/ModificarAlojamiento';


export default function ListadoAlojamientosAnf() {

    const [isLoading, setIsLoading] = useState(true);
    const [alojamiento, setAlojamiento] = useState([]);
    const [idAloj, setIdAloj] = useState();
    const { userToken, userType, userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
  


    useEffect(() => {


        var idAnf =
        {
            //id_Anf: userId
            id_anf: 10041
        }
        axios.post("http://localhost:8080/alojamiento/listarAlojamientos", idAnf)
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
        axios.post(`http://localhost:8080/alojamiento/desactivarAlojamiento/` + id , {})

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



{console.log(botonType+"SOY BOTONTYPE")}
                <NavBarAnfitrion />

                {isLoading ? <h2>Cargando...</h2> :
                    <Table striped bordered hover variant="light" style={{ padding: 10 }}>

                        <thead>
                            <tr>
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

                                <td>{alojamiento.descripcion}</td>
                                
                                <td>{alojamiento.direcion.calle}{alojamiento.direcion.numero}</td>
                                <td>{alojamiento.direcion.ciudad}</td>
                                <td>{alojamiento.direcion.pais.nombre}</td>
                                { alojamiento.activo === true ? 
                                <td><Button variant="danger" onClick={() => ModificarAloj(alojamiento.id)}>Modificar</Button></td> : <td>Modificar</td>  } 
                                  { alojamiento.activo === true ? 
                                <td><Button variant="danger" onClick={() => VerReseñas(alojamiento.id)}>Reseñas</Button></td> : <td>Reseñas</td>  }
                                 { alojamiento.activo === true ? 
                                <td><Button variant="danger" onClick={() => AgregarHab(alojamiento.id)}>Agregar</Button></td> : <td>Agregar</td>  }

                                { alojamiento.activo === true ? 
                             <td><Button variant="danger" onClick={() => DesactivarAloj(alojamiento.id)}> X </Button></td> : <td>Desactivado</td>   
                                     } 
                               
                            </tr>

                        </tbody>)}
                    </Table>

                }

            </>
            :    (botonType === "habitacion" ) ? 
               <AgregarHabitacion id={idAloj}/>:  (botonType === "reseñas" ) ? <ListadoReseñas id={idAloj}/>:   (botonType === "modificar" ) ?<ModificarAlojamiento id={idAloj}/> :<ListadoAlojamientosAnf/>  
            
    )
}
