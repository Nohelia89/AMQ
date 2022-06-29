
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
            'Authorization': `token ${userToken}`
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
        'Authorization': `token ${userToken}`
      }
    })
                
    .then(res => {
    
      setBotonType("aprobado")
      alert("Reserva Confirmada")
    
    
          axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+idPayPal+"/capture", {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer A21AAJlLHvZt3hrqp5TF4FYXEbnisc6IZBhAiQli-4-fFJRe7xKSz1qV2nhZ5us1AxH_1qqRHqeDxMIGWEPmY0Mw1USTIAIjg'
    
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
                'Authorization': `token ${userToken}`
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
          'Authorization': 'Bearer A21AAJa88PPtzqyN2sCVwqVCMPnwSjI4BhpEnSPsyjVIfTYGhgrZXPOm66Wap7MQVdlukWXHzGuXd0YsEiddgymmKTMxkiMHQ'

        }
      }).then(response => {
        console.log("Reembolso de pago exitoso");
        setRefund(response.data.id)
        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + idRes,  {factura},{
          headers: {
            'Authorization': `token ${userToken}`
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
          'Authorization': 'Bearer A21AAJa88PPtzqyN2sCVwqVCMPnwSjI4BhpEnSPsyjVIfTYGhgrZXPOm66Wap7MQVdlukWXHzGuXd0YsEiddgymmKTMxkiMHQ'

        }
        
       })
       .then(response => {
        console.log("Reembolso de pago exitoso");
        setVoide(response.data.id)
        axios.get("http://localhost:8080/reserva/cancelarReservaPendiente/" + idRes,  {factura},{
          headers: {
            'Authorization': `token ${userToken}`
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

                    <Table striped bordered hover variant="light" style={{ padding: 10 }}>

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
