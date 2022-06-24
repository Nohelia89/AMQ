import {useEffect, useState} from 'react';
//import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//import 'firebase/storage';
//import { getFirestoreApp } from "./firebase";
//import { doc, getFirestore, setDoc } from "firebase/firestore";
import './Alojamiento.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';



function ModificarAlojamiento({id}) {
    
/*   
    const db = getFirestore();
    getFirestoreApp();
    const storage = getStorage();
    const [image , setImage] = useState('');
    const [image2 , setImage2] = useState('');
    const [image3 , setImage3] = useState(''); */
    const [dataForm, setDataForm] = useState({newNombre: '', newDescripcion: '', newDireccion: '', newCalle:'', newCiudad: '', newPais: ''})
    const [botontype, setBotonType ] = useState('');
    const [aloj , setAloj] = useState([]);


    const handleChange = (e) => {
        setDataForm({
          ...dataForm,
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
          nombre: dataForm.newNombre,
          descripcion: dataForm.newDescripcion,
          direccion: {
              id: aloj.id,
              calle: dataForm.newCalle,
              numero: dataForm.newNumero,
              ciudad: dataForm.newCiudad,
              pais: {
                id: aloj.id,
                nombre: dataForm.newPais
              }
            },
         
        };
        
    
   
          
               
                axios.post(`http://localhost:8080/alojamiento/modificar`, alojamiento )
                
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  alert("ALOJAMIENTO MODIFICADO")
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
          <form className="form21" >
          <div className="tit">MODIFICAR ALOJAMIENTO</div>
          <div className="input_container">

          <p className="form-input2" type="Nombre Anterior">  <input required class="form-input1" name='nombre' type='text' value={aloj.nombre}></input></p>
          <p className="form-input2" type="Nuevo Nombre">  <input required class="form-input1" name='newNombre' type='text' value={dataForm.newNombre} onChange={handleChange} ></input> </p>
          </div>
          <div className="input_container2">
          <p className="form-input2" type="Calle Anterior"><input required class="form-input1" name='calle' type='text' value={aloj.direcion.calle} ></input></p>
          <p className="form-input2" type="Numero Anterior">  <input required class="form-input1" name='numero' type='text' value={aloj.direcion.numero} ></input></p>
          <p className="form-input2" type="Ciudad Anterior">  <input required class="form-input1" name='ciudad' type='text' value={aloj.direcion.ciudad} ></input></p>
          <p className="form-input2" type="Pais Anterior">  <input required class="form-input1" name='pais' type='text' value={aloj.direcion.pais.nombre} ></input></p>
            </div>
            <div className="input_container2">
          <p className="form-input2" type="Nueva Calle "><input required class="form-input1" name='newCalle' type='text' value={dataForm.newCalle} onChange={handleChange}></input></p>
          <p className="form-input2" type="Nuevo Numero ">  <input required class="form-input1" name='newNumero' type='text' value={dataForm.newNumero} onChange={handleChange}></input></p>
          <p className="form-input2" type="Nueva Ciudad ">  <input required class="form-input1" name='newCiudad' type='text' value={dataForm.newCiudad} onChange={handleChange}></input></p>
          <p className="form-input2" type="Nuevo Pais ">  <input required class="form-input1" name='newPais' type='text' value={dataForm.newPais} onChange={handleChange}></input></p>
          
            </div>
            <div className="input_container">
          <p className="form-input2" type="Descripcion Anterior:"><textarea className="textarea" rows="10" cols="50" name='descripcion' type='text'  value={aloj.descripcion}></textarea></p>
          <p className="form-input2" type="Nueva Descripcion:"><textarea className="textarea" rows="10" cols="50" name='newDescripcion' type='text'  onChange={handleChange} value={dataForm.newDescripcion}></textarea></p>
         </div>
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