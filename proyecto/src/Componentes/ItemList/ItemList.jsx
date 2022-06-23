
import Item from "../Item/Item";
import NavBarInvitado from "../Navbar/NavbarInvitado";


function ItemList({ alojamiento }) {


    return (
        
        <>
      
            {alojamiento.map(alojamiento => <Item key={alojamiento.id} aloj={alojamiento} />)}
        </>
    )
}
export default ItemList;
