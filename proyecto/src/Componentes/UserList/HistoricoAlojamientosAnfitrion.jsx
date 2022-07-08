
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import { Col, FloatingLabel, Row, Form, CardGroup } from "react-bootstrap";

import AgregarModificarCalificacionDeHuesped from '../Calificacion/AgregarModificarCalificacionDeHuesped';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import Loading from '../Loading/Loading';



export default function HistoricoAlojamientosAnfitrion() {

  const [isLoading, setIsLoading] = useState(true);
  const [alojamiento, setAlojamiento] = useState([]);
  const [idRes, setIdRes] = useState('');
  const [idCal, setIdCal] = useState('');
  const { userToken,  userId } = useUserContext();
  const [botonType, setBotonType] = useState('sinActualizar');
  const [val, setVal] = useState();
  const [val1, setVal1] = useState(true);
  const [paises, setPaises] = useState([]);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [sort, setSort] = useState('sinOrdenar');
  const [sort2, setSort2] = useState('sinOrdenar');


  useEffect(() => {


    var enviar =
    {
     
      idUsuario: userId

    }
    axios.post("http://localhost:8080/reserva/listarDatosRequeridosCalificar",  enviar , {
      headers: {
        'Authorization': `${userToken}`
      }
    })
      .then(res => {
        const aloj = res.data;
        setAlojamiento(aloj);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });



      

    axios.get(`http://localhost:8080/alojamiento/getPaises`, {
      headers: {
        'Authorization': `${userToken}`
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

  const handleChange1 = (e) => {

    setVal1(e.target.value);

  }

  const CalificarAnf = (id) => {

    setIdRes(id)


    setBotonType("calificar")
  }


  const EliminarCal = (id) => {

    var calificacion = {

      idUsuario: userId,
      idReserva: id,
      calificacion: 0,

    };

    axios.post("http://localhost:8080/reserva/calificar",  calificacion , {
      headers: {
        'Authorization': `${userToken}`
      }
    })

    
    .then(res => {


      alert("SE ELIMINO CORRECTAMENTE LA CALIFICACION");

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
      idUsuario: userId


    };


    await axios.post("http://localhost:8080/reserva/listarDatosRequeridosCalificar", aloj , {
      headers: {
        'Authorization': `${userToken}`
      }
    })



      .then(res => {


        setAlojamiento(res.data)

      })
      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });


  }

  const ordenarDescTipo = () => {
    setSort2('sinOrdenar');
    setSort('sinOrdenar');
    var lista =  alojamiento.sort((a, b) => (a.aloj_dir_ciudad > b.aloj_dir_ciudad ? 1 : a.aloj_dir_ciudad < b.aloj_dir_ciudad ? -1 : 0))
    setList(lista);
    setSort('Ordenado');
    
  }

  const ordenarAscTipo = () => {
    setSort('sinOrdenar');
    setSort2('sinOrdenar');
    var lista =  alojamiento.sort((a, b) => (a.aloj_dir_ciudad > b.aloj_dir_ciudad ? -1 : a.aloj_dir_ciudad < b.aloj_dir_ciudad ? 1 : 0))
    setList2(lista);
    setSort2('Ordenado');
    
  }

  const ordenarDescCal = () => {
    setSort2('sinOrdenar');
    setSort('sinOrdenar');
    var lista =  alojamiento.sort((a, b) => (a.anf_calificacion > b.anf_calificacion ? 1 : a.anf_calificacion < b.anf_calificacion ? -1 : 0))
    setList(lista);
    setSort('Ordenado');
    
  }

  const ordenarAscCal = () => {
    setSort('sinOrdenar');
    setSort2('sinOrdenar');
    var lista =  alojamiento.sort((a, b) => (a.anf_calificacion > b.anf_calificacion ? -1 : a.anf_calificacion < b.anf_calificacion ? 1 : 0))
    setList2(lista);
    setSort2('Ordenado');
    
  }

  
  const ordenarDescCal1 = () => {
    setSort2('sinOrdenar');
    setSort('sinOrdenar');
    var lista =  alojamiento.sort((a, b) => (a.hu_calificacion > b.hu_calificacion ? 1 : a.hu_calificacion < b.hu_calificacion ? -1 : 0))
    setList(lista);
    setSort('Ordenado');
    
  }

  const ordenarAscCal1 = () => {
    setSort('sinOrdenar');
    setSort2('sinOrdenar');
    var lista =  alojamiento.sort((a, b) => (a.hu_calificacion > b.hu_calificacion ? -1 : a.hu_calificacion < b.hu_calificacion ? 1 : 0))
    setList2(lista);
    setSort2('Ordenado');
    
  }






  return (

    botonType === "sinActualizar" ?


      <>
        <NavBarAnfitrion />

        <div style={{ marginLeft: "18%",marginBottom: "40px", width: "1000px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>
          <Row className="g-3">


            <Col md style={{ padding: "10px" }} >
              <FloatingLabel controlId="floatingSelectGrid" label="País">
                <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>


                  {paises.map((option) => {
                    return (<option key={option.id} value={option.id}>{option.valor}</option>);
                  })}



                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md style={{ padding: "10px" }} >
              <FloatingLabel controlId="floatingSelectGrid" label="Alojamiento activo">
                <Form.Select aria-label="Floating label select example" value={val1} onChange={handleChange1}>
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


        {console.log(botonType + "SOY BOTONTYPE")}

        {isLoading ? <Loading/> :
          <Table striped bordered hover variant="light" style={{ marginLeft: "18%", width: "1000px",marginBottom: "40px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>

            <thead>
              <tr>
              <th>Huesped</th>
                <th>Descripción</th>
                <th>Dirección</th>
                <th>Ciudad <button onClick={ordenarAscTipo}>↑</button> <button onClick={ordenarDescTipo}>↓</button></th>
                <th>País</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Calificacion obtenida <button onClick={ordenarAscCal1}>↑</button> <button onClick={ordenarDescCal1}>↓</button></th>
                <th>Calificacion otorgada <button onClick={ordenarAscCal}>↑</button> <button onClick={ordenarDescCal}>↓</button></th>
                <th>Calificacion</th>
                <th>Eliminar Calificacion</th>
              </tr>
            </thead>
            { sort === 'sinOrdenar' || sort2 === 'sinOrdenar' ?
            alojamiento.map(alojamiento => <tbody key={alojamiento.res_id} >
              <tr>
                <td>{alojamiento.hu_nombre}</td>
                <td>{alojamiento.aloj_descripcion}</td>
                <td>{alojamiento.aloj_dir_calle}{alojamiento.aloj_dir_numero}</td>
                <td>{alojamiento.aloj_dir_ciudad} </td>
                <td>{alojamiento.aloj_dir_pais_nombre}</td>
                <td>{alojamiento.res_fechaInicio}</td>
                <td>{alojamiento.res_fechaFin}</td>
                { alojamiento.anf_calificacion ===0 || alojamiento.anf_calificacion ===-1 ?     <td>---</td>:<td>{alojamiento.anf_calificacion } </td>}
         
                {alojamiento.hu_calificacion ===0 ||alojamiento.hu_calificacion ===-1 ?     <td>---</td>:<td>{alojamiento.hu_calificacion}  </td>}
               

                {alojamiento.hu_calificacion === 0 ?
                  <td><button class="calificar" onClick={() => CalificarAnf(alojamiento.res_id)}>Calificar</button></td>
                  :
                  <td><button class="modificar"onClick={() => ModificarCal(alojamiento.res_id, alojamiento.anf_calificacion)}>Modificar</button></td>}


                <td><button class="eliminar" onClick={() => EliminarCal(alojamiento.res_id)}>X</button></td>
              </tr>

            </tbody>) : (sort === 'Ordenado' ?
              list.map(alojamiento => <tbody key={alojamiento.res_id} >
                <tr>
                <td>{alojamiento.hu_nombre}</td>
                  <td>{alojamiento.aloj_descripcion}</td>
                  <td>{alojamiento.aloj_dir_calle}{alojamiento.aloj_dir_numero}</td>
                  <td>{alojamiento.aloj_dir_ciudad} </td>
                  <td>{alojamiento.aloj_dir_pais_nombre}</td>
                  <td>{alojamiento.res_fechaInicio}</td>
                <td>{alojamiento.res_fechaFin}</td>
                  <td>{alojamiento.anf_calificacion} </td>
                  <td>{alojamiento.hu_calificacion} </td>
  
  
                  {alojamiento.hu_calificacion === 0 ?
                    <td><button class="calificar" onClick={() => CalificarAnf(alojamiento.res_id)}>Calificar</button></td>
                    :
                    <td><button class="modificar"onClick={() => ModificarCal(alojamiento.res_id, alojamiento.anf_calificacion)}>Modificar</button></td>}
  
  
                  <td><button class="eliminar" onClick={() => EliminarCal(alojamiento.res_id)}>X</button></td>
                </tr>
  
              </tbody>) :  list2.map(alojamiento => <tbody key={alojamiento.res_id} >
                <tr>
                <td>{alojamiento.hu_nombre}</td>
                  <td>{alojamiento.aloj_descripcion}</td>
                  <td>{alojamiento.aloj_dir_calle}{alojamiento.aloj_dir_numero}</td>
                  <td>{alojamiento.aloj_dir_ciudad} </td>
                  <td>{alojamiento.aloj_dir_pais_nombre}</td>
                  <td>{alojamiento.res_fechaInicio}</td>
                <td>{alojamiento.res_fechaFin}</td>
                  <td>{alojamiento.anf_calificacion} </td>
                  <td>{alojamiento.hu_calificacion} </td>
  
  
                  {alojamiento.hu_calificacion === 0 ?
                    <td><button class="calificar" onClick={() => CalificarAnf(alojamiento.res_id)}>Calificar</button></td>
                    :
                    <td><button class="modificar"onClick={() => ModificarCal(alojamiento.res_id, alojamiento.anf_calificacion)}>Modificar</button></td>}
  
  
                  <td><button class="eliminar" onClick={() => EliminarCal(alojamiento.res_id)}>X</button></td>
                </tr>
  
              </tbody>))
          }
          </Table>

        }

      </>
      : (botonType === "calificar") ? <AgregarModificarCalificacionDeHuesped id={idRes} /> :
        (botonType === "modificar") ? <AgregarModificarCalificacionDeHuesped id={idRes} /> :
          <HistoricoAlojamientosAnfitrion />

  )
}
