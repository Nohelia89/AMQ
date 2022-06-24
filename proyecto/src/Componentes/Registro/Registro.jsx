
//import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext/userContext';
import './Registro.css';





export default function Registro() {
    const { userType } = useUserContext();

    return (
        userType === "Ad" ?
            <>

                <div class="overlay">
                    <form class="form7">
                        <div class="tit">REGISTRO</div>


                        <Link to={'/admin'}>
                            <Button variant="dark" >Administrador</Button>
                        </Link>
                    </form>


                </div>
            </>
            :
            <>
                <div class="overlay">
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