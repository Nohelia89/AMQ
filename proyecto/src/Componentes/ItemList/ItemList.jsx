
import Item from "../Item/Item";


function ItemList({ aloj }) {


    return (
        <>
            {aloj.map(aloj => <Item key={aloj.id_anf} aloj={aloj} />)}
        </>
    )
}
export default ItemList;
