import {useEffect, useState} from 'react';
import { useUserContext } from "../UserContext/userContext";
import './Alojamiento.css';
import axios from 'axios';




function ModificarAlojamiento({id}) {
    

    const [dataForm, setDataForm] = useState({newNombre: '', newDescripcion: '', newDireccion: '', newCalle:'', newCiudad: '', newPais: ''})
    const [botontype, setBotonType ] = useState('');
    const [aloj , setAloj] = useState([]);
    const { userToken } = useUserContext();

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
        
    
   
          
               
                axios.post(`http://localhost:8080/alojamiento/modificar`, {alojamiento},{
                  headers: {
                    'Authorization': `token ${userToken}`
                  }
                })
                
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  alert("ALOJAMIENTO MODIFICADO")
                })
                .catch(error => {
                  alert("ERROR: " + error.response.data.mensaje); 
                });
          
        }

      useEffect(() => {

        axios.get('http://localhost:8080/alojamiento/buscarAlojamiento/'+ id,{
          headers: {
            'Authorization': `token ${userToken}`
          }
        })
            .then(res => {
                const aloj = res.data;
                setAloj(aloj);

         setBotonType('aloj')
      
            })
            .catch(error => {
              alert("ERROR: " + error.response.data.mensaje); 
            });
                       

    }, [])

    

    
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

          <button className = "boton" onClick={modificar}>Actualizar</button>
        </form>
        
      </div>
    
    : null
    
  );
}
  
export default ModificarAlojamiento;