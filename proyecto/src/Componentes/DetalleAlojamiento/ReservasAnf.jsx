
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';


export default function ReservasAnf() {

    const [reservas, setReservas] = useState([]);
    const { userId, userToken } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [capture, setCapture] = useState();
    const [refund, setRefund] = useState();
    const [voide, setVoide] = useState();
    
  


    useEffect(() => {
console.log(userId + "user")
        axios.get("http://localhost:8080/reserva/listarReservasPendientesYAprobadas/" + userId, {
          headers: {
            'Authorization': `${userToken}`
          }
        })
            .then(res => {
                const rese = res.data;
    
                setReservas(rese);
                
                

         
            })
            .catch(error => {
              alert("ERROR: " + error.response.data.mensaje); 
            })
                   

     
    }, [botonType],[capture],[])




    const Aceptar = (idPayPal, idRes, idFactura) => {

      var factura = {
      idFactura: idFactura,
        idPaypal: capture
    };



    axios.get("http://localhost:8080/reserva/confirmar/" + idRes,{
      headers: {
        'Authorization': `${userToken}`
      }
    })
                
    .then(res => {
    
      setBotonType("aprobado")
      alert("Reserva Confirmada")
    
    
          axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+idPayPal+"/capture", {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer A21AAJRlNdhtbggssobMXJwJaj1kmbmRGxMp8XWgAE8PHTEJElNILh-BDfJZdPq_NSNYnNp1n0uK5QFaIEzgZhyG86wFm_mFA'
    
            }
            
           })
           .then(response => {
            console.log("Captura de pago exitosa");
            setCapture(response.data.id);
            
            axios.post("http://localhost:8080/reserva/confirmarPagoRealizado/", {
              idFactura: idFactura,
                idPaypal: response.data.id
            },{
              headers: {
                'Authorization': `${userToken}`
              }
            })
            .then(res => { 
              setBotonType("aprobado")
              alert("Reserva Confirmada")
              
      
            })
    
         })
    
        }
      )
      }     

    const Cancelar = (idRes, idPayPal) => {


      var factura = {
        id: idPayPal,
        estado: "RECHAZADO",
        monto: 0,
        fecha: {
          dia: 0,
          mes: 0,
          anio: 0
        },
        descuento: false,
        montoDescuento: 0,
        idPaypal: idPayPal
    };


      axios.post("https://api-m.sandbox.paypal.com/v2/payments/captures/"+idPayPal+"/refund", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAJRlNdhtbggssobMXJwJaj1kmbmRGxMp8XWgAE8PHTEJElNILh-BDfJZdPq_NSNYnNp1n0uK5QFaIEzgZhyG86wFm_mFA'

        }
      }).then(response => {
        console.log("Reembolso de pago exitoso");
        setRefund(response.data.id)
        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + idRes,  {factura},{
          headers: {
            'Authorization': `${userToken}`
          }
        })
                
        .then(res => {
     
         
          console.log(res.data);
          setBotonType("cancelado")
          alert("Reserva Cancelada")
          
          
        })

     })}
 
 

    const Rechazar = (idRes, idPayPal) => {

      
      var factura = {
        id: voide,
        estado: "RECHAZADO",
        monto: 0,
        fecha: {
          dia: 0,
          mes: 0,
          anio: 0
        },
        descuento: false,
        montoDescuento: 0,
        idPaypal: voide
    };


      axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+idPayPal+"/void", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAJRlNdhtbggssobMXJwJaj1kmbmRGxMp8XWgAE8PHTEJElNILh-BDfJZdPq_NSNYnNp1n0uK5QFaIEzgZhyG86wFm_mFA'

        }
        
       })
       .then(response => {
        console.log("Reembolso de pago exitoso");
        setVoide(response.data.id)
        axios.get("http://localhost:8080/reserva/cancelarReservaPendiente/" + idRes,  factura,{
          headers: {
            'Authorization': `${userToken}`
          }
        })
                
        .then(res => {
     
         
          console.log(res.data);
          setBotonType("rechazado")
          alert("Reserva Rechazada")
          
          
        })
    })
    
  }
    return (

        botonType === "sinActualizar" ?

    
            <>

{console.log(botonType+"SOY BOTONTYPE")}
                <NavBarAnfitrion />

                <Table striped bordered hover variant="light" style={{ marginLeft: "18%", width: "1000px",marginBottom: "40px", padding: "15px", borderRadius: "5px", boxShadow: "0px 9px 30px 9px", border: "1.5px solid gray", backgroundColor: "lightgrey", marginTop: "40px" }}>

                        <thead>
                            <tr>
                                <th>Alojamiento</th>
                                <th>Habitacion</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Aceptar/Rechazar</th>
                                <th>Cancelar</th>

                            </tr>
                        </thead>
                        {reservas.map(reservas => <tbody key={reservas.res_id} >
                            <tr>

                                <td>{reservas.aloj_nombre}</td>
                                <td>{reservas.hab_descripcion}</td>
                                <td>{reservas.res_fechaInicio}</td>
                                <td>{reservas.res_fechaFin}</td>
                                {reservas.res_estado === "PENDIENTE" ?   
                                <td><Button variant="success" onClick={() => Aceptar(reservas.facturas[0].idPaypal, reservas.res_id, reservas.facturas[0].idFactura)}>Aceptar</Button></td> :  
                                 (botonType === "aprobado" || reservas.res_estado === "APROBADO" ? <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id, reservas.facturas[0].idPaypal)}>Cancelar</Button></td> : <td>Cancelada</td> )
                                 }
                               {reservas.res_estado === "PENDIENTE" ?   
                                <td><Button variant="danger" onClick={() => Rechazar(reservas.res_id, reservas.facturas[0].idPaypal)}>Rechazar</Button></td> :  <td>Rechazada</td> }
                               
                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasAnf />
            
    )
}
