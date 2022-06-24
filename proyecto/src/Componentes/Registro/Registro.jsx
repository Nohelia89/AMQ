
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
                                <Button style={{ marginRight: "5px" }} variant="dark" >Huesped</Button>
                            </Link>



                            <Link to={'/anfitrion'}>
                                <Button variant="dark" >Anfitrion</Button>
                            </Link>

                        </div>
                    </form>


                </div>

            </>



    )
} 