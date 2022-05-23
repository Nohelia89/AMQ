import {useState} from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage';
import { getFirestoreApp } from "./firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import './Alojamiento.css';



function AltaAlojamiento() {
     
    const db = getFirestore();
    getFirestoreApp();
    const storage = getStorage();
    const [image , setImage] = useState('');
    const [image2 , setImage2] = useState('');
    const [image3 , setImage3] = useState('');
    const [dataForm, setDataForm] = useState({nombre: '', descripcion: '', direccion: ''})
    const [dataFormH, setDataFormH] = useState({nombre: '', descripcion: '', camas: '', precionoche: ''})
    const [botontype, setBotonType ] = useState('aloj');

    const handleChange = (e) => {
        setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value,
        
      })
    }

    const handleChangeH = (e) => {
        setDataFormH({
          ...dataFormH,
          [e.target.name]: e.target.value,
        
      })
    }

    const changeStateButton = (e) => {
        setBotonType("hab")
        
      }
    


const upload1 = async (e) =>{
 e.preventDefault();
  if(image == null)
    return;
    const newRef = ref(storage, `${image.name}`);
    await uploadBytes(newRef, image).then((snapshot) => {
      alert("Imagen Subida!")  
    })   
  
}

const upload2 = async (e) =>{
  e.preventDefault();
    if(image2 == null)
      return;
      const newRef = ref(storage, `${image2.name}`);
      await uploadBytes(newRef, image2).then((snapshot) => {
        alert("Imagen Subida!")  
      })   
    
  }

  const upload3 = async (e) =>{
    e.preventDefault();
    if(image3 == null)
      return;
      const newRef = ref(storage, `${image3.name}`);
      await uploadBytes(newRef, image3).then((snapshot) => {
        alert("Imagen Subida!")  
      })   
    
  }
    
  const CargarHabitacion= ()=> {
 
    return (
    
         <div className="bod1">
              <form className="form1">
              <div className="tit">HABITACION</div>
              <div className="input_container">
              <p className="form-input2" type="Nombre:"><input className="form-input1"  onChange={handleChangeH} value={dataFormH.nombre}></input></p>
              <p className="form-input2" type="Precio Por Noche (en US$):"><input className="form-input1" onChange={handleChangeH} value={dataFormH.precioNoche}></input></p>
              <p className="form-input2" type="Camas"><input className="form-input1" onChange={handleChangeH} value={dataFormH.camas}></input></p></div>
              <p className="form-input2" type="Descripción:"><textarea className="textarea" rows="7" cols="55"  onChange={handleChangeH} value={dataFormH.descripcion}></textarea></p>

              <button className = "btn submits boton">Registrar</button>
                
            </form>
          </div>
    
        
      )
    
  }

    

const uploadFirestore = async (e) =>{
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
        
    console.log("archivo cargado:", `${dataForm.nombre}`, "ulr:", enlaceUrl1);
    console.log("archivo cargado2:", `${dataForm.nombre}`, "ulr:", enlaceUrl2);
    console.log("archivo cargado3:", `${dataForm.nombre}`, "ulr:", enlaceUrl3);
  }



    
  return (

    botontype === "aloj" ? 

        <div className="bod1">
          <form className="form1">
          <div className="tit">NUEVO ALOJAMIENTO</div>
          <div className="input_container">
          <p className="form-input2" type="Nombre:"><input className="form-input1"  onChange={handleChange} value={dataForm.nombre}></input></p>
          <p className="form-input2" type="Dirección:"><input className="form-input1"  onChange={handleChange} value={dataForm.direccion}></input></p></div>
          <p className="form-input2" type="Descripción:"><textarea className="textarea" rows="7" cols="70"  onChange={handleChange} value={dataForm.direccion}></textarea></p>
    
          <center>
          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
          <button onClick={upload1}>Subir</button> 
          </center>
          <center>
          <input type="file" onChange={(e)=>{setImage2(e.target.files[0])}}/>
          <button onClick={upload2}>Subir</button>
          </center>
          <center>
          <input type="file" onChange={(e)=>{setImage3(e.target.files[0])}}/>
          <button onClick={upload3}>Subir</button>
          </center>

          <button className = "boton2" onClick={uploadFirestore}>Cargar Imagenes</button> <br></br>
      
          <button className = "boton" onClick={changeStateButton}>Cargar Habitacion</button>
        </form>
        
      </div>
    
    : <CargarHabitacion />
    
  );
}
  
export default AltaAlojamiento;