

import ControlledCarousel from "../Carousel/ControlledCarousel";
import NavBarAdministrador from "../Navbar/NavBarAdministrador";
import NavBarInvitado from "../Navbar/NavbarInvitado";
import Figure from 'react-bootstrap/Figure'


export default function MainAdministrador
() {


    return (

      
    <>
  
  <NavBarAdministrador/>
  <Figure>
<Figure.Image
  width={171}
  height={180}
  alt="171x180"
  src="../reparacion.jpg"
/>
<Figure.Caption>
  Bienvenido al menú Administrador
</Figure.Caption>
</Figure>
  

    </>
      
 )
} 