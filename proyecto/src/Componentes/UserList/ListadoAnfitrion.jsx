
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";

import NavBarAdministrador from '../Navbar/NavBarAdministrador';
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { useUserContext } from '../UserContext/userContext';
import Loading from '../Loading/Loading';
export default function ListadoAnfitrion() {

  const [isLoading, setIsLoading] = useState(true);
  const [anfitrion, setAnfitrion] = useState([]);
  const [val1, setVal1] = useState('APROBADO');
  const [valC, setValC] = useState();
  const [calDesde, setCalDesde] = useState();
  const [calHasta, setCalHasta] = useState();
  const { userToken } = useUserContext();
  const [botonType, setBotonType] = useState('sinActualizar');
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [sort, setSort] = useState('sinOrdenar');
  const [sort2, setSort2] = useState('sinOrdenar');


  useEffect(() => {


    var anfitriones = {

      tipo: 'An'

    };


    axios.post("http://localhost:8080/usuario/listar",  anfitriones , {
      headers: {
        'Authorization': `${userToken}`
      }
    })
      .then(res => {
        const anfitriones = res.data;
        setAnfitrion(anfitriones);
        setIsLoading(false);
      })




  }, [], [botonType])

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
  async function buscarConFiltro() {


 
  

    var usuario = {

      estado: val1,

      calificacion_desde: calDesde,
      calificacion_hasta: calHasta


    };


    const response = await axios.post(`http://localhost:8080/usuario/listar`,   usuario , {
      headers: {
        'Authorization': `${userToken}`
      }
    })
      
      .then(response => {
        setAnfitrion(response.data)

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



  const ordenarDescTipo = () => {
    setSort2('sinOrdenar');
    setSort('sinOrdenar');
    var lista =  anfitrion.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0))
    setList(lista);
    setSort('Ordenado');
    
  }

  const ordenarAscTipo = () => {
    setSort('sinOrdenar');
    setSort2('sinOrdenar');
    var lista =  anfitrion.sort((a, b) => (a.nombre > b.nombre ? -1 : a.nombre < b.nombre ? 1 : 0))
    setList2(lista);
    setSort2('Ordenado');
    
  }

  const ordenarDescCal = () => {
    setSort2('sinOrdenar');
    setSort('sinOrdenar');
    var lista =  anfitrion.sort((a, b) => (a.calificacionGlobal > b.calificacionGlobal ? 1 : a.calificacionGlobal < b.calificacionGlobal ? -1 : 0))
    setList(lista);
    setSort('Ordenado');
    
  }

  const ordenarAscCal = () => {
    setSort('sinOrdenar');
    setSort2('sinOrdenar');
    var lista =  anfitrion.sort((a, b) => (a.calificacionGlobal > b.calificacionGlobal ? -1 : a.calificacionGlobal < b.calificacionGlobal ? 1 : 0))
    setList2(lista);
    setSort2('Ordenado');
    
  }

  const Aprobar = (id) => {
    axios.get(`http://localhost:8080/usuario/aprobarAnfitrion/` + id, {
      headers: {
        'Authorization': `${userToken}`
      }
    })


      .then(res => {
        alert("Usuario Aprobado")
        setBotonType("aprobado")

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });
  }

  const Rechazar = (id) => {
    axios.get(`http://localhost:8080/usuario/rechazarAnfitrion/` + id, {
      headers: {
        'Authorization': `${userToken}`
      }
    })


      .then(res => {
        alert("Usuario Rechazado")
        setBotonType("rechazado")

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });
  }


  return (
    botonType === "sinActualizar" ?
      <>
        <NavBarAdministrador />
        <div style={{ marginLeft: "18%", width: "1000px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px",  marginBottom: "40px"}}>
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

                  <option value="APROBADO">Aprobado</option>
                  <option value="RECHAZADO">Rechazado</option>



                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md style={{ padding: "10px", paddingRight: "90px" }} >
              <button className="boton" onClick={buscarConFiltro} >Buscar</button>
            </Col>

          </Row>
        </div>
        {isLoading ? <Loading/> :
          <Table striped bordered hover variant="light" style={{ marginLeft: "18%", width: "1000px",marginBottom: "40px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>

            <thead>
              <tr>

                <th>Nombre <button onClick={ordenarAscTipo}>↑</button> <button onClick={ordenarDescTipo}>↓</button></th>
                <th>Apellido</th>
                <th>Mail</th>
                <th>Calificación <button onClick={ordenarAscCal}>↑</button> <button onClick={ordenarDescCal}>↓</button></th>
                <th>Estado</th>
                <th>Rechazar</th>

              </tr>
            </thead>
            { sort === 'sinOrdenar' || sort2 === 'sinOrdenar' ?
            anfitrion.map(anfitrion => <tbody key={anfitrion.id} >
              <tr>

                <td>{anfitrion.nombre}</td>
                <td>{anfitrion.apellido}</td>
                <td>{anfitrion.email}</td>
                { anfitrion.calificacionGlobal ===0 ||anfitrion.calificacionGlobal ===-1 ?     <td>---</td>:<td>{anfitrion.calificacionGlobal } </td>}
                {anfitrion.estado === 'PENDIENTE' ?
                  <td><button class="calificar" onClick={() => Aprobar(anfitrion.id)}> Aprobar </button></td> :
                  <td>APROBADO</td>

                }
                {anfitrion.estado === 'PENDIENTE' ?
                  <td><button class="modificar" onClick={() => Rechazar(anfitrion.id)}>Rechazar</button></td> :

                  <td>--- </td>
                }
              </tr>

            </tbody>): (sort === 'Ordenado' ? 
             list.map(anfitrion => <tbody key={anfitrion.id} >
              <tr>

                <td>{anfitrion.nombre}</td>
                <td>{anfitrion.apellido}</td>
                <td>{anfitrion.email}</td>
                <td>{anfitrion.calificacionGlobal}</td>
                {anfitrion.estado === 'PENDIENTE' ?
                  <td><button class="calificar" onClick={() => Aprobar(anfitrion.id)}> Aprobar </button></td> :
                  <td>APROBADO</td>

                }
                {anfitrion.estado === 'PENDIENTE' ?
                  <td><button class="modificar" onClick={() => Rechazar(anfitrion.id)}>Rechazar</button></td> :

                  <td>--- </td>
                }
              </tr>

            </tbody>):   list2.map(anfitrion => <tbody key={anfitrion.id} >
              <tr>

                <td>{anfitrion.nombre}</td>
                <td>{anfitrion.apellido}</td>
                <td>{anfitrion.email}</td>
                <td>{anfitrion.calificacionGlobal}</td>
                {anfitrion.estado === 'PENDIENTE' ?
                  <td><button class="calificar" onClick={() => Aprobar(anfitrion.id)}> Aprobar </button></td> :
                  <td>APROBADO</td>

                }
                {anfitrion.estado === 'PENDIENTE' ?
                  <td><button class="modificar" onClick={() => Rechazar(anfitrion.id)}>Rechazar</button></td> :

                  <td>--- </td>
                }
              </tr>

            </tbody>))}
          </Table>

        }

      </>
      :
      <>
        <ListadoAnfitrion />
      </>
  )
}
