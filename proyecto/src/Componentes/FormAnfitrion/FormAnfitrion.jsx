import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState } from 'react';
import AltaAlojamiento from '../Alojamiento/AltaAlojamiento';
import NavBarInvitado from '../Navbar/NavbarInvitado';

function FormAnfitrion() {

    const [dataForm, setDataForm] = useState({ nombre: '', apellido: '', email: '', password: '', password2: '', activo: false })
    const [botontype, setBotonType ] = useState('aloj');


    const CargarAlojamiento= ()=> {
        if (dataForm.password === dataForm.password2) {
        return (
        
            <AltaAlojamiento dataUser={dataForm} />
            
          )
        }
      }
    
      const changeStateButton = (e) => {
        setBotonType("hab")
        
      }

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }


    return (

        botontype === "aloj" ? 


        <div class="overlay">
            <NavBarInvitado/>
            <form class="form1">
                <div class="tit">REGISTRO ANFITRION</div>



                <div class="input_container">
                    <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={dataForm.nombre} onChange={handleChange} placeholder='Ingrese Nombre'></input></p>
                    <p class="form-input2" type="Apellido:"><input required class="form-input1" name='apellido' type='text' value={dataForm.apellido} onChange={handleChange} placeholder='Ingrese Apellido'></input></p>
                </div>
                <div>
                    <p class="form-input2" type="Mail:"><input required class="form-input1" name='email' type='email' value={dataForm.email} onChange={handleChange} placeholder='Ingrese email'></input></p>
                    <p class="form-input2" type="Password:"><input required type='password' name='password' class="form-input1" value={dataForm.password} onChange={handleChange} placeholder='Ingrese Password'></input></p>
                    <input required type='password' name='password2' class="form-input1" value={dataForm.password2} onChange={handleChange} placeholder='Repita Password'></input>
                </div>

                <br />

           
        <div style={{ padding: "10px", marginTop: "-30px" }}>

                    <Link to={'/registro'}>
                        <Button style={{ marginTop: "10px", marginRight: "-500px" }} variant="dark" >Volver</Button>
                        </Link>
                        
                    <button  style={{ marginLeft: "-500px"}}  variant="dark" class="btn submits boton" onClick={changeStateButton}>Crear Alojamiento</button>
                  
                </div>



            </form>
        </div>
     : <CargarAlojamiento />
    );

}
export default FormAnfitrion;