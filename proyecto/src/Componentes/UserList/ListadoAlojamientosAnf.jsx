
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAdministrador from '../Navbar/NavBarAdministrador';

export default function ListadoAlojamientosAnf() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [alojamiento, setAlojamiento] = useState([]);
  const {userToken, userType,userId} = useUserContext();
  const [botonType, setBotonType ] = useState('sinActualizar');
  //const [val , setVal] = useState(true);
  const [val1 , setVal1] = useState(true);
  const [valC , setValC] = useState();
  const [valH , setValH] = useState('');
  

  useEffect(() => {
    

/* var idAnf =
{
id_Anf: userId
}
   axios.post("http://localhost:8080/alojamiento/listarAlojamientos", idAnf)
  .then(res => {
  const aloj = res.data;
    setAlojamiento(aloj);
    setIsLoading(false);
  }) */
  
  axios.post("http://localhost:8080/alojamiento/listarAlojamientos",{})
  .then(res => {
  const aloj = res.data;
    setAlojamiento(aloj);
    setIsLoading(false);
  }) 
  console.log("ENTRE AL TOKEN LISTADO" + userToken )
  console.log("GUARDE EL TIPO DE USUARIO LISTADO: " + userType )  
      
    
  },[])




  const Desactivar = (id) => {
      axios.post(`http://localhost:8080/usuario/desactivar/` + id, id )
                  
                  .then(res => {
                    alert("Usuario Desactivado")
                    console.log(res.data)
                    setBotonType("actualizado")
                  })
      }


      const Desbloquear = (id) => {
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


              
  

  const handleChange = (e) => {
    console.log(`Seleccionaste ${e.target.value}`);
    setVal1(e.target.value);
  }

  const handleChangeC = (e) => {
    console.log(`Seleccionaste ${e.target.value}`);
    setValC(e.target.value);
    
  }

  const handleChangeP = (e) => {
    console.log(`Seleccionaste ${e.target.value}`);
    setValH(e.target.value);
    
  }


return (
  botonType === "sinActualizar" ? 

  <>


  
 
<NavBarAdministrador/>

    {isLoading ? <h2>Cargando...</h2> : 
          <Table striped bordered hover variant="light" style={{ padding: 10 }}>

          <thead>
            <tr>
              <th>Descripción</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>País</th>
              <th>Calificación Global</th>
              <th>Estado</th>
              <th>Bloqueado/Desbloqueado</th>
              
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
  :
  <>
 <ListadoAlojamientosAnf/>
  </>
)
}
