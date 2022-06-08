import axios from "axios";
import { useState } from "react";
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";




function Search() {


    const [val , setVal] = useState();
    const [valC , setValC] = useState();
    const [valP , setValP] = useState();

    var paises = {
    
        activo: true,
        
      
    }; 

    async function buscar() {

        try {
      
            var precio_desde = '';
            var precio_hasta = '';
        
            if (valP === 1){
                precio_desde = 0;
                precio_hasta = 50;
            } else if (valP === 2){
                precio_desde = 51;
                precio_hasta = 100;
            } else if (valP === 3) {
                precio_desde = 101;
                precio_hasta = 200;
            } else if (valP === 4) {
                precio_desde = 201;
                precio_hasta = 300;
            } else if (valP === 5) {
                precio_desde = 301;
                precio_hasta = 1000;
            }
        
        
    var alojamiento = {
    
        aloj_pais: "pais_ 1001",
        //calificacion_global: valC,
        hab_precio: precio_desde,
        hab_precio_hasta: precio_hasta
       

    }; 

          const response =   await axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, alojamiento ) 
          console.log(response.data);
          return response.data;
        } catch (err) {
      
          console.log("ko -> error");
          return 'errorr';
        }

      }

    var valor = []

    async function listar() {

        try {
      
          const response =   await axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, paises ) 
          return response.data;
      
        } catch (err) {
      
          console.log("ko -> error");
          return 'errorr';
        }
      }


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
        setValP(e.target.value);
        
      }

    return (
<>
       

        <div style={{marginLeft: "18%", width: "1000px" , padding:"15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px"}}>      
<Row className="g-3">
<Col md style={{padding:"10px"}}>
    <FloatingLabel controlId="floatingSelectGrid" label="Pais">
      <Form.Select aria-label="Floating label select example" value={val} onChange={handleChange}>
            
      {window.addEventListener("DOMContentLoaded", async(e) => {
          valor = await listar();
       valor.map((pais) => {
       
                <option key={pais.id} value={pais.id}>
                  {pais.nombre}
                </option>
                 console.log(pais.id)
            })} )}
      </Form.Select >
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Calificacion Global">
      <Form.Select aria-label="Floating label select example" value={valC} onChange={handleChangeC}>
      
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="3">4</option>
        <option value="3">5</option>
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Precio por noche">
      <Form.Select aria-label="Floating label select example" value={valP} onChange={handleChangeP}> 
        <option value="1">US$ 0 - US$ 50</option>
        <option value="2">US$ 51 - US$ 100</option>
        <option value="3">US$ 101 - US$ 200</option>
        <option value="3">US$ 201 - US$ 300</option>
        <option value="3">US$ 301 - US$ 1000</option>
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px", paddingRight:"90px"}} >
  <button className = "boton" onClick={buscar} >Buscar</button>
  </Col>
  
</Row>
</div>               
</>  )
  }
  
  export default Search;