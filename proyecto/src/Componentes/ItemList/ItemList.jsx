
import Item from "../Item/Item";


function ItemList({ alojamiento }) {


    return (
        <>
            {alojamiento.map(alojamiento => <Item key={alojamiento.id_anf} alojamiento={alojamiento} />)}
        </>
    )
}
export default ItemList;
