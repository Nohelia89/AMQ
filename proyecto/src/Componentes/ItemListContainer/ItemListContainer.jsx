import { useEffect, useState } from "react"
import { CardGroup } from "react-bootstrap"

import { useParams } from "react-router-dom"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import axios from "axios";
import ItemList from "../ItemList/ItemList";





function ItemListContainer() {

  const [aloj, setAloj] = useState([])
  const [loading, setLoading] = useState(true)
 // const { category } = useParams()



  /* useEffect(() => {
    const db = getFirestore()
    const queryCollection = collection(db, 'items')
    const queryFilter = category ? query(queryCollection, where('category', "==", category)) : queryCollection

    getDocs(queryFilter)

      .then(resp => setProds(resp.docs.map(prod => ({ id: prod.id, ...prod.data() }))))
      .catch(err => console.log(err)) // capturamos todos los errores con el catch
      .finally(() => setLoading(false))//ej loading






  }, [category])
   */


  
  axios.get("http://localhost:8080/alojamiento/listarAlojamientos")
  .then(res => {
  const alojamiento = res.data;
    setAloj( alojamiento);
    setLoading(false);
  })
  return (

    <>



      {loading ? <h2>Cargando...</h2> : <CardGroup><ItemList alojamiento={aloj} /></CardGroup>}

    </>
  )



}
export default ItemListContainer