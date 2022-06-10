import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useEffect, useState } from "react";
import { getFirestore, collection, getDoc, doc, getDocs, where, query} from "firebase/firestore";
import { getFirestoreApp } from "../Alojamiento/firebase";
import DetalleAlojamiento from "../DetalleAlojamiento/DetalleAlojamiento";



function Item({ aloj }) {

  const [botontype, setBotonType ] = useState('sinDetalle');
  const [url1, setUrl1] = useState ('');
  const [url2, setUrl2] = useState ('');
  const [url3, setUrl3] = useState ('');


  const descargar = async () =>{

         const db = getFirestore();
         getFirestoreApp();
         const docRef = doc(db, "fotos", aloj.nombre);
         const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUrl1(docSnap.data().url1)
          setUrl2(docSnap.data().url2)
          setUrl3(docSnap.data().url3)
        } 
        }
        

      useEffect(()=> {
        descargar()
        
      },[])

    
      const Habitacion= ()=> {
  
        
           setBotonType('detalles') 
           
      }


      const Detalle= ()=> {
        return(
        <DetalleAlojamiento aloj={aloj} />
        )
   }
    
  return (
    botontype === "sinDetalle" ? 
    <>
    <div>
     
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url1} />
        <Card.Body>
          <Card.Title>Nombre:{aloj.nombre}</Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem> Pais: {aloj.direcion.ciudad}</ListGroupItem>

        </ListGroup>
       
       
          <Card.Body>
     
          <Button variant="dark" onClick={Habitacion}>Más Info</Button>
        
      

          </Card.Body>

      </Card>

    </div>
    </>
    :
    <DetalleAlojamiento aloj={aloj} />
  )

}
export default Item;
