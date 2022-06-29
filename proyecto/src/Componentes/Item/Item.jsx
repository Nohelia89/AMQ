import { Button, Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap"
import { useEffect, useState } from "react";
import { getFirestore, collection, getDoc, doc, getDocs, where, query } from "firebase/firestore";
import { getFirestoreApp } from "../Alojamiento/firebase";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext/userContext";
import './Item.css'


function Item({ aloj }) {

  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const { setearAloj } = useUserContext();


console.log(aloj)
  


  const setear = async () => {
   
let alojamiento = [];

console.log("ALOJAMIENTO")
var obj = {"url1": url1,"url2": url2,"url3": url3, "aloj": aloj};
 alojamiento.push(obj);

  setearAloj(alojamiento)

  
}


  const descargar = async () => {

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


  useEffect(() => {
    descargar()

   

  }, [])


  return (
    <div >

      <Card className={"card-grid"} style={{ width: '20rem' } }>
        <Card.Img className={"card_image"} variant="top" src={url1} />
        <Card.Body class="card_content">
          <Card.Title class="card_title">{aloj.nombre}</Card.Title>
          <Card.Text class="card_text">
               
          Ciudad: {aloj.direcion.ciudad}
       
          </Card.Text>
     
      


       
          <Nav.Link as={Link} to='/detalleAlojamiento'>
            <Button class="btn card_btn" onClick={setear} >Más Info</Button>
          </Nav.Link>


        </Card.Body>

      </Card>

    </div>
  )

}
export default Item;
