
//import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarInvitado from '../Navbar/NavbarInvitado';
import { useUserContext } from '../UserContext/userContext';
import './Registro.css';





export default function Registro() {
    const { userType } = useUserContext();

    return (
       
            <>
                <div class="overlay">
                    <NavbarInvitado/>
                    <form class="form3">
                        <div class="tit">REGISTRO</div>

                        <div style={{ padding: "10px", marginTop: "110px", marginBottom: "10px" }}>





                            <Link to={'/huesped'}>
                                <button style={{ marginBottom:"10px" }}  class="sign-up" >Huesped</button>
                            </Link>



                            <Link to={'/anfitrion'}>
                                <button  class="sign-up" >Anfitrion</button>
                            </Link>

                        </div>
                    </form>


                </div>

            </>



    )
} 