
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
    const [capture, setCapture] = useState('');
  


    useEffect(() => {
console.log(userId + "user")
        axios.get("http://localhost:8080/reserva/listarReservasPendientesYAprobadas/" + userId)
            .then(res => {
                const rese = res.data;
                setReservas(rese);
                
console.log(res.data + "data")
         
            })

     
    }, [])




    const Aceptar = (idPayPal, idRes, idFactura) => {

      axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+idPayPal+"/capture", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAKTtXghoyV325RmsGznbMbVNPQTLcw6XZVlCwqBqv2DUi7CjhmHrcBc6rW1yD5yAhJued1OftZkOLyleHWnELalyTin1g'

        }
        
       })
       .then(response => {
        console.log("Captura de pago exitosa");
        setCapture(response.data.id);

        axios.post("http://localhost:8080//reserva/confirmarPagoRealizado/" + idFactura)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")

          axios.post("http://localhost:8080/reserva/confirmar/" + idRes)
                
          .then(res => {
       
           
            console.log(res.data);
            
            setBotonType("actualizado")
            alert("Reserva Confirmada")
          })
  
        })

     })

    }

    
    const Cancelar = (idRes) => {

      axios.post("https://api-m.sandbox.paypal.com/v2/payments/captures/"+capture+"/refund", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAKTtXghoyV325RmsGznbMbVNPQTLcw6XZVlCwqBqv2DUi7CjhmHrcBc6rW1yD5yAhJued1OftZkOLyleHWnELalyTin1g'

        }
      }).then(response => {
        console.log("Reembolso de pago exitoso");

        axios.post("http://localhost:8080/reserva/cancelarReservaAprobada/" + idRes)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")
          alert("Reserva Cancelada")
          
        })

     })}
 
 

    const Rechazar = (idRes, idPayPal) => {

      axios.post("https://api-m.sandbox.paypal.com/v2/payments/authorizations/"+idPayPal+"/void", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer A21AAKTtXghoyV325RmsGznbMbVNPQTLcw6XZVlCwqBqv2DUi7CjhmHrcBc6rW1yD5yAhJued1OftZkOLyleHWnELalyTin1g'

        }
        
       })
       .then(response => {
        console.log("Reembolso de pago exitoso");
        axios.get("http://localhost:8080/reserva/cancelarReservaPendiente/" + idRes)
                
        .then(res => {
     
         
          console.log(res.data);
          
          setBotonType("actualizado")
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
                                <td><Button variant="success" onClick={() => Aceptar(reservas.idpaypal, reservas.res_id, reservas.idFactura)}>Aceptar</Button></td> :  
                                 (reservas.res_estado === "APROBADO" ? <td><Button variant="danger" onClick={() => Rechazar(reservas.res_id, reservas.idpaypal )}>Rechazar</Button></td> : <td>{reservas.res_estado}</td> )
                                 }
                               {reservas.res_estado === "PENDIENTE" ?   
                                <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id)}>Cancelar</Button></td> :  <td>Cancelada</td> }

                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasAnf />
            
    )
}
