
import Item from "../Item/Item";
import '../Item/Item.css'



function ItemList({ alojamiento }) {


    return (
        
        <>
      
            {alojamiento.map(alojamiento => <Item class="cards_item" key={alojamiento.id} aloj={alojamiento} />)}
        </>
    )
}
export default ItemList;
