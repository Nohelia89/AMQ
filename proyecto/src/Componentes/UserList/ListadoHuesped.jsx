
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import { useEffect, useState } from "react";

import NavBarAdministrador from '../Navbar/NavBarAdministrador';
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
export default function ListadoHuesped() {

  const [isLoading, setIsLoading] = useState(true);
  const [huesped, setHuesped] = useState([]);
  const [val1, setVal1] = useState(true);
  const [valC, setValC] = useState();

  const [calDesde, setCalDesde] = useState();
  const [calHasta, setCalHasta] = useState();


  const [botonType, setBotonType] = useState('sinActualizar');


  useEffect(() => {


    var huespedes = {

      tipo: 'Hu'

    };




    axios.post("http://localhost:8080/usuario/listar", huespedes)
      .then(res => {
        const huespedes = res.data;
        setHuesped(huespedes);
        setIsLoading(false);

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });



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

      activo: val1,
      calificacion_desde: calDesde,
      calificacion_hasta: calHasta


    };


    await axios.post(`http://localhost:8080/usuario/listar`, usuario)
   

      .then(response => {
        setHuesped(response.data)

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








  return (
    botonType === "sinActualizar" ?
      <>
        <NavBarAdministrador />
        <div style={{ marginLeft: "18%", width: "1000px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>
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

            <Col md style={{ padding: "10px", paddingRight: "90px" }} >
              <button className="boton" onClick={buscarConFiltro} >Buscar</button>
            </Col>

          </Row>
        </div>
        {isLoading ? <h2>Cargando...</h2> :
          <Table striped bordered hover variant="light" style={{ padding: 10 }}>

            <thead>
              <tr>

                <th>Nombre</th>
                <th>Apellido</th>
                <th>Mail</th>
                <th>Calificación</th>
                <th>Activo</th>


              </tr>
            </thead>
            {huesped.map(huesped => <tbody key={huesped.id} >
              <tr>

                <td>{huesped.nombre}</td>
                <td>{huesped.apellido}</td>
                <td>{huesped.email}</td>
                <td>{huesped.calificacionGlobal}</td>
                {huesped.activo === true ?
                  <td>Activo</td> : <td>Inactivo</td>}

                <td>{huesped.activo}</td>

              </tr>

            </tbody>)}
          </Table>

        }

      </>
      :
      <>
        <ListadoHuesped />
      </>
  )
}
