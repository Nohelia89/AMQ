
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';


export default function ReservasAnf() {

    const [reservas, setReservas] = useState([]);
    const { userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [capture, setCapture] = useState();
    const [refund, setRefund] = useState();
    const [voide, setVoide] = useState();
    
  


    useEffect(() => {
console.log(userId + "user")
        axios.get("http://localhost:8080/reserva/listarReservasPendientesYAprobadas/" + userId)
            .then(res => {
                const rese = res.data;
                console.log(res.data);
                setReservas(rese);
                
console.log(res.data + "data")
         
            })

     
    }, [])




    const Aceptar = (idPayPal, idRes, idFactura) => {

console.log("aceptar"+ idPayPal)
      var factura = {
        id: capture,
        estado: "APROBADO",
        monto: 0,
        fecha: {
          dia: 0,
          mes: 0,
          anio: 0
        },
        descuento: false,
        montoDescuento: 0,
        idPaypal: capture
    };



      axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+idPayPal+"/capture", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AALNgQaPnrhhLzw42iakNoXcufT5ytF0-AP8vp_AfbaRb_k88tFqM7D90AOjL93ZEDXY0io3nAAgUKPTfqNXOfMu9MYHsA'

        }
        
       })
       .then(response => {
        console.log("Captura de pago exitosa");
        setCapture(response.data.id);

        axios.post("http://localhost:8080//reserva/confirmarPagoRealizado/" + idFactura, factura)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")

          axios.post("http://localhost:8080/reserva/confirmar/" + idRes, factura)
                
          .then(res => {
       
           
            console.log(res.data);
            
            setBotonType("aprobado")
            alert("Reserva Confirmada")
          })
  
        })

     })

    }

    
    const Cancelar = (idRes, idPayPal) => {


      var factura = {
        id: refund,
        estado: "CANCELADO",
        monto: 0,
        fecha: {
          dia: 0,
          mes: 0,
          anio: 0
        },
        descuento: false,
        montoDescuento: 0,
        idPaypal: refund
    };


      axios.post("https://api-m.sandbox.paypal.com/v2/payments/captures/"+idPayPal+"/refund", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AALNgQaPnrhhLzw42iakNoXcufT5ytF0-AP8vp_AfbaRb_k88tFqM7D90AOjL93ZEDXY0io3nAAgUKPTfqNXOfMu9MYHsA'

        }
      }).then(response => {
        console.log("Reembolso de pago exitoso");
        setRefund(response.data.id)
        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + idRes, factura)
                
        .then(res => {
     
         
          console.log(res.data);
          
          alert("Reserva Cancelada")
          setBotonType("cancelado")
          
        })

     })}
 
 

    const Rechazar = (idRes, idPayPal) => {

      
      var factura = {
        id: voide,
        estado: "RECHAZAR",
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
          'Authorization': 'Bearer A21AALNgQaPnrhhLzw42iakNoXcufT5ytF0-AP8vp_AfbaRb_k88tFqM7D90AOjL93ZEDXY0io3nAAgUKPTfqNXOfMu9MYHsA'

        }
        
       })
       .then(response => {
        console.log("Reembolso de pago exitoso");
        setVoide(response.data.id)
        axios.get("http://localhost:8080/reserva/cancelarReservaPendiente/" + idRes, factura)
                
        .then(res => {
     
         
          console.log(res.data);
          
          alert("Reserva Rechazada")
          setBotonType("rechazado")
          
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
                                <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id, reservas.facturas[0].idPaypal)}>Cancelar</Button></td>
                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasAnf />
            
    )
}
