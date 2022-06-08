import { useEffect, useState } from "react"
import { CardGroup } from "react-bootstrap"

import { useParams } from "react-router-dom"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import axios from "axios";
import ItemList from "../ItemList/ItemList";





function ItemListContainer({alojItemList}) {

  const [aloj, setAloj] = useState([])
  const [loading, setLoading] = useState(true)
 

setAloj(alojItemList)
 {aloj ? console.log(aloj): setLoading(false)}
  return ( 

    <>
{
  
 loading ? <h2>Cargando...</h2> : <CardGroup><ItemList alojamiento={aloj} /></CardGroup>
}

     

    </>
  )



}
export default ItemListContainer