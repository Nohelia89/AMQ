

import NavBarInvitado from "../Navbar/NavbarInvitado";
import NavBarHuesped from "../Navbar/NavBarHuesped";
import Search from "../Search/Search";
import { useUserContext } from "../UserContext/userContext";




export default function ListarAlojamientos() {


  const { userType } = useUserContext();


  return (


    <>
    
      {userType === "Hu" ? <NavBarHuesped /> : <NavBarInvitado />}


      <Search />

    </>

  )
} 