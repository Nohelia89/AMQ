import {useEffect, useState} from 'react';
//import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//import 'firebase/storage';
//import { getFirestoreApp } from "./firebase";
//import { doc, getFirestore, setDoc } from "firebase/firestore";
import './Alojamiento.css';
import axios from 'axios';



function ModificarAlojamiento({id}) {
    
/*   
    const db = getFirestore();
    getFirestoreApp();
    const storage = getStorage();
    const [image , setImage] = useState('');
    const [image2 , setImage2] = useState('');
    const [image3 , setImage3] = useState(''); */
    const [dataForm, setDataForm] = useState({nombre: '', descripcion: '', direccion: '', calle:''})
    const [botontype, setBotonType ] = useState('');
    const [aloj , setAloj] = useState([]);
    //const [alojamiento, setAlojamiento] = useState();
    const handleChange = (e) => {
        setAloj({
          ...aloj,
          [e.target.name]: e.target.value,
        
      })
    }


    const changeStateButton = (e) => {
        setBotonType("hab")
        
      }


      const modificar = async (e) => {
        e.preventDefault();
    
      
        
        var alojamiento = {

          id: aloj.id,
          descripcion: aloj.descripcion,
          direcion: {
              
              calle: aloj.calle,
              numero: aloj.numero,
              ciudad: aloj.ciudad,
            
            },
          nombre: aloj.nombre
        };
        
    
   
          
               
                axios.post(`http://localhost:8080/alojamiento/modificar`, alojamiento )
                
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                })
          
        }

      useEffect(() => {

        axios.get('http://localhost:8080/alojamiento/buscarAlojamiento/'+ id)
            .then(res => {
                const aloj = res.data;
                setAloj(aloj);
         setBotonType('aloj')
               // setIsLoading(false);
            })

     
    }, [])

    
/* 

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


 */
    
  return (

    botontype === "aloj" ? 

        <div className="bod1">
          <form className="form1" >
          <div className="tit">MODIFICAR ALOJAMIENTO</div>
          <div className="input_container">

          <p class="form-input2" type="Nombre:"><input required class="form-input1" name='nombre' type='text' value={aloj.nombre} onChange={handleChange} ></input></p>  
          <p class="form-input2" type="Direccion:">
            <input required class="form-input1" name='calle' type='text' value={aloj.direcion.calle} onChange={handleChange}></input>
            <input required class="form-input1" name='numero' type='text' value={aloj.direcion.numero} onChange={handleChange}></input>
            <input required class="form-input1" name='ciudad' type='text' value={aloj.direcion.ciudad} onChange={handleChange}></input></p>
          </div>
          <p className="form-input2" type="Descripcion:"><textarea className="textarea" rows="7" cols="70" name='descripcion' type='text'  onChange={handleChange} value={aloj.descripcion}></textarea></p>
    {/* 
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

          <button className = "boton2" onClick={uploadFirestore}>Cargar Imagenes</button> <br></br> */}
      
          <button className = "boton" onClick={modificar}>Actualizar</button>
        </form>
        
      </div>
    
    : null
    
  );
}
  
export default ModificarAlojamiento;