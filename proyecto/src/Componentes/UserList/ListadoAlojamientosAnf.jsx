
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import AgregarHabitacion from '../Alojamiento/AgregarHabitacion';

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
            id_anf: 10038
        }
        axios.post("http://localhost:8080/alojamiento/listarAlojamientos", idAnf)
            .then(res => {
                const aloj = res.data;
                setAlojamiento(aloj);
         
                setIsLoading(false);
            })

        /*  axios.post("http://localhost:8080/alojamiento/listarAlojamientos",{})
         .then(res => {
         const aloj = res.data;
           setAlojamiento(aloj);
           setIsLoading(false);
         }) 
         console.log("ENTRE AL TOKEN LISTADO" + userToken )
         console.log("GUARDE EL TIPO DE USUARIO LISTADO: " + userType )  
             */

    }, [])




    const AgregarHab = (id) => {
     
    
       setIdAloj(id)
       console.log(idAloj+"soy idAloj")
        
       setBotonType("habitacion")
    }


    const ModificarAloj = (id) => {
        axios.post(`http://localhost:8080/usuario/desbloquear/` + id, id)

            .then(res => {
                alert("Usuario Desbloqueado")
                setBotonType("actualizado")
                console.log(res.data)
            })
    }

    const Bloquear = (id) => {
        axios.post(`http://localhost:8080/usuario/bloquear/` + id, id)

            .then(res => {
                alert("Usuario Bloqueado")
                setBotonType("actualizado")
                console.log(res.data)
            })
    }





    /*         async function buscarConFiltro() {
      
    
              
              var usuario = {
              
                  activo: val1,
                  tipo: valH
                 
                
              }; 
            
          
                    const response =   await axios.post(`http://localhost:8080/usuario/listar`, usuario ) 
                  //  console.log(response.data);
                  setUsuario(response.data)
                 // setBotonType('concards')
                    return response.data;
                 
                    
                 
                } */







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
                                <th>Habitaciones</th>
                                <th>Reseñas</th>
                                <th>Baja</th>

                            </tr>
                        </thead>
                        {alojamiento.map(alojamiento => <tbody key={alojamiento.id} >
                            <tr>

                                <td>{alojamiento.descripcion}</td>
                                
                                <td>{alojamiento.direcion.calle}{alojamiento.direcion.numero}</td>
                                <td>{alojamiento.direcion.ciudad}</td>
                                <td>{alojamiento.direcion.pais.nombre}</td>
                                <td><Button variant="danger" onClick={() => ModificarAloj(alojamiento.id)}>Modificar</Button></td> 
                                <td><Button variant="danger" onClick={() => AgregarHab(alojamiento.id)}>Agregar</Button></td> 

                            </tr>

                        </tbody>)}
                    </Table>

                }

            </>
            :    (botonType === "habitacion" ) ? 
               <AgregarHabitacion id={idAloj}/>:     <ListadoAlojamientosAnf/>  
            
    )
}
