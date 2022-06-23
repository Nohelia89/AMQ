
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useUserContext } from '../UserContext/userContext';
import NavBarAnfitrion from '../Navbar/NavBarAnfitrion';


export default function ReservasHu() {

    const [reservas, setReservas] = useState([]);
    const { userId } = useUserContext();
    const [botonType, setBotonType] = useState('sinActualizar');
    const [idReserva, setIdReserva] = useState('');
  


    useEffect(() => {
console.log(userId + "user")
        axios.post("http://localhost:8080/reserva/reservasXHuespXEstado/", {
          "idHu": userId,
          "resEstado": [
            "APROBADO"
          ]
        })
            .then(res => {
                const rese = res.data;
                setReservas(rese);
                
console.log(res.data + "data")
         
            })

     
    }, [])


    
    const Cancelar = (idRes, idPayPal) => {

      axios.post("https://api-m.sandbox.paypal.com/v2/payments/captures/"+idPayPal+"/refund", {amount: {
        value: "",
        currency_code: "USD"
      },
      note_to_payer: "MULTA POR CANCELAR RESERVA APROBADA"
    }, {
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
          alert("Reserva Cancelada con una multa por haber cancelado una reserva aprobada. La multa equivale al 50% de lo abonado por la reserva")
          
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
                                <th>Cancelar</th>

                            </tr>
                        </thead>
                        {reservas.map(reservas => <tbody key={reservas.res_id} >
                            <tr>

                                <td>{reservas.aloj_nombre}</td>
                                <td>{reservas.hab_descripcion}</td>
                                <td>{reservas.res_fechaInicio}</td>
                                <td>{reservas.res_fechaFin}</td>
                                {reservas.res_estado === "APROBADO" ?   
                                <td><Button variant="danger" onClick={() => Cancelar(reservas.res_id,reservas.res_paypal )}>Cancelar</Button></td> : <td>CANCELADA</td>
                                 }
            
                            </tr>

                        </tbody>)}
                    </Table>

                

            </>
          : <ReservasHu />
            
    )
}
