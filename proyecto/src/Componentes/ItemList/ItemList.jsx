
import Item from "../Item/Item";



function ItemList({ alojamiento }) {


    return (
        
        <>
      
            {alojamiento.map(alojamiento => <Item key={alojamiento.id} aloj={alojamiento} />)}
        </>
    )
}
export default ItemList;
