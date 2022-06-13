/* import axios from "axios";
import { useEffect, useState } from "react";
import { Col, FloatingLabel, Row, Form, CardGroup } from "react-bootstrap";
import ItemList from "../ItemList/ItemList";






function SearchUser() {


    const [val , setVal] = useState();
    const [valC , setValC] = useState();
    const [valH , setValH] = useState('');
    const [valorPais , setValor] = useState([]);
    const [botontype, setBotonType ] = useState('sincards');
    const [aloj , setAloj] = useState([]);
    
    async function buscarConFiltro() {
  

  
          
    var usuario = {
    
        aloj_idPais: val,
        tipo: valH
       
      
    }; 
  

          const response =   await axios.post(`http://localhost:8080/usuario/listar`, usuario ) 
        //  console.log(response.data);
        setAloj(response.data)
        setBotonType('concards')
          return response.data;
       
          
       
      }

    //let valor = []
 
  
 
  
  
  useEffect(() => {
    
 

    axios.get(`http://localhost:8080/alojamiento/getPaises`) 
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
  <button className = "boton" onClick={buscar} >Buscar</button>
  </Col>
  
</Row>
</div>               
</> 
:

<Habitacion /> )
  }
  
  export default SearchUser; */