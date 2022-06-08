
import Item from "../Item/Item";


function ItemList({ alojamiento }) {


    return (
        <>
         {console.log(alojamiento+"soy alojamiento de itemlist")}
            {alojamiento.map(alojamiento => <Item key={alojamiento.id} aloj={alojamiento} />)}
        </>
    )
}
export default ItemList;
