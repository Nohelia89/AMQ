
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAdministrador from '../Navbar/NavBarAdministrador';

import { Col, FloatingLabel, Row, Form, CardGroup } from "react-bootstrap";
export default function UserList() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const {userToken, userType} = useUserContext();
  const [botonType, setBotonType ] = useState('sinActualizar');
  const [val , setVal] = useState();
  const [valC , setValC] = useState();
  const [valH , setValH] = useState('');
  const [valorPais , setValor] = useState([]);

  useEffect(() => {
    
   axios.post("http://localhost:8080/usuario/listar", {})
  .then(res => {
  const usuario = res.data;
    setUsuario(usuario);
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





        async function buscarConFiltro() {
  

  
          
          var usuario = {
          
              aloj_idPais: val,
              tipo: valH
             
            
          }; 
        
      
                const response =   await axios.post(`http://localhost:8080/usuario/listar`, usuario ) 
              //  console.log(response.data);
              setUsuario(response.data)
             // setBotonType('concards')
                return response.data;
             
                
             
            }


              
  
  useEffect(() => {
    
 

    axios.get(`http://localhost:8080/alojamiento/getPaises`) 
    .then(res => {
    let paises = res.data;
      setValor(paises);
    })


      
    
  },[])


  const handleChange = (e) => {
    console.log(`Seleccionaste ${e.target.value}`);
    setVal(e.target.value);
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
  <FloatingLabel controlId="floatingSelectGrid" label="País">
      <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>
      
   
        {valorPais.map((option) => {
            return (<option key={option.id} value={option.id}>{option.valor}</option>);
        })}
 
    
        
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Tipo de Usuario">
      <Form.Select aria-label="Floating label select example" value={valH} onChange={handleChangeP}> 
        <option value="Ad">Administrador</option>
        <option value="An">Anfitrion</option>
        <option value="Hu">Huesped</option>
       
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
              <th>Calificación Global</th>
              <th>Activo/Desactivo</th>
              <th>Bloqueado/Desbloqueado</th>
              
            </tr>
          </thead>
          {usuario.map(usuario => <tbody key={usuario.id} >
            <tr>
            {usuario.tipo === "Ad" ? 
             <td>Administrador</td> : (usuario.tipo === "Hu" ? <td>Huesped</td>  : <td>Anfitrion</td> )            
            }
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.calificacionGlobal}</td>
              { usuario.tipo !== "Ad" ? (usuario.activo === true ? 
              <td><Button variant="danger" onClick={() => Desactivar(usuario.id)}>Desactivar</Button></td> : <td><Button variant="success" >Activar</Button></td>) : <td>Activo</td>  
            }
             { usuario.tipo !== "Ad" ? (usuario.bloqueado === true ? 
              <td><Button variant="success" onClick={() => Desbloquear(usuario.id)}> Desbloquear </Button></td> : <td><Button variant="dark" onClick={() => Bloquear(usuario.id)}>Bloquear</Button></td>) : <td>Desbloqueado</td>   
            } 
            
              </tr>
         
          </tbody>)}
        </Table>
  
    }

  </>
  :
  <>
 <UserList/>
  </>
)
}
