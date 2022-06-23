import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
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
    <div>

      <Card className={"card-grid"} style={{ width: '18rem' } }>
        <Card.Img className={"card-img"} variant="top" src={url1} />
        <Card.Body>
          <Card.Title>Nombre:{aloj.nombre}</Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem> Pais: {aloj.direcion.ciudad}</ListGroupItem>

        </ListGroup>


        <Card.Body>
          <Link to='/detalleAlojamiento'>
            <Button variant="dark" onClick={setear} >Más Info</Button>
          </Link>


        </Card.Body>

      </Card>

    </div>
  )

}
export default Item;
