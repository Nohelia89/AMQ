import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage';
import { getFirestoreApp } from "./firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import './Alojamiento.css';
import AltaHabitacionAlojamiento from './AltaHabitacionAlojamiento';
import axios from 'axios';
import { useUserContext } from '../UserContext/userContext';
import { Form } from "react-bootstrap";
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';



function AgregarAlojamiento() {


  const db = getFirestore();
  getFirestoreApp();
  const storage = getStorage();
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const [dataForm, setDataForm] = useState({ nombre: '', descripcion: '' })
  const [dir, setDir] = useState({ calle: '', numero: '', ciudad: '' })
  const [pais, setPais] = useState()
  const [paises, setPaises] = useState([])
  const [botontype, setBotonType] = useState('aloj');

  const { userToken } = useUserContext();

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,

    })
  }

  const handleChange1 = (e) => {
    setDir({
      ...dir,
      [e.target.name]: e.target.value,

    })
  }
  const handleChange2 = (e) => {

    setPais(e.target.value);
  }



  const changeStateButton = (e) => {
    setBotonType("hab")

  }


  const upload1 = async (e) => {
    e.preventDefault();
    if (image == null)
      return;
    const newRef = ref(storage, `${image.name}`);
    await uploadBytes(newRef, image).then((snapshot) => {
      alert("Imagen Subida!")
    })

  }

  const upload2 = async (e) => {
    e.preventDefault();
    if (image2 == null)
      return;
    const newRef = ref(storage, `${image2.name}`);
    await uploadBytes(newRef, image2).then((snapshot) => {
      alert("Imagen Subida!")
    })

  }

  const upload3 = async (e) => {
    e.preventDefault();
    if (image3 == null)
      return;
    const newRef = ref(storage, `${image3.name}`);
    await uploadBytes(newRef, image3).then((snapshot) => {
      alert("Imagen Subida!")
    })

  }

  const Habitacion = () => {

    return (

      <AltaHabitacionAlojamiento dataAloj={dataForm} pais={pais} direccion={dir} />
    )
  }

  useEffect(() => {



    axios.get(`http://localhost:8080/alojamiento/getPaises`, {
      headers: {
        'Authorization': `token ${userToken}`
      }
    })
      .then(res => {
        let paises = res.data;
        setPaises(paises);
      })

      .catch(error => {
        alert("ERROR: " + error.response.data.mensaje);
      });

  }, [])

  const uploadFirestore = async (e) => {
    e.preventDefault()
    const newRef1 = ref(storage, `${image.name}`);
    const newRef2 = ref(storage, `${image2.name}`);
    const newRef3 = ref(storage, `${image3.name}`);
    const enlaceUrl1 = await getDownloadURL(newRef1);
    const enlaceUrl2 = await getDownloadURL(newRef2);
    const enlaceUrl3 = await getDownloadURL(newRef3);
    await setDoc(doc(db, "fotos", `${dataForm.nombre}`), {
      url1: enlaceUrl1,
      url2: enlaceUrl2,
      url3: enlaceUrl3
    });

  }




  return (

    botontype === "aloj" ?

      <div className="bod1">
        <NavBarAnfitrion/>
        <form className="form1" >
          <div className="tit">NUEVO ALOJAMIENTO</div>
          <div className="input_container">

            <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={dataForm.nombre} onChange={handleChange} placeholder='Ingrese Nombre'></input></p>
            <p class="form-input2" type="Dirección:"><input required class="form-input1" name='calle' type='text' value={dir.calle} onChange={handleChange1} placeholder='Calle'></input>
              <input required class="form-input1" name='numero' type='text' value={dir.numero} onChange={handleChange1} placeholder='Numero'></input>
              <input required class="form-input1" name='ciudad' type='text' value={dir.ciudad} onChange={handleChange1} placeholder='Ciudad'></input></p>
          </div>
          <Form.Select aria-label="Floating label select example" value={pais} onChange={handleChange2}>

            {paises.map((option) => {
              return (<option key={option.id} value={option.id}>{option.valor}</option>);
            })}

 

          </Form.Select>

          <p className="form-input2" type="Descripcion:"><textarea className="textarea" rows="7" cols="70" name='descripcion' type='text' onChange={handleChange} value={dataForm.descripcion}></textarea></p>

          <center>
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            <button onClick={upload1}>Subir</button>
          </center>
          <center>
            <input type="file" onChange={(e) => { setImage2(e.target.files[0]) }} />
            <button onClick={upload2}>Subir</button>
          </center>
          <center>
            <input type="file" onChange={(e) => { setImage3(e.target.files[0]) }} />
            <button onClick={upload3}>Subir</button>
          </center>

          <button className="boton2" onClick={uploadFirestore}>Cargar Imagenes</button> <br></br>

          <button className="boton" onClick={changeStateButton}>Cargar Habitacion</button>
        </form>

      </div>

      : <Habitacion />

  );
}

export default AgregarAlojamiento;