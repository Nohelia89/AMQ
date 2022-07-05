
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAdministrador from '../Navbar/NavBarAdministrador';

import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
export default function UserList() {

  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const { userToken, userType } = useUserContext();
  const [botonType, setBotonType] = useState('sinActualizar');

  const [val1, setVal1] = useState(true);
  const [valC, setValC] = useState();
  const [valH, setValH] = useState('Ad');

  const [calDesde, setCalDesde] = useState();
  const [calHasta, setCalHasta] = useState();




  useEffect(() => {

    axios.post("http://localhost:8080/usuario/listar",  {}, {
      headers: {
        'Authorization': `${userToken}`
      }
    })
      .then(res => {
        const usuario = res.data;
        setUsuario(usuario);
        setIsLoading(false);
      })





  }, [])

  useEffect(() => {

    setCalDesde("0")
    setCalHasta("2")
    if (valC === "1") {
      console.log("entre al if 1")
      setCalDesde("0")
      setCalHasta("2")
    } else if (valC === "2") {
      console.log("entre al if 2")
      setCalDesde("2")
      setCalHasta("3")
    } else if (valC === "3") {
      setCalDesde("4")
      setCalHasta("5")
    }



  }, [valC])



  const Desactivar = (id) => {
    axios.post(`http://localhost:8080/usuario/desactivar/` + id, { id }, {
      headers: {
        'Authorization': `${userToken}`
      }
    })

      .then(res => {
        alert("Usuario Desactivado")

        setBotonType("actualizado")
      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });
  }


  const Desbloquear = (id) => {
    axios.post(`http://localhost:8080/usuario/desbloquear/` + id, { id }, {
      headers: {
        'Authorization': `${userToken}`
      }
    })

      .then(res => {
        alert("Usuario Desbloqueado")
        setBotonType("actualizado")

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

  }

  const Bloquear = (id) => {
    axios.post(`http://localhost:8080/usuario/bloquear/` + id,  { id }, {
      headers: {
        'Authorization': `${userToken}`
      }
    })

      .then(res => {
        alert("Usuario Bloqueado")
        setBotonType("actualizado")

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

  }





  async function buscarConFiltro() {



    var usuario = {

      activo: val1,
      tipo: valH,
      calificacion_desde: calDesde,
      calificacion_hasta: calHasta


    };

    console.log(valH)

    await axios.post(`http://localhost:8080/usuario/listar`,  { usuario }, {
      headers: {
        'Authorization': `${userToken}`
      }
    })



      .then(response => {
        setUsuario(response.data)

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

  }





  const handleChange = (e) => {

    setVal1(e.target.value);
  }

  const handleChangeC = (e) => {
 
    setValC(e.target.value);

  }

  const handleChangeP = (e) => {
  
    setValH(e.target.value);

  }


  return (
    botonType === "sinActualizar" ?

      <>

        <NavBarAdministrador />
        <div style={{ marginLeft: "18%", width: "1000px",marginBottom: "40px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>
          <Row className="g-3">

            <Col md style={{ padding: "10px" }} >
              <FloatingLabel controlId="floatingSelectGrid" label="Calificacion Global">
                <Form.Select aria-label="Floating label select example" value={valC} onChange={handleChangeC}>

                  <option value="1">Menor que 2</option>
                  <option value="2">Entre 2 y 3</option>
                  <option value="3">Entre 4 y 5</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md style={{ padding: "10px" }} >
              <FloatingLabel controlId="floatingSelectGrid" label="Estado">
                <Form.Select aria-label="Floating label select example" value={val1} onChange={handleChange}>

                  <option value="true">Activo</option>
                  <option value="false">No Activo</option>



                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md style={{ padding: "10px" }} >
              <FloatingLabel controlId="floatingSelectGrid" label="Tipo de Usuario">
                <Form.Select aria-label="Floating label select example" value={valH} onChange={handleChangeP}>
                  <option value="Ad">Administrador</option>
                  <option value="An">Anfitrion</option>
                  <option value="Hu">Huesped</option>

                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md style={{ padding: "10px", paddingRight: "90px" }} >
              <button className="boton" onClick={buscarConFiltro} >Buscar</button>
            </Col>

          </Row>
        </div>

        {isLoading ? <h2>Cargando...</h2> :

          <Table striped bordered hover variant="light" style={{ marginLeft: "18%", width: "1000px",marginBottom: "40px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>

            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Mail</th>
                <th>Calificación Global</th>
                <th>Estado</th>
                <th>Bloqueado/Desbloqueado</th>

              </tr>
            </thead>
            {usuario.map(usuario => <tbody key={usuario.id} >
              <tr>
                {usuario.tipo === "Ad" ?
                  <td>Administrador</td> : (usuario.tipo === "Hu" ? <td>Huesped</td> : <td>Anfitrion</td>)
                }
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.calificacion}</td>
                {usuario.tipo !== "Ad" ? (usuario.activo === true ?
                  <td><Button variant="light" onClick={() => Desactivar(usuario.id)}>Desactivar</Button></td> : <td>Desactivado</td>) : <td>Activo</td>
                }
                {usuario.tipo !== "Ad" ? (usuario.bloqueado === true ?
                  <td><Button variant="light" onClick={() => Desbloquear(usuario.id)}> Desbloquear </Button></td> : <td><Button variant="dark" onClick={() => Bloquear(usuario.id)}>Bloquear</Button></td>) : <td>Desbloqueado</td>
                }

              </tr>

            </tbody>)}
          </Table>

        }

      </>
      :
      <>
        <UserList />
      </>
  )
}
