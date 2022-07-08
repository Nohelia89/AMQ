import {useEffect, useState} from 'react';
//import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//import 'firebase/storage';
//import { getFirestoreApp } from "./firebase";
//import { doc, getFirestore, setDoc } from "firebase/firestore";
import './Alojamiento.css';
import axios from 'axios';
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';
import { Link } from 'react-router-dom';
import MainAnfitrion from '../Main/MainAnfitrion';



function ModificarAlojamiento({id}) {
    
/*   
    const db = getFirestore();
    getFirestoreApp();
    const storage = getStorage();
    const [image , setImage] = useState('');
    const [image2 , setImage2] = useState('');
    const [image3 , setImage3] = useState(''); */
   
    const [botontype, setBotonType ] = useState('');
    const [aloj , setAloj] = useState([]);
    const [dir , setDir] = useState({calle:'', numero:'', ciudad:''});
    const { userToken } = useUserContext();
    //const [alojamiento, setAlojamiento] = useState();
    const handleChange = (e) => {
        setAloj({
          ...aloj,
          [e.target.name]: e.target.value,
        
      })
    }

    const handleChange2 = (e) => {
      setDir({
        ...dir,
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
          direccion: {
              id:dir.id,
              calle: dir.calle,
              numero: dir.numero,
              ciudad: dir.ciudad,
              pais: {
                id: aloj.id,
                nombre: ''
              }
            },

          nombre: aloj.nombre
        };
        
    
   
          
               
                axios.post(`http://localhost:8080/alojamiento/modificar`, alojamiento,{
                    headers: {
                      'Authorization': `${userToken}`
                    }
                  })
                
                .then(res => {
                  console.log(res);
                  alert("Datos actualizados correctamente"); 
                  setBotonType("actualizar")
                
                })
                .catch(error => {
                    alert("ERROR: " + error.response.data.mensaje); 
                  });
           
         
          
        }

      useEffect(() => {

        axios.get('http://localhost:8080/alojamiento/buscarAlojamiento/'+ id,{
            headers: {
              'Authorization': `${userToken}`
            }
          })
            .then(res => {
                const aloj = res.data;
                setAloj(aloj);
                const dir = res.data.direcion
                setDir(dir)
         setBotonType('aloj')
               // setIsLoading(false);
            })

     
    }, [])

    

    
  return (

    botontype === "aloj" ? 

        <div className="overlay">
            <NavBarAnfitrion/>
          <form className="form1" >
          <div className="tit">MODIFICAR ALOJAMIENTO</div>
          <div className="input_container">

          <p class="form-input2" type="Nombre:">
            <input required class="form-input1" name='nombre' type='text' value={aloj.nombre} onChange={handleChange} ></input>
            </p>  
          <p class="form-input2" type="Direccion:">
            <input required class="form-input1" name='calle' type='text' value={dir.calle} onChange={handleChange2}></input>
            <input required class="form-input1" name='numero' type='text' value={dir.numero} onChange={handleChange2}></input>
            <input required class="form-input1" name='ciudad' type='text' value={dir.ciudad} onChange={handleChange2}></input></p>
          </div>
       
          <p className="form-input2" type="Descripcion:"style={{marginBottom:"-10px" }}><textarea className="textarea" rows="5" cols="50" name='descripcion' type='text'  onChange={handleChange} value={aloj.descripcion}></textarea></p>
   
     
          <Link to={'/mainAnfitrion'}>
          <button class="sign-up" style={{marginLeft:"30px" }} >Volver</button>
        </Link>
          <button className="sign-up" style={{marginLeft:"10px", marginTop:"90px" }} onClick={modificar}>Actualizar</button>
     
        </form>
        
      </div>
    
    :<MainAnfitrion/>
    
  );
}
  
export default ModificarAlojamiento;