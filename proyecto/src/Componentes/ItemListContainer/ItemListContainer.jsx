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


  
/*   axios.get("http://localhost:8080/alojamiento/listarAlojamientos")
  .then(res => {
  const alojamiento = res.data;
    setAloj( alojamiento);
    setLoading(false);
  }) */

/*   var alojamiento = {
    
      id_anf: 0,
      aloj_activo: true,
      aloj_nombre: "string",
      aloj_desc: "string",
      aloj_pais: "1001",
      aloj_ciudad: "string",
      hab_desc: "string",
      hab_precio: 0,
      hab_precio_hasta: 1000000,
      hab_camas: 0,
      hab_camas_mas_de: 0,
      hab_serv_aire: true,
      hab_serv_tvCable: true,
      hab_serv_jacuzzi: true,
      hab_serv_wifi: true,
      hab_serv_desayuno: true,
      hab_serv_parking: true
    
  }; */
     var alojamiento = {
    
      aloj_pais: "pais_ 1001",
      
    
  }; 
  
  async function listar() {

    try {
  
      const response =   await axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, alojamiento ) 
      return response.data;
  
    } catch (err) {
  
      console.log("ko -> error");
      return 'errorr';
    }
  }

  /*  axios.post(`http://localhost:8080/alojamiento/listarAlojamientos`, alojamiento ) 
                
                .then(res => {
                  console.log(res.data)
                  var alojamiento = res.data;
                  
    setAloj( res.data);
    console.log(alojamiento+ "SOY ALOJAMIENTOOOOOOOOOOOOOOOOOOOOOOO" + aloj)
    setLoading(false);
                })

    */
  return ( 

    <>
{window.addEventListener('load', async(e) => {
 const valor = await listar()
 console.log(valor);
 loading ? <h2>Cargando...</h2> : <CardGroup><ItemList alojamiento={valor} /></CardGroup>
})

     }

    </>
  )



}
export default ItemListContainer