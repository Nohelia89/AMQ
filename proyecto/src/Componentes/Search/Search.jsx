import axios from "axios";
import { useEffect, useState } from "react";
import { Col, FloatingLabel, Row, Form, CardGroup } from "react-bootstrap";
import ItemList from "../ItemList/ItemList";




function Search() {


    const [val , setVal] = useState();
    const [valC , setValC] = useState();
    const [valP , setValP] = useState();
    const [precioDesde , setPrecioDesde] = useState();
    const [precioHasta , setPrecioHasta] = useState();
    const [valorPais , setValor] = useState([]);
    const [botontype, setBotonType ] = useState('sincards');
    const [aloj , setAloj] = useState([]);

    var paises = {
    
        activo: true,
        
      
    }; 

   
    async function buscar() {
  

        try {
        
            if (valP === 1){
                setPrecioDesde("0");
                setPrecioHasta("50");
            } else if (valP === 2){
              setPrecioDesde("51");
              setPrecioHasta("100");
            } else if (valP === 3) {
              setPrecioDesde("101");
              setPrecioHasta("200");
            } else if (valP === 4) {
              setPrecioDesde("201");
                setPrecioHasta("300");
            } else if (valP === 5) {
              setPrecioDesde("301");
              setPrecioHasta("1000");
            }
        console.log(precioDesde);
          
    var alojamiento = {
    
        aloj_idPais: val,
        //calificacion_global: valC,
        hab_precio: precioDesde,
        hab_precio_hasta: precioHasta
       
       
    }; 

          const response =   await axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, alojamiento ) 
        //  console.log(response.data);
        setAloj(response.data)
        setBotonType('concards')
          return response.data;
       
          
        } catch (err) {
      
          console.log("ko -> error");
          return 'errorr';
        }
        
      }

    //let valor = []
 
  
 
  
  
  useEffect(() => {
    
 

    axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, paises ) 
    .then(res => {
    let paises = res.data;
      setValor(paises);
    })


      
    
  },[])

      
      
  const Habitacion= ()=> {
  
    return (
      <>
      {console.log(aloj+"soy aloj")}
      <CardGroup><ItemList alojamiento={aloj} /></CardGroup>
      </>
    )
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



    botontype === "sincards" ? 
<>
       

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
      
   
        {valorPais.map((option, index) => {
            return (<option key={index} value={index}>{option.direcion.pais.nombre}</option>);
        })}
 
    
        
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px"}} >
  <FloatingLabel controlId="floatingSelectGrid" label="Precio por noche">
      <Form.Select aria-label="Floating label select example" value={valP} onChange={handleChangeP}> 
        <option value="1">US$ 0 - US$ 50</option>
        <option value="2">US$ 51 - US$ 100</option>
        <option value="3">US$ 101 - US$ 200</option>
        <option value="4">US$ 201 - US$ 300</option>
        <option value="5">US$ 301 - US$ 1000</option>
      </Form.Select>
    </FloatingLabel>
  </Col>
  <Col md style={{padding:"10px", paddingRight:"90px"}} >
  <button className = "boton" onClick={buscar} >Buscar</button>
  </Col>
  
</Row>
</div>               
</> 
:

<Habitacion /> )
  }
  
  export default Search;